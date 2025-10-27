import axiosClient from "./axiosClient";

export const authApi = {
  login: (data) => axiosClient.post("/login", data).then((res) => res.data),
  register: (data) => axiosClient.post("/register", data).then((res) => res.data),
  forgotPassword: (data) => axiosClient.post("/forgot-password", data).then((res) => res.data),
  changePassword: (data) => axiosClient.post("/change-password", data).then((res) => res.data),
  me: () => axiosClient.get("/me").then((res) => res.data),
  logout: () => axiosClient.post("/logout").then((res) => res.data),
};
