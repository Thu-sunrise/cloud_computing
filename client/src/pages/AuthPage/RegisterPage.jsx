import React from "react";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import FloatingInput from "../../components/AuthLayout/FloatingInput";
import { useForm } from "../../hooks/useForm";
import { validateRegister } from "../../utils/validate";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const { register } = useAuth();

  const { form, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
      rememberMe: false,
    },
    validate: validateRegister,
    onSubmit: async (values) => {
      try {
        await register(values);
        toast.success("Registration successful!");
      } catch (err) {
        toast.error(err.message);
      }
    },
  });

  return (
    <AuthLayout title="Create Account">
      <p className="text-gray-500 text-center mb-8">Sign up to get started!</p>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <FloatingInput
          id="name"
          type="text"
          label="Full Name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />

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

        <FloatingInput
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        {/* Remember Me */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="rememberMe"
            checked={form.rememberMe}
            onChange={handleChange}
            className="w-4 h-4 accent-[#7fa88d] rounded"
          />
          <label htmlFor="rememberMe" className="text-[#4b8063] text-sm">
            Remember Me
          </label>
        </div>

        {/* Agree Terms */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="agreeTerms"
            checked={form.agreeTerms}
            onChange={handleChange}
            className="w-4 h-4 accent-[#7fa88d] rounded"
          />
          <label htmlFor="agreeTerms" className="text-[#4b8063] text-sm">
            I agree to the{" "}
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-[#4b8063]"
            >
              Terms & Conditions
            </a>
          </label>
        </div>
        {errors.agreeTerms && <p className="text-rose-600 text-sm">{errors.agreeTerms}</p>}

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-[#7fa88d] hover:bg-[#6b9478] text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Register
        </button>

        {/* Footer */}
        <p className="text-center text-[#4b8063] mt-2">
          Already have an account?{" "}
          <a href="/login" className="font-semibold hover:underline">
            Login
          </a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
