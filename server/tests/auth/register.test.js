/* eslint n/no-unpublished-import: "off" */
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let app;
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  const { createApp } = await import("../../src/app.js");
  const { connectDB } = await import("../../src/config/db.js");
  await connectDB(uri);
  app = createApp();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Auth - Register API", () => {
  it("Testcase 0: Check initial server response", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", "Not Found");
  });
  it("Testcase 1: Successful registration", async () => {
    const res = await request(app).post("/api/auth/register").send({
      mail: "user@example.com",
      password: "securepassword",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user.mail).toBe("user@example.com");
    expect(res.body.user).not.toHaveProperty("password");
    expect(res.cookies).toBeDefined();
  });
  it("Testcase 2: Registration with existing email", async () => {
    const res = await request(app).post("/api/auth/register").send({
      mail: "user@example.com",
      password: "securepassword",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Email already in use");
    expect(res.cookies).toBeUndefined();
  });
  it("Testcase 3: Registration with missing fields", async () => {
    const res = await request(app).post("/api/auth/register").send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Email and password are required");
    expect(res.cookies).toBeUndefined();
  });

  it("Testcase 4: Registration with invalid email format", async () => {
    const res = await request(app).post("/api/auth/register").send({
      mail: "invalid-email@",
      password: "securepassword",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Invalid email format");
    expect(res.cookies).toBeUndefined();
  });
  it("Testcase 5: Registration with short password", async () => {
    const res = await request(app).post("/api/auth/register").send({
      mail: "user123@example.com",
      password: "123",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Password must be at least 6 characters long");
    expect(res.cookies).toBeUndefined();
  });
  it("Testcase 6: Registration with insert icon password ", async () => {
    const res = await request(app).post("/api/auth/register").send({
      mail: "user123@example.com",
      password: "🔥iconpassword",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Password contains invalid characters");
    expect(res.cookies).toBeUndefined();
  });
  it("Testcase 7: Registration with extremely long email", async () => {
    const longEmail = "a".repeat(300) + "@example.com";
    const res = await request(app).post("/api/auth/register").send({
      mail: longEmail,
      password: "securepassword",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Email is too long");
    expect(res.cookies).toBeUndefined();
  });
  it("Testcase 8: Registration with extremely long password", async () => {
    const longPassword = "a".repeat(300);
    const res = await request(app).post("/api/auth/register").send({
      mail: "longpass@example.com",
      password: longPassword,
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Password is too long");
  });
  it("Testcase 9: Registration with space email", async () => {
    const res = await request(app).post("/api/auth/register").send({
      mail: "          user321@example.com",
      password: "securepassword",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.user.mail).toBe("user321@example.com");
    expect(res.cookies).toBeDefined();
  });
  it("Testcase 10: Registration with SQL injection attempt", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        mail: { $gt: "" },
        password: "securepassword",
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Invalid email format");
  });
  it("Testcase 11: Registration with script injection attempt", async () => {
    const res = await request(app).post("/api/auth/register").send({
      mail: "<script>alert('hack')</script>@example.com",
      password: "securepassword",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Invalid email format");
  });
  it("Testcase 12: Registration with valid edge case email", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        mail: { $ne: "test@example.com" },
        password: "securepassword",
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Invalid email format");
  });
  it("Testcase 13: Registration with leading and trailing spaces in password", async () => {
    const res = await request(app).post("/api/auth/register").send({
      mail: "test@example.com",
      password: "   securepassword   ",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.user).toBeDefined();
  });
  it("Testcase 14: Registration with only spaces in password", async () => {
    const res = await request(app).post("/api/auth/register").send({
      mail: "test@example.com",
      password: "             ",
    });
    expect(res.statusCode).toEqual(400);
  });
  it("Testcase 15: Register at the same time", async () => {
    const promises = Array(5)
      .fill(0)
      .map(() =>
        request(app).post("/api/auth/register").send({
          mail: "concurrent@example.com",
          password: "123456",
        })
      );
    const results = await Promise.all(promises);
    const successCount = results.filter((r) => r.statusCode === 201).length;
    const failCount = results.filter((r) => r.statusCode === 409).length;
    expect(successCount).toBe(1);
    expect(failCount).toBe(4);
  });
});
