/* eslint n/no-unpublished-import: "off" */
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { User } from "../../src/models/user.model.js";

let app;
let mongoServer;
