import { Category } from "../models/category.model.js";
import { CloudinaryService } from "../services/cloudinary.service.js";

export const CategoryService = {
  async getList() {
    const categories = await Category.find({}).lean();

    return Promise.all(
      categories.map((category) => ({
        ...category,
        imagePublicUrl: CloudinaryService.generateSignedUrl(category.imagePublicId),
      }))
    );
  },
  async getTopSelling() {
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: "products",
          let: { categoryId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$categoryId", "$$categoryId"] }, { $eq: ["$status", "sold"] }],
                },
              },
            },
            {
              $group: {
                _id: null,
                totalRevenue: { $sum: "$price" },
                soldCount: { $sum: 1 },
              },
            },
          ],
          as: "stats",
        },
      },
      {
        $addFields: {
          totalRevenue: {
            $ifNull: [{ $arrayElemAt: ["$stats.totalRevenue", 0] }, 0],
          },
          soldCount: {
            $ifNull: [{ $arrayElemAt: ["$stats.soldCount", 0] }, 0],
          },
        },
      },
      {
        $project: {
          stats: 0,
        },
      },
      {
        $sort: {
          totalRevenue: -1,
        },
      },
    ]);

    return categories.map((category) => ({
      ...category,
      imagePublicUrl: CloudinaryService.generateSignedUrl(category.imagePublicId),
    }));
  },
};
