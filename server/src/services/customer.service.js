import { Customer } from "../models/customer.model.js";
import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";

export const CustomerService = {
  async create(mail, password) {
    const exist = await Customer.findOne({ mail });

    if (exist) {
      throw new AppError("Email already exists", 401);
    }
    const user = await User.create({ mail, password });
    return { id: user._id, role: user.role };
  },
};
