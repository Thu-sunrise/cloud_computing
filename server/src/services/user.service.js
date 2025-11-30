import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";

export const UserService = {
  async getAllUsers(query) {
    const searchFields = ["name.firstName", "name.lastName"];

    const allowedFields = [
      "name.firstName",
      "name.lastName",
      "role",
      "status",
      "gender",
      "dateOfBirth",
      "address",
      "createdAt",
      "updatedAt",
      "avatar",
    ];

    const { page = 1, limit = 10, sort = "-createdAt", fields, search, ...filter } = query;

    if (search) {
      filter.$or = searchFields.map((field) => ({
        [field]: { $regex: search, $options: "i" },
      }));
    }

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    let selectStr = "";

    if (fields) {
      const requestedFields = fields.split(",");
      const finalFields = requestedFields.filter((field) => allowedFields.includes(field));
      selectStr = finalFields.length > 0 ? finalFields.join(" ") : allowedFields.join(" ");
    } else {
      selectStr = allowedFields.join(" ");
    }

    const [items, total] = await Promise.all([
      User.find(filter).sort(sort).skip(skip).limit(limitNumber).select(selectStr),
      User.countDocuments(filter),
    ]);

    return {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
      items,
    };
  },

  async getMyInfo(id) {
    const doc = await User.findById(id);
    if (!doc) throw new AppError("No document found with that ID", 404);
    return doc;
  },

  async getUserById(id) {
    const doc = await User.findById(id);
    if (!doc) throw new AppError("No document found with that ID", 404);
    return doc;
  },

  async createUser(mail, password) {
    const exist = await User.findOne({ mail });

    if (exist) {
      throw new AppError("Email already exists", 401);
    }
    const user = await User.create({ mail, password });
    return { id: user._id, role: user.role };
  },

  async deleteUser(id) {
    const doc = await User.findByIdAndDelete(id);
    if (!doc) throw new AppError("No document found with that ID", 404);
    return doc;
  },

  async updateUserById(id, data) {
    if (Object.keys(data).length === 0) {
      throw new AppError("No valid fields to update", 400);
    }
    const doc = await User.findByIdAndUpdate(
      id,
      { $set: data },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!doc) throw new AppError("No document found with that ID", 404);
    return doc;
  },
};
