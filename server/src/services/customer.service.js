import { Customer } from "../models/customer.model.js";
import { AppError } from "../utils/AppError.js";

class CustomerService {
  async getAllCustomer() {
    return await Customer.find().select("-__v");
  }

  async getCustomerById(id) {
    return await Customer.findById(id).select("-__v");
  }

  async createCustomer(data) {
    return await Customer.create(data);
  }

  async updateCustomer(id, data) {
    // The updated user object
    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      { $set: updates },
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
}

export default new CustomerService();
