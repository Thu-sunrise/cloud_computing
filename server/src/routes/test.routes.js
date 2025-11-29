import express from "express";
import { RedisService } from "../services/redis.service.js";
import { MailService } from "../services/mail.service.js";
import { CloudinaryService } from "../services/cloudinary.service.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

import { requireAuth } from "../middlewares/auth.middleware.js";

import { upload } from "../config/multer.js";
// import { generateOtpAndHash } from "../utils/crypto.js";
const router = express.Router();

// test routes
router.get("/ping", (req, res) => {
  res.json({ msg: "pong" });
});

// test send OTP mail
router.get("/send-otp", async (req, res) => {
  await MailService.sendOtp("yourmail@example.com", 111);
  res.json({ ok: true });
});

// test redis set and get
router.get("/rd-set", async (req, res) => {
  await RedisService.set("hello", { msg: "world", metadata: "supperdata" }, 10);
  res.json({ ok: true });
});

router.get("/rd-get", async (req, res) => {
  const data = await RedisService.get("hello");
  res.json(data);
});

// test cloudinary upload
router.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const result = await CloudinaryService.uploadFile(req.file, "user");
  res.json({
    message: "Upload success",
    url: result.secure_url,
    public_id: result.public_id,
    resource_type: result.resource_type,
  });
});

router.get("/auth", requireAuth, async (req, res) => {
  res.status(200).json({ message: "Done" });
});

router.get("/url-cloudinary", (req, res) => {
  const signedUrl = CloudinaryService.generateSignedUrl("images/user/1763474508667_tlb8r6");
  res.json({ signedUrl });
});

router.get("/auth", requireAuth, async (req, res) => {
  res.status(200).json({ message: "Done" });
});

export default router;
