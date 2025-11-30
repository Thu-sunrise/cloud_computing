import { User } from "../models/user.model.js";
import { Admin } from "../models/admin.model.js";

export const AdminService = {
  async getAllAdmins(query) {
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
      Admin.find(filter).sort(sort).skip(skip).limit(limitNumber).select(selectStr),
      Admin.countDocuments(filter),
    ]);

    return {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
      items,
    };
  },

  async createAdmin(data) {
    return await Admin.create(data);
  },
};
