import { Customer } from "../models/customer.model.js";

export const CustomerService = {
  async getAllCustomers(query) {
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
      Customer.find(filter).sort(sort).skip(skip).limit(limitNumber).select(selectStr), // Truyền chuỗi select đã xử lý kỹ càng vào đây
      Customer.countDocuments(filter),
    ]);

    return {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
      items,
    };
  },

  async createCustomer(data) {
    return await Customer.create(data);
  },

  async deleteCustomer(id) {
    const doc = await Customer.findByIdAndDelete(id);
    if (!doc) throw new AppError("No document found with that ID", 404);
    return doc;
  },

  async getAddresses(userId, addressId) {
    const customer = await Customer.findById(userId).select("address");
    if (!customer) throw new AppError("Customer not found", 404);

    const addressSubDoc = customer.address.id(addressId);
    if (!addressSubDoc) throw new AppError("Address not found", 404);
    // sort -> isDefault on top
    return addressSubDoc;
  },

  async getListAddresses(id) {
    const customer = await Customer.findById(id).select("address");
    if (!customer) throw new AppError("Customer not found", 404);
    // sort -> isDefault on top
    return customer.address.sort((a, b) => b.isDefault - a.isDefault);
  },

  async addAddress(id, addressData) {
    const finalData = addressData.address ? addressData.address : addressData;
    const customer = await Customer.findById(id);
    if (!customer) throw new AppError("Customer not found", 404);

    if (customer.address.length === 0) {
      finalData.isDefault = true;
    }

    if (finalData.isDefault) {
      customer.address.forEach((addr) => (addr.isDefault = false));
    }

    customer.address.push(finalData);
    await customer.save();
    return customer.address;
  },

  async updateAddress(userId, addressId, data) {
    const customer = await Customer.findById(userId);
    if (!customer) throw new AppError("Customer not found", 404);

    const addressSubDoc = customer.address.id(addressId);
    if (!addressSubDoc) throw new AppError("Address not found", 404);

    const finalData = data.address || data;

    if (finalData.isDefault === true) {
      customer.address.forEach((addr) => {
        if (addr._id.toString() !== addressId) {
          addr.isDefault = false;
        }
      });
    }
    addressSubDoc.set(finalData);
    await customer.save();
    return customer.address;
  },

  async deleteAddress(userId, addressId) {
    const customer = await Customer.findById(userId);
    if (!customer) throw new AppError("Customer not found");

    const addressSubDoc = customer.address.id(addressId);
    if (!addressSubDoc) throw new AppError("Address not found");

    const wasDefault = addressSubDoc.isDefault;
    addressSubDoc.deleteOne();

    if (wasDefault && customer.address.length > 0) {
      customer.address[0].isDefault = true;
    }

    await customer.save();
    return customer.address;
  },
};
