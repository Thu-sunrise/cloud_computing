import { authApi } from "../api/authApi";

export const useAuth = () => {
  const handleApi = async (apiCall, defaultError) => {
    try {
      const res = await apiCall();
      return res.data;
    } catch (err) {
      console.error(`${defaultError}:`, err);
      const message =
        err.response?.data?.message || err.message || `${defaultError} — Unknown error`;

      throw new Error(message);
    }
  };

  const login = ({ email, password }) =>
    handleApi(() => authApi.login({ email, password }), "Login error");

  const register = (payload) => handleApi(() => authApi.register(payload), "Register error");

  const forgotPassword = ({ email }) =>
    handleApi(() => authApi.forgotPassword({ email }), "Forgot password error");

  const changePassword = (payload) =>
    handleApi(() => authApi.changePassword(payload), "Change password error");

  return { login, register, forgotPassword, changePassword };
};
