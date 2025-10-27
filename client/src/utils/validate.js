const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_-])/;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLogin = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
};
export const validateRegister = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.password) {
    errors.password = "Password is required.";
  } else if (!strongPasswordRegex.test(values.password)) {
    errors.password =
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (!values.agreeTerms) {
    errors.agreeTerms = "You must agree to the terms and conditions.";
  }

  return errors;
};

export const validateChangePassword = (values) => {
  const errors = {};

  if (!values.oldPassword) {
    errors.oldPassword = "Current password is required.";
  }

  if (!values.newPassword) {
    errors.newPassword = "New password is required.";
  } else if (!strongPasswordRegex.test(values.newPassword)) {
    errors.newPassword =
      "New password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
  } else if (values.oldPassword && values.newPassword === values.oldPassword) {
    errors.newPassword = "New password must be different from the old one.";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your new password.";
  } else if (values.confirmPassword !== values.newPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
};

export const validateForgotPassword = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  return errors;
};
