import validator from "validator";

export const validateRegister = (req, res, next) => {
  const { mail, password } = req.body;
  const email = mail && mail.trim();

  // Email and Password are required
  if (!email || !password) {
    return res.status(400).json({ message: "You need to filled out completely" });
  }

  // Validate email format, Avoiding non-ASCII characters
  if (!(validator.isEmail(email) && /^[\x00-\x7F]+$/.test(email))) {
    return res.status(400).json({ message: "Invalid email format" });
    // Validate password strength, Avoiding non-ASCII characters
  } else if (
    !(
      validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
      }) && /^[a-zA-Z0-9!@#$%^&*()_+\-={}[\]:;"'<>,.?/\\|`~]{8,}$/.test(password)
    )
  ) {
    return res.status(400).json({
      message: "Password must be at least 8 characters long",
    });
  }

  next();
};
