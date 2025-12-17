// ProductCard.jsx
import React from "react";
import { MapPin } from "lucide-react";

export default function ProductCard({ image, title, address, points }) {
  return (
    <div
      className="bg-[#e4f2da] rounded-2xl overflow-hidden
                 shadow-sm hover:shadow-xl
                 transition-all duration-300
                 hover:-translate-y-1 cursor-pointer"
    >
      {/* IMAGE */}
      <div className="relative w-full h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover
                     transition-transform duration-500
                     hover:scale-105"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col gap-2">
        {/* TITLE */}
        <h3 className="font-semibold text-lg text-gray-900 leading-snug line-clamp-2">{title}</h3>

        {/* PRICE + ADDRESS (SAME ROW) */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1 shrink-0">
            <span className="text-xl font-bold text-[#2f5d3f] tracking-tight">{points}</span>
            <span className="text-sm font-medium text-gray-600">points</span>
          </div>
          {/* ADDRESS */}
          <div className="flex items-center gap-1 text-sm text-gray-600 min-w-0">
            <MapPin size={14} className="text-gray-500 shrink-0" />
            <span className="truncate">{address}</span>
          </div>

          {/* POINTS */}
        </div>
      </div>
    </div>
  );
}
