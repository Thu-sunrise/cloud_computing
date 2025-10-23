// import { jest } from "@jest/globals";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let app;
let mongoServer;

// jest.unstable_mockModule("../src/middlewares/limiter.middleware.js", () => ({
//   registerLimiter: (req, res, next) => next(),
//   loginLimiter: (req, res, next) => next(),
// }));

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  const { createApp } = await import("../src/app.js");
  const { connectDB } = await import("../src/config/db.js");
  await connectDB(uri);
  app = createApp();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Auth API", () => {
  it("Testcase 1: Check initial server response", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", "Not Found");
  });
});
