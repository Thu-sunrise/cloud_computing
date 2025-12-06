import axios from "axios";

const axiosClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const authApi = {
  // LOGIN (mail + password)
  login: (mail, password) => axiosClient.post("/auth/login", { mail, password }),

  // SEND OTP
  sendOtp: (type, mail, password = null) =>
    axiosClient.post(`/auth/send-otp?type=${type}`, {
      mail,
      ...(password && { password }),
    }),

  // VERIFY OTP
  verifyOtp: (type, token, otp) =>
    axiosClient.post(`/auth/verify-otp?type=${type}&token=${token}`, { otp }),

  register: (token, userData) => axiosClient.post(`/auth/register?token=${token}`, userData),

  // FORGOT PASSWORD (final step)
  forgotPassword: (mail, newPassword) =>
    axiosClient.post("/auth/forgot-password", { mail, newPassword }),

  changePassword: (oldPassword, newPassword) =>
    axiosClient.post("/auth/change-password", { oldPassword, newPassword }),

  // LOGOUT
  logout: () => axiosClient.post("/auth/logout"),
};

export default axiosClient;
