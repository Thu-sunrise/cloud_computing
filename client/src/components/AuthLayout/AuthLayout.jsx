import React from "react";
import PropTypes from "prop-types";
import "./AuthLayout.css";
import loginImage from "../../assets/images/login-banner.jpg";

const AuthLayout = ({ title, children }) => {
  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <img src={loginImage} alt="Auth banner" className="auth-image" />
      </div>

      <div className="auth-right">
        <div className="auth-box">
          <h1 className="auth-title">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
};

AuthLayout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
