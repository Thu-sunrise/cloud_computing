import React from "react";
import { ShoppingCart, MessageCircle, Bell, User, Search } from "lucide-react";
import logo from "../../assets/images/logo.png";

function Header() {
  return (
    <header className="flex items-center justify-between bg-[#7dac8c] px-5 py-1.5 h-[50px]">
      {/* logo */}
      <div className="flex-shrink-0">
        <img src={logo} alt="Logo" className="h-[50px] object-contain" />
      </div>

      <div className="relative mx-10 max-w-[25%] flex-1">
        <input
          type="text"
          placeholder="Search"
          className="w-full h-8 pl-4 pr-10 bg-[#f6f6f6] rounded-full text-sm text-gray-800 outline-none border-none shadow-sm"
        />
        <button className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#2f3b40] rounded-full flex items-center justify-center text-white hover:bg-[#3e4a50] transition-colors duration-200">
          <Search size={14} />
        </button>
      </div>

      {/* icon menu */}
      <div className="flex items-center gap-9">
        <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-200 hover:bg-gray-200 hover:scale-105">
          <ShoppingCart size={18} />
        </div>
        <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-200 hover:bg-gray-200 hover:scale-105">
          <MessageCircle size={18} />
        </div>
        <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-200 hover:bg-gray-200 hover:scale-105">
          <Bell size={18} />
        </div>
        <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-200 hover:bg-gray-200 hover:scale-105">
          <User size={18} />
        </div>
      </div>
    </header>
  );
}

export default Header;
