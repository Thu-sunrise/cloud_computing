import { Category } from "../models/category.model.js";
import { CloudinaryService } from "../services/cloudinary.service.js";
// import { AppError } from "../utils/AppError.js";

export const CategoryService = {
  async getList() {
    const categories = await Category.find({}).lean();

    return Promise.all(
      categories.map((category) => ({
        ...category,
        imageUrl: CloudinaryService.generateSignedUrl(category.imagePublicId),
      }))
    );
  },
  async getTopSelling() {
    const result = await Category.aggregate([
      {
        // Join products
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "categoryId",
          as: "products",
        },
      },

      {
        // where status = sold
        $addFields: {
          soldProducts: {
            $filter: {
              input: "$products",
              as: "p",
              cond: { $eq: ["$$p.status", "sold"] },
            },
          },
        },
      },

      {
        // sum and count
        $addFields: {
          totalRevenue: {
            $sum: "$soldProducts.price",
          },
          soldCount: {
            $size: "$soldProducts",
          },
        },
      },

      {
        // sort by revenue
        $sort: {
          totalRevenue: -1,
        },
      },

      {
        $project: {
          products: 0,
          soldProducts: 0,
        },
      },
    ]);

    return result;
  },
};
