/* eslint n/no-unpublished-import: "off" */
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { User } from "../../src/models/user.model.js";

let app;
let mongoServer;

const seedUsers = [
  { mail: "an@example.com", password: "123456" },
  { mail: "thu@example.com", password: "654321" },
];

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  const { createApp } = await import("../../src/app.js");
  const { connectDB } = await import("../../src/config/db.js");
  await connectDB(uri);
  // Seed the database with initial users
  await User.insertMany(seedUsers);
  app = createApp();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Auth - Login API", () => {
  it("Testcase 0: Check initial server response", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", "Not Found");
  });
  it("Testcase 1: Successful login", async () => {
    const res = await request(app).post("/api/auth/login").send({
      mail: "thu@example.com",
      password: "654321",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user.mail).toBe("thu@example.com");
    expect(res.cookies).toBeDefined();
  });
  it("Testcase 2: Login with incorrect password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      mail: "an@example.com",
      password: "wrongpassword",
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("message", "Invalid email or password");
  });
  it("Testcase 3: Login with unregistered email", async () => {
    const res = await request(app).post("/api/auth/login").send({
      mail: "unknown@example.com",
      password: "securepassword",
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("message", "Invalid email or password");
  });
  it("Testcase 4: Login with missing fields", async () => {
    const res = await request(app).post("/api/auth/login").send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Email and password are required");
  });
  it("Testcase 5: Login with invalid email format", async () => {
    const res = await request(app).post("/api/auth/login").send({
      mail: "invalid-email@",
      password: "securepassword",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Invalid email format");
  });
  it("Testcase 6: Login with extra spaces in email", async () => {
    const res = await request(app).post("/api/auth/login").send({
      mail: "   an@example.com   ",
      password: "securepassword",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.user.mail).toBe("an@example.com");
  });
  it("Testcase 7: Login with script injection attempt", async () => {
    const res = await request(app).post("/api/auth/login").send({
      mail: "<script>alert('hack')</script>@example.com",
      password: "securepassword",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Invalid email format");
  });
  it("Testcase 8: Login with MongoDB injection attempt", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        mail: { $gt: "" },
        password: "securepassword",
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Invalid email format");
  });
  it("Testcase 9: Login with valid email but empty password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      mail: "user@example.com",
      password: "",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Email and password are required");
  });
  it("Testcase 10: Login with password only spaces", async () => {
    const res = await request(app).post("/api/auth/login").send({
      mail: "user@example.com",
      password: "      ",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Email and password are required");
  });
  it("Testcase 11: Login with SQL-like email (attempted injection)", async () => {
    const res = await request(app).post("/api/auth/login").send({
      mail: "' OR '1'='1",
      password: "whatever",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Invalid email format");
  });
});
