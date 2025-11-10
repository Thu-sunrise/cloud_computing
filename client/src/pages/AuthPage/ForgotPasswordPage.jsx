import React from "react";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import FloatingInput from "../../components/AuthLayout/FloatingInput";
import { useForm } from "../../hooks/useForm";
import { validateForgotPassword } from "../../utils/validate";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  const { form, errors, handleChange, handleSubmit } = useForm({
    initialValues: { email: "" },
    validate: validateForgotPassword,
    onSubmit: async (values) => {
      try {
        await forgotPassword(values);
        toast.success("OTP has been sent to your email!");
        navigate("/verify-otp", { state: { email: values.email } });
      } catch (err) {
        toast.error(err.message);
      }
    },
  });

  return (
    <AuthLayout title="Forgot Password">
      <p className="text-gray-500 text-center mb-8">Enter your email to reset your password</p>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <FloatingInput
          id="email"
          type="email"
          label="Email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />

        <button
          type="submit"
          className="w-full bg-[#7fa88d] hover:bg-[#6b9478] text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Send Reset Link
        </button>

        <p className="text-center text-[#4b8063] mt-2">
          Remember your password?{" "}
          <a href="/login" className="font-semibold hover:underline">
            Back to Login
          </a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
