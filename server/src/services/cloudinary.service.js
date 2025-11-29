import streamifier from "streamifier";

import cloudinary from "../config/cloudinary.config.js";
import { AppError } from "../utils/AppError.js";
import { logger } from "../utils/logger.js";

export const CloudinaryService = {
  uploadBuffer(buffer, folder, resourceType = "auto") {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: resourceType, // auto: image/video/raw
          type: "private",
          timeout: 60000,
          use_filename: true,
          unique_filename: false,
          public_id: `${Date.now()}_${Math.random().toString(36).substring(2, 8)}`, // to avoid name conflicts
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      streamifier.createReadStream(buffer).pipe(stream);
    });
  },

  async uploadFile(file, _folder = null) {
    try {
      let folder = this._getFolder(file.mimetype);
      if (_folder) {
        folder += `/${_folder}`;
      }
      const resourceType = this._getResourceType(file.mimetype);

      return await this.uploadBuffer(file.buffer, folder, resourceType);
    } catch (err) {
      logger.error("[Cloudinary] Upload error:", err);
      throw new AppError("Failed to upload file", 500);
    }
  },

  generateSignedUrl(publicId, expiresInSeconds = 3600) {
    // expires_at = UNIX timestamp
    const expiresAt = Math.floor(Date.now() / 1000) + expiresInSeconds;

    return cloudinary.url(publicId, {
      type: "private",
      sign_url: true,
      secure: true,
      expires_at: expiresAt,
    });
  },

  async deleteFile(publicId) {
    return cloudinary.uploader.destroy(publicId);
  },

  _getFolder(mime) {
    if (mime.startsWith("image")) return "images";
    if (mime.startsWith("video")) return "videos";
    return "documents";
  },

  _getResourceType(mime) {
    if (mime.startsWith("image")) return "image";
    if (mime.startsWith("video")) return "video";
    return "raw"; // PDF, DOCX, ZIP, etc.
  },
};
