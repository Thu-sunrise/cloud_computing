import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import FloatingInput from "../../components/AuthLayout/FloatingInput"; // Đã sửa chữ F
import { useForm } from "../../hooks/useForm";
import { validateLogin } from "../../utils/validate";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const { form, errors, handleChange, handleSubmit } = useForm({
    initialValues: { email: "", password: "", rememberMe: false },
    validate: validateLogin,
    onSubmit: async (values) => {
      try {
        await login(values);
        toast.success("Login successful!");
        navigate("/home");
      } catch (err) {
        toast.error(err.message || "Login failed");
      }
    },
  });

  return (
    <AuthLayout title="Login">
      {/* subtitle */}
      <p className="text-gray-600 mb-6 text-center text-base">Please enter your login details</p>

      {/* form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full animate-fadeIn">
        <FloatingInput
          id="email"
          type="email"
          label="Email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />

        <FloatingInput
          id="password"
          type="password"
          label="Password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />

        {/* remember + forgot password */}
        <div className="flex justify-between items-center text-sm flex-wrap gap-2 text-[#4b8063]">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              id="rememberMe"
              checked={form.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 accent-[#7fa88d]"
            />
            Remember Me
          </label>

          <a href="/forgot-password" className="font-semibold hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* login button */}
        <button
          type="submit"
          className="bg-[#7fa88d] hover:bg-[#6b9478] text-white font-semibold py-3 rounded-lg w-full text-lg transition-colors"
        >
          Login
        </button>

        {/* optional google login */}
        {/* 
        <button
          type="button"
          className="flex items-center justify-center gap-2 border border-[#dadce0] rounded-lg bg-white text-[#3c4043] font-medium py-3 w-full text-base hover:bg-[#f7f8f8] transition"
        >
          <img src="/g-logo.png" alt="Google" className="w-5 h-5" />
          Login with Google
        </button> 
        */}

        {/* footer */}
        <p className="text-center text-sm text-[#4b8063] mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="font-semibold hover:underline">
            Create Account
          </a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
