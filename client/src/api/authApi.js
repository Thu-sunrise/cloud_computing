import axios from "axios";

const axiosClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// =======================
// AUTH API
// =======================
export const authApi = {
  // LOGIN
  login: (mail, password) => axiosClient.post("/auth/login", { mail, password }),

  // SEND OTP
  // type = "register" | "forgot-password"
  // data = { mail, password } hoặc { mail }
  sendOtp: (type, data) => axiosClient.post(`/auth/send-otp?type=${type}`, data),

  // VERIFY OTP
  verifyOtp: (type, token, otp) =>
    axiosClient.post(`/auth/verify-otp?type=${type}&token=${token}`, { otp }),

  // REGISTER
  // backend dùng token để lấy mail + password từ Redis
  register: (token) => axiosClient.post(`/auth/register?token=${token}`, {}),

  // FORGOT PASSWORD
  forgotPassword: (mail, newPassword) =>
    axiosClient.post("/auth/forgot-password", { mail, newPassword }),

  // CHANGE PASSWORD
  changePassword: (oldPassword, newPassword) =>
    axiosClient.post("/auth/change-password", { oldPassword, newPassword }),

  // LOGOUT
  logout: () => axiosClient.post("/auth/logout"),
};
// =======================
// PRODUCT API
// =======================
export const productApi = {
  // Danh sách sản phẩm
  getList: (page = 1, limit = 6, params = {}) =>
    axiosClient.get("/product/list", {
      params: { page, limit, ...params },
    }),

  // Chi tiết sản phẩm
  getById: (id) => axiosClient.get(`/product/${id}`),
};

// =======================
// REVIEW API
// =======================
export const reviewApi = {
  // Lấy review theo productId
  getByUserId: (userId) => axiosClient.get(`/review/list/${userId}`),
  // Tạo review
  create: (data) => axiosClient.post("/review", data),
};

// =======================
// USER / SHOP API
// =======================
export const customerApi = {
  getMe: () => axiosClient.get("/customer/me"),
  getById: (id) => axiosClient.get(`/customer/${id}`),
};
export const cartApi = {
  getCart: () => axiosClient.get("/cart/me"),
  addToCart: (productId) => axiosClient.put(`/cart/${productId}`),
  removeOne: (productId) => axiosClient.delete(`/cart/${productId}`),
};

export default axiosClient;
