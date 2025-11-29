import { AppError } from "../utils/AppError.js";

class BaseService {
  constructor(model) {
    this.model = model;
  }

  async getAll(queryObj, currentUserRole) {
    const searchFields = ["name.firstName", "name.lastName"];

    const publicFields = [
      "name.firstName",
      "name.lastName",
      "gender",
      "dateOfBirth",
      "address",
      "createdAt",
      "avatar",
    ];

    const adminFields = [
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

    const { page = 1, limit = 10, sort = "-createdAt", fields, search, ...filter } = queryObj;

    if (search) {
      filter.$or = searchFields.map((field) => ({
        [field]: { $regex: search, $options: "i" },
      }));
    }

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const allowedFields = currentUserRole === "admin" ? adminFields : publicFields;

    let selectStr = "";

    if (fields) {
      const requestedFields = fields.split(",");
      const finalFields = requestedFields.filter((field) => allowedFields.includes(field));
      selectStr = finalFields.length > 0 ? finalFields.join(" ") : allowedFields.join(" ");
    } else {
      selectStr = allowedFields.join(" ");
    }

    const [items, total] = await Promise.all([
      this.model.find(filter).sort(sort).skip(skip).limit(limitNumber).select(selectStr), // Truyền chuỗi select đã xử lý kỹ càng vào đây
      this.model.countDocuments(filter),
    ]);

    return {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
      items,
    };
  }

  async getById(id) {
    const doc = await this.model.findById(id);
    if (!doc) throw new AppError("No document found with that ID", 404);
    return doc;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async update(id, data, allowedFields) {
    const updateData = {};

    Object.keys(data).forEach((field) => {
      if (allowedFields.includes(field)) {
        if (field === "firstName") {
          updateData["name.firstName"] = data[field];
        } else if (field === "lastName") {
          updateData["name.lastName"] = data[field];
        } else {
          updateData[field] = data[field];
        }
      }
    });

    if (Object.keys(updateData).length === 0) {
      throw new AppError("No valid fields to update", 400);
    }

    const doc = await this.model.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!doc) throw new AppError("No document found with that ID", 404);
    console.log(doc);
    return doc;
  }

  async delete(id) {
    const doc = await this.model.findByIdAndDelete(id);
    if (!doc) throw new AppError("No document found with that ID", 404);
    return doc;
  }
}

export default BaseService;
