import nodemailer from "nodemailer";
import { env } from "../config/env.js";
import { logger } from "../utils/logger.js";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

const loadTemplate = (fileName, data) => {
  const filePath = path.join(process.cwd(), "src", "templates", fileName);
  const source = fs.readFileSync(filePath, "utf8");
  const compiled = handlebars.compile(source);
  return compiled(data);
};

export const MailService = {
  async sendTemplate(to, subject, templateName, data, retries = 2) {
    const html = loadTemplate(templateName, data);
    try {
      const info = await transporter.sendMail({
        from: `"Second Hand Land" <${env.EMAIL_USER}>`,
        to,
        subject,
        html,
      });

      logger.info(`Email sent to ${to} (id: ${info.messageId})`);
      return info;
    } catch (err) {
      logger.error(`Failed to send email to ${to}: ${err.message}`);

      if (retries > 0) {
        logger.warn(`Retrying... attempts left: ${retries}`);
        return this.sendTemplate(to, subject, templateName, data, retries - 1);
      }

      throw err;
    }
  },

  sendOtp(email, otp) {
    return this.sendTemplate(email, "Your Verification Code", "verifyOtp.hbs", { otp });
  },

  sendRegisterSuccess(email) {
    return this.sendTemplate(email, "Welcome to Second Hand Land", "registerSuccess.hbs", {});
  },
};
