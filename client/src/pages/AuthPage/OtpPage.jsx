import React, { useState } from "react";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import FloatingInput from "../../components/AuthLayout/FloatingInput";
import { toast } from "react-toastify";

const OtpPage = () => {
  const email = "example@mail.com"; // temporary
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setOtp(e.target.value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otp.trim()) setError("OTP is required");
    else toast.success("OTP submitted (demo)");
  };

  return (
    <AuthLayout title="Verify OTP">
      <p className="text-gray-500 text-center mb-8">Enter the 6-digit code we sent to your email</p>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <FloatingInput
          id="otp"
          label="Enter OTP"
          type="text"
          value={otp}
          onChange={handleChange}
          error={error}
        />
        <button
          type="submit"
          className="w-full bg-[#7fa88d] hover:bg-[#6b9478] text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Verify
        </button>

        <p className="text-center text-sm text-[#4b8063] mt-4">
          Didn’t receive the code?{" "}
          <a href="/forgot-password" className=" font-semibold hover:underline">
            Resend OTP
          </a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default OtpPage;
