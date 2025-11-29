import { Customer } from "../models/customer.model.js";
import customerService from "../services/customer.service.js";

class CustomerController {
  async getAllCustomers(req, res, next) {
    // transfer the logic to the service
    try {
      const role = req.user.role;
      const data = await customerService.getAllCustomer(req.query, role);
      if (!data || data.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No customers found",
        });
      }
      res.json({ success: true, data: data });
    } catch (error) {
      next(error);
    }
  }

  async getMyInfo(req, res) {
    const id = req.user?.sub;
    if (!id) return res.status(401).json({ success: false, message: "Unauthorized" });
    // transfer the logic to the service
    const user = await customerService.getMyInfo(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }
    res.json({ success: true, data: user });
  }

  async getCustomerById(req, res) {
    // transfer the logic to the service
    const user = await customerService.getCustomerById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }
    res.json({ success: true, data: user });
  }

  async createCustomer(req, res, next) {
    // transfer the logic to the service
    const user = await customerService.createCustomer(req.body);
    res.json({ success: true, data: user });
  }

  async updateCustomer(req, res) {
    console.log("test1");
    try {
      const id = req.user?.sub;
      if (!id) return res.status(401).json({ success: false, message: "Unauthorized" });
      const data = req.body;
      console.log(id);
      // transfer the logic to the service
      const updateUser = await customerService.updateCustomer(id, data);
      // return
      return res.status(200).json({
        success: true,
        message: "Information updated successfully.",
        data: updateUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCustomer(req, res, next) {
    try {
      const id = req.user?.sub;
      if (!id) return res.status(401).json({ success: false, message: "Unauthorized" });
      // transfer the logic to the service
      await customerService.deleteCustomer(id);
      // return
      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAddresses(req, res, next) {
    try {
      const userId = req.user.sub;
      const addressId = req.params;

      const addresses = await customerService.getAddresses(userId, addressId);
      res.status(200).json({ success: true, data: addresses });
    } catch (error) {
      next(error);
    }
  }

  async getListAddresses(req, res, next) {
    try {
      const id = req.user.sub;
      const addresses = await customerService.getListAddresses(id);
      res.status(200).json({ success: true, data: addresses });
    } catch (error) {
      next(error);
    }
  }

  async addAddress(req, res, next) {
    try {
      const id = req.user.sub;
      const data = req.body;

      const addresses = await customerService.addAddress(id, data);
      res.status(200).json({ success: true, message: "Added new address", data: addresses });
    } catch (error) {
      next(error);
    }
  }

  async updateAddress(req, res, next) {
    try {
      const addressId = req.params;
      const userId = req.user.sub;
      const data = req.body;

      const address = await customerService.updateAddress(userId, addressId, data);
      res.status(200).json({ success: true, message: "Address updated", data: address });
    } catch (error) {
      next(error);
    }
  }

  async deleteAddress(req, res, next) {
    try {
      const userId = req.user.sub;
      const addressId = req.params;

      const addAddress = await customerService.deleteAddress(userId, addressId);
      res.status(200).json({ success: true, message: "Address deleted", data: addAddress });
    } catch (error) {
      next(error);
    }
  }
}

export default new CustomerController();
