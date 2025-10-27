import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} SecondHandLand. All rights reserved.</p>
      <p>
        Made with 💚 by <strong>YourName</strong>
      </p>
    </footer>
  );
}
