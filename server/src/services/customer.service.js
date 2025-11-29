import { Customer } from "../models/customer.model.js";
import { User } from "../models/user.model.js";
import BaseService from "./base.service.js";
import userService from "./user.service.js";

class CustomerService extends BaseService {
  constructor() {
    super(Customer);
  }

  async getAllCustomer(query, role) {
    return await super.getAll(query, role);
  }

  async getMyInfo(id) {
    return await super.getById(id);
  }

  async getCustomerById(id) {
    return await userService.getUserById(id);
  }

  async createCustomer(data) {
    return await super.create(data);
  }

  async updateCustomer(id, data) {
    const allowedFields = [
      "firstName",
      "lastName",
      "avatar",
      "mail",
      "gender",
      "dateOfBirth",
      "phone",
    ];
    console.log("data");
    // Update without validation on other fields
    return await super.update(id, data, allowedFields);
  }

  async deleteCustomer(id) {
    await super.delete(id);
  }

  async getAddresses(userId, addressId) {
    const customer = await Customer.findById(userId).select("address");
    if (!customer) throw new AppError("Customer not found", 404);

    const addressSubDoc = customer.address.id(addressId);
    if (!addressSubDoc) throw new AppError("Address not found", 404);
    // sort -> isDefault on top
    return addressSubDoc;
  }

  async getListAddresses(id) {
    const customer = await Customer.findById(id).select("address");
    if (!customer) throw new AppError("Customer not found", 404);
    // sort -> isDefault on top
    return customer.address.sort((a, b) => b.isDefault - a.isDefault);
  }

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
  }

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
  }

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
  }
}

export default new CustomerService();
