import { Customer } from "../models/customer.model.js";
import { AppError } from "../utils/AppError.js";

class CustomerService {
  async getAllCustomer() {
    return await Customer.find().select("-__v");
  }

  async getCustomerById(id) {
    return await Customer.findById(id).select("-__v");
  }

  async getMyInfo(id) {
    return await Customer.findById(id).select("-__v");
  }

  async createCustomer(data) {
    return await Customer.create(data);
  }

  async updateCustomer(id, data) {
    // The updated user object
    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );
    // Check if user not found
    if (!updatedCustomer) {
      throw new AppError("No user found with that ID", 404);
    }
    // Return
    return updatedCustomer;
  }

  async deleteCustomer(id) {
    const deleted = await Customer.findByIdAndDelete(id);
    if (!deleted) {
      throw new AppError("No customer found with that ID", 404);
    }
    return deleted;
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
