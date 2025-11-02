import { body, validationResult } from "express-validator";

export const validateInput = [
  body("mail")
    .optional({ checkFalsy: true }) // Check if there is a value
    .trim()
    .custom((value) => {
      // regex string that only allows Keyboard Characters. Avoid icon.
      if (!/^[\x00-\x7F]+$/.test(value)) {
        throw new Error("Email contains non-ASCII characters");
      }
      return true;
    })
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .optional({ checkFalsy: true }) // Check if there is a value
    .custom((value) => {
      // regex string that only allows Keyboard Characters. Avoid icon.
      const validChars = /^[a-zA-Z0-9!@#$%^&*()_+\-={}[\]:;"'<>,.?/\\|`~]{8,}$/;
      if (!(validChars.test(value) && value.length >= 8)) {
        throw new Error("Password must be at least 8 characters long and contain valid characters");
      }
      return true;
    }),

  // Middleware handler (must be last)
  (req, res, next) => {
    const { mail, password } = req.body;

    // Missing both email and password
    if (!mail && !password) {
      return res.status(400).json({ message: "At least one field must be filled" });
    }

    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    next();
  },
];
