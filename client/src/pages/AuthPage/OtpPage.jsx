import React, { useState } from "react";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import FloatingInput from "../../components/Form/FloatingInput";
import { toast } from "react-toastify";
// import { useAuth } from "../../hooks/useAuth";

const OtpPage = () => {
  // const { verifyOtp } = useAuth();
  // const navigate = useNavigate();
  // const location = useLocation();
  // const email = location.state?.email || "";

  const email = "example@mail.com"; // dùng mail tạm
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setOtp(e.target.value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const validation + verifyOtp tạm bỏ
    if (!otp.trim()) setError("OTP is required");
    else toast.success("OTP submitted (demo)");
  };

  return (
    <AuthLayout title="Verify OTP">
      <p className="form-subtitle">Enter the 6-digit code we sent to your email</p>

      <form onSubmit={handleSubmit} className="auth-form">
        <FloatingInput
          id="otp"
          label="Enter OTP"
          type="text"
          value={otp}
          onChange={handleChange}
          error={error}
        />

        <button type="submit" className="btn-primary">
          Verify
        </button>

        <p className="form-footer">
          Didn’t receive the code? <a href="/forgot-password">Resend OTP</a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default OtpPage;
