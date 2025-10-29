import express from "express";
import { RedisService } from "../services/redis.service.js";
// import { MailService } from "../services/mail.service.js";
// import { generateOtp } from "../utils/generateOtp.js";
const router = express.Router();

router.get("/ping", (req, res) => {
  res.json({ msg: "pong" });
});

// router.get("/send-otp", async (req, res) => {
//   await MailService.sendOtp(yourmail, generateOtp());
//   res.json({ ok: true });
// });

router.get("/rd-set", async (req, res) => {
  await RedisService.set("hello", { msg: "world" }, 10);
  res.json({ ok: true });
});

router.get("/rd-get", async (req, res) => {
  const data = await RedisService.get("hello");
  res.json(data);
});

export default router;
