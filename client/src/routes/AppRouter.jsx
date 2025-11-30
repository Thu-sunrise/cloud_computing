import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import LoginPage from "../pages/AuthPage/LoginPage";
import RegisterPage from "../pages/AuthPage/RegisterPage";
import ForgotPasswordPage from "../pages/AuthPage/ForgotPasswordPage";
import ChangePasswordPage from "../pages/AuthPage/ChangePasswordPage";
import HomePage from "../pages/HomePage/HomePage";
import OtpPage from "../pages/AuthPage/OtpPage";
import ResetPasswordPage from "../pages/AuthPage/ResetPasswordPage";
import ViewProductPage from "../pages/ViewProductPage/ViewProductPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";

import CartPage from "../pages/CartPage/CartPage";
import CheckOutPage from "@/pages/CartPage/CheckOutPage/CheckOutPage.jsx";

function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    const pathTitleMap = {
      "/login": "Login | SecondHandLand",
      "/reset-password": "Reset Password | SecondHandLand",
      "/register": "Register | SecondHandLand",
      "/forgot-password": "Forgot Password | SecondHandLand",
      "/change-password": "Change Password | SecondHandLand",
      "/home": "Home | SecondHandLand",
      "/view-product": "View Product | SecondHandLand",
      "/home/cart": "Cart | SecondHandLand",
      "/home/checkout": "CheckOutPage | SecondHandLand",
      "/profile": "Profile | SecondHandLand",
    };

    document.title = pathTitleMap[location.pathname] || "SecondHandLand";
  }, [location]);

  return null;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <TitleUpdater />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/verify-otp" element={<OtpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/cart" element={<CartPage />} />
        <Route path="/view-product" element={<ViewProductPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/home/cart/checkout" element={<CheckOutPage />} />
      </Routes>
    </BrowserRouter>
  );
}
