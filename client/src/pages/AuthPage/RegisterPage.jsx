import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import FloatingInput from "../../components/AuthLayout/FloatingInput";
import { authApi } from "@/api/authApi";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [token, setToken] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // STEP 1: Gửi OTP
    if (step === 1) {
      if (!form.email || !form.password || !form.confirmPassword) {
        setError("Please fill in all fields!");
        return;
      }
      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match!");
        return;
      }

      setLoading(true);
      try {
        const res = await authApi.sendOtp("register", form.email, form.password);
        setToken(res.data.token);
        setStep(2);
        setSuccessMessage("OTP sent to your email!");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to send OTP");
      } finally {
        setLoading(false);
      }
      return;
    }

    // STEP 2: Verify OTP + tạo user
    if (!form.otp || !token) {
      setError("OTP is required");
      return;
    }

    setLoading(true);
    try {
      // Verify OTP
      await authApi.verifyOtp("register", token, form.otp);

      // Tạo user
      await authApi.register(token, {
        mail: form.email,
        password: form.password,
        role: "customer",
        status: "active",
      });

      setSuccessMessage("🎉 Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 3000);

      // Reset form
      setStep(1);
      setForm({ email: "", password: "", confirmPassword: "", otp: "" });
      setToken(null);
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification or registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create Account">
      <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto relative">
        {/* Thông báo lỗi */}
        {error && (
          <div className="bg-red-100 text-red-800 border border-red-300 rounded-lg px-4 py-2 text-center">
            {error}
          </div>
        )}
        {/* Thông báo thành công */}
        {successMessage && (
          <div className="bg-green-100 text-green-800 border border-green-300 rounded-lg px-4 py-2 text-center">
            {successMessage}
          </div>
        )}

        {step === 1 ? (
          <>
            <FloatingInput
              id="email"
              type="email"
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={error}
            />
            <FloatingInput
              id="password"
              type="password"
              label="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              error={error}
              autoComplete="new-password"
            />
            <FloatingInput
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              error={error}
              autoComplete="new-password"
            />
          </>
        ) : (
          <FloatingInput
            id="otp"
            type="text"
            label="Enter OTP"
            name="otp"
            value={form.otp}
            onChange={handleChange}
            error={error}
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#7fa88d] hover:bg-[#6b9478] text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-60"
        >
          {loading ? "Processing..." : step === 1 ? "Send OTP" : "Verify OTP"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
