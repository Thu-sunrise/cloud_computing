import { authApi } from "../api/authApi";

export const useAuth = () => {
  const login = async ({ email, password }) => {
    try {
      const data = await authApi.login({ email, password });
      return data;
    } catch (err) {
      throw new Error(err.message || "Login failed");
    }
  };

  const register = async (payload) => {
    try {
      const data = await authApi.register(payload);
      return data;
    } catch (err) {
      throw new Error(err.message || "Register failed");
    }
  };

  const forgotPassword = async ({ email }) => {
    try {
      const data = await authApi.forgotPassword({ email });
      return data;
    } catch (err) {
      throw new Error(err.message || "Forgot password failed");
    }
  };

  const changePassword = async (payload) => {
    try {
      const data = await authApi.changePassword(payload);
      return data;
    } catch (err) {
      throw new Error(err.message || "Change password failed");
    }
  };

  return { login, register, forgotPassword, changePassword };
};
