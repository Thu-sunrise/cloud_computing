import { CLOUDINARY_BASE_URL } from "@/constants/cloudinary";

export const mapProducts = (products = []) =>
  products.map((p, index) => {
    const isValidCloudinaryId =
      typeof p.imagePublicId === "string" &&
      p.imagePublicId.trim() !== "" &&
      !p.imagePublicId.startsWith("images/");

    return {
      id: p._id ?? `product-${index}`,
      name: p.name ?? "Unknown",
      description: p.description ?? "",
      price: Number(p.price) || 0,
      status: p.status ?? "unknown",

      // ===== IMAGE (CHUẨN CLOUDINARY) =====
      image:
        isValidCloudinaryId && CLOUDINARY_BASE_URL
          ? `${CLOUDINARY_BASE_URL}/${p.imagePublicId}`
          : "",

      date: p.createdAt ? new Date(p.createdAt).toLocaleDateString("vi-VN") : "",

      customerId: p.createdBy ?? "Unknown",
    };
  });
