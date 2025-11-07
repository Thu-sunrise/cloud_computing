import React from "react";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import FloatingInput from "../../components/Form/FloatingInput";
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
      <p className="form-subtitle">Sign up to get started!</p>

      <form onSubmit={handleSubmit} className="auth-form">
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
        </div>

        <label className="checkbox-group">
          <input
            type="checkbox"
            id="agreeTerms"
            checked={form.agreeTerms}
            onChange={handleChange}
          />
          I agree to the{" "}
          <a href="/terms" target="_blank" rel="noopener noreferrer">
            Terms & Conditions
          </a>
          {/* and{" "}
          <a href="/privacy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a> */}
        </label>
        {errors.agreeTerms && <p className="checkbox-error">{errors.agreeTerms}</p>}

        <button type="submit" className="btn-primary">
          Register
        </button>

        <p className="form-footer">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
