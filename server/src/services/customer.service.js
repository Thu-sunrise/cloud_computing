import mongoose from "mongoose";
import { Customer } from "../models/customer.model.js";
import { AppError } from "../utils/AppError.js";
import { CloudinaryService } from "./cloudinary.service.js";

export const CustomerService = {
  async create(mail, password) {
    const exist = await Customer.findOne({ mail });

    if (exist) {
      throw new AppError("Email already exists", 401);
    }
    const user = await Customer.create({ mail, password });
    return { id: user._id, role: user.role };
  },

  async getList(page, limit, search) {
    const skip = (page - 1) * limit;
    let filter = { role: "customer" };

    if (search && search.trim() !== "") {
      const keyword = search.trim();

      if (mongoose.Types.ObjectId.isValid(keyword)) {
        const byId = await Customer.findOne({
          _id: keyword,
          role: "customer",
        })
          .select("-password")
          .lean();

        if (byId) {
          return {
            data: [byId],
            pagination: {
              page: 1,
              limit: 1,
              total: 1,
              totalPages: 1,
            },
          };
        }
      }

      const byMailCount = await Customer.countDocuments({
        role: "customer",
        mail: { $regex: keyword, $options: "i" },
      });

      if (byMailCount > 0) {
        filter.mail = { $regex: keyword, $options: "i" };
      } else {
        filter.$or = [
          { "name.firstName": { $regex: keyword, $options: "i" } },
          { "name.lastName": { $regex: keyword, $options: "i" } },
        ];
      }
    }

    const [customers, total] = await Promise.all([
      Customer.find(filter)
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Customer.countDocuments(filter),
    ]);

    return {
      data: customers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async update(userId, payload, image = null) {
    const customer = await Customer.findById(userId);

    if (!customer) {
      throw new AppError("Customer not found", 404);
    }

    let updateData = {};

    if (payload.firstName || payload.lastName) {
      updateData.name = {
        firstName: payload.firstName ?? customer.name?.firstName,
        lastName: payload.lastName ?? customer.name?.lastName,
      };
    }

    if (payload.phone) updateData.phone = payload.phone;

    if (payload.dateOfBirth) updateData.dateOfBirth = payload.dateOfBirth;

    if (payload.gender) updateData.gender = payload.gender;
    if (payload.address) updateData.address = payload.address;

    if (image) {
      const uploadResult = await CloudinaryService.uploadFile(image, "avatars");

      if (customer.avatarPublicId && customer.avatarPublicId !== "avtdf_kvmacl") {
        await CloudinaryService.deleteFile(customer.avatarPublicId);
      }
      updateData.avatarPublicId = uploadResult.public_id;
    }
    const updatedCustomer = await Customer.findByIdAndUpdate(
      userId,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
        select: "-password -failedLoginAttempts",
      }
    ).lean();

    return {
      ...updatedCustomer,
      avatarUrl: CloudinaryService.generateSignedUrl(updatedCustomer.avatarPublicId),
    };
  },

  async getById(id) {
    const customer = await Customer.findById(id).select("-password -failedLoginAttempts");
    if (!customer) throw new AppError("Customer not found", 404);
    return customer;
  },
};
