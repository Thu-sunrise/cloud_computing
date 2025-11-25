import React from "react";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import FloatingInput from "../../components/Form/FloatingInput";
import { useForm } from "../../hooks/useForm";
import { validateForgotPassword } from "../../utils/validate";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const { forgotPassword } = useAuth();
  const navigate = useNavigate(); // ✅ dùng để chuyển trang

  const { form, errors, handleChange, handleSubmit } = useForm({
    initialValues: { email: "" },
    validate: validateForgotPassword,
    onSubmit: async (values) => {
      try {
        await forgotPassword(values);
        toast.success("OTP has been sent to your email!");

        // ✅ chuyển sang trang OTP, kèm email
        navigate("/verify-otp", { state: { email: values.email } });
      } catch (err) {
        toast.error(err.message);
      }
    },
  });

  return (
    <AuthLayout title="Forgot Password">
      <p className="form-subtitle">Enter your email to reset your password</p>
      <form onSubmit={handleSubmit} className="auth-form">
        <FloatingInput
          id="email"
          type="email"
          label="Email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />

        <button type="submit" className="btn-primary">
          Send Reset Link
        </button>

        <p className="form-footer">
          Remember your password? <a href="/login">Back to Login</a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
