import axiosClient from "./axiosClient";

export const authApi = {
  login: (payload) => axiosClient.post("/auth/login", payload),
  register: (payload) => axiosClient.post("/auth/register", payload),
  forgotPassword: (payload) => axiosClient.post("/auth/forgot-password", payload),
  changePassword: (payload) => axiosClient.post("/auth/change-password", payload),
};
