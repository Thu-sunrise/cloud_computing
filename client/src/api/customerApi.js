import axiosClient from "./axiosClient";

export const customerApi = {
  getList: (params) => axiosClient.get("/customer/list", { params }),

  update: (id, payload) => axiosClient.patch(`/customer/${id}`, payload),
};

export default customerApi;
