import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./FloatingInput.css";

const FloatingInput = ({ id, label, type, value, onChange, error }) => {
  const [hasValue, setHasValue] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setHasValue(value && value.trim() !== "");
  }, [value]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className={`floating-group ${error ? "has-error" : ""}`}>
      <div className="input-wrapper">
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder=" "
          required
          className={`floating-input ${hasValue ? "has-value" : ""}`}
        />
        <label htmlFor={id} className="floating-label">
          {label}
        </label>

        {type === "password" && (
          <button
            type="button"
            className="toggle-password-btn"
            onClick={togglePasswordVisibility}
            aria-label="Toggle password visibility"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
            
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.65 21.65 0 0 1 5.06-6.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.77 21.77 0 0 1-2.18 3.25" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            )}
          </button>
        )}
      </div>

      {error && <p className="input-error">{error}</p>}
    </div>
  );
};

FloatingInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default FloatingInput;
