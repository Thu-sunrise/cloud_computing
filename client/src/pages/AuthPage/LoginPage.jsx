import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import FloatingInput from "../../components/Form/FloatingInput"; // sửa chữ F
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
        toast.success(" Login successful!");
        navigate("/home");
      } catch (err) {
        toast.error(err.message);
      }
    },
  });

  return (
    <AuthLayout title="Login">
      <p className="form-subtitle">Please enter your login details</p>
      <form onSubmit={handleSubmit} className="auth-form">
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

        <div className="form-options">
          <label className="checkbox-group">
            <input
              type="checkbox"
              id="rememberMe"
              checked={form.rememberMe}
              onChange={handleChange}
            />
            Remember Me
          </label>
          <a href="/forgot-password">Forgot Password?</a>
        </div>

        <button type="submit" className="btn-primary">
          Login
        </button>

        {/* <button type="button" className="btn-google">
          <img src="/g-logo.png" alt="Google" className="google-icon" />
          Login with Google
        </button> */}

        <p className="form-footer">
          Don’t have an account? <a href="/register">Create Account</a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
