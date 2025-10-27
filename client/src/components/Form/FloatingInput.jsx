import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./FloatingInput.css";

const FloatingInput = ({ id, label, type, value, onChange, error }) => {
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    setHasValue(value && value.trim() !== "");
  }, [value]);

  return (
    <div className={`floating-group ${error ? "has-error" : ""}`}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        required
        className={`floating-input ${hasValue ? "has-value" : ""}`}
      />
      <label htmlFor={id} className="floating-label">
        {label}
      </label>
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
