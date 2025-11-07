import React from "react";
import { ShoppingCart, MessageCircle, Bell, User, Search } from "lucide-react";
import logo from "../../assets/images/logo.png";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      {/* logo */}
      <div className="header__logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* ô tìm kiếm */}
      <div className="header__search">
        <input type="text" placeholder="Default Search" />
        <button>
          <Search size={18} />
        </button>
      </div>

      {/* icon menu */}
      <div className="header__icons">
        <div className="icon">
          <ShoppingCart size={18} />
        </div>
        <div className="icon">
          <MessageCircle size={18} />
        </div>
        <div className="icon">
          <Bell size={18} />
        </div>
        <div className="icon">
          <User size={18} />
        </div>
      </div>
    </header>
  );
}

export default Header;
