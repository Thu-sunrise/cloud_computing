import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: Number(import.meta.env.API_TIMEOUT) || 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // gửi cookie tự động
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const payload = error.response?.data || { message: error.message || "Network error" };
    return Promise.reject(payload);
  }
);

export default axiosClient;
