import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import LoginPage from "../pages/AuthPage/LoginPage";
import RegisterPage from "../pages/AuthPage/RegisterPage";
import ForgotPasswordPage from "../pages/AuthPage/ForgotPasswordPage";
import ChangePasswordPage from "../pages/AuthPage/ChangePasswordPage";
import HomePage from "../pages/HomePage/HomePage";

function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    const pathTitleMap = {
      "/login": "Login | SecondHandLand",
      "/register": "Register | SecondHandLand",
      "/forgot-password": "Forgot Password | SecondHandLand",
      "/change-password": "Change Password | SecondHandLand",
      "/home": "Home | SecondHandLand",
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
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
