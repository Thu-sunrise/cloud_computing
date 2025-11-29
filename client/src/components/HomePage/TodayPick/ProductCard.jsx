// ProductCard.jsx
import React from "react";

export default function ProductCard({ image, title, condition, points, oldPoints, discount }) {
  return (
    <div
      className="bg-[#e4f2da] rounded-xl overflow-hidden shadow-md flex flex-col 
                    transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer text-xl"
    >
      {/* IMAGE */}
      <div className="relative w-full h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
        />
      </div>

      {/* CONTENT */}
      <div className="p-3 flex flex-col gap-1">
        <h3 className="font-semibold text-sm text-xl">{title}</h3>

        {/* CONDITIONS */}
        <div className="flex gap-2 mt-1">
          <span className="border px-2 py-0.5 rounded-md text-xs text-[#f89842] bg-white transition-colors duration-300 hover:bg-[#f89842] hover:text-white">
            {condition}
          </span>
          <span className="border px-2 py-0.5 rounded-md text-xs text-[#f89842] bg-white transition-colors duration-300 hover:bg-[#f89842] hover:text-white">
            {condition}
          </span>
        </div>

        {/* POINTS */}
        <div className="mt-2 text-sm text-xl">
          <span className="font-semibold">{points} points</span>
        </div>

        {/* OLD POINTS */}
        <div className="flex items-center gap-3 text-xs text-gray-500 line-through">
          {oldPoints} points
        </div>

        {/* DISCOUNT */}
        <div className="text-xs text-green-600 font-semibold">{discount} off</div>
      </div>
    </div>
  );
}
