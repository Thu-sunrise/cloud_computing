import customerService from "../services/customer.service.js";

class CustomerController {
  async getAllCustomers(req, res) {
    // transfer the logic to the service
    const users = await customerService.getAllCustomer();
    res.json({ success: true, data: users });
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
    try {
      const { id } = req.user.id;
      const data = req.body;
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
      const { id } = req.user.id;
      // transfer the logic to the service
      const result = await customerService.deleteCustomer(id);
      // return
      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CustomerController();
