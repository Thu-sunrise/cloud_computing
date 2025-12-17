import React from "react";
import { MapPin } from "lucide-react";

export default function ProductInfo({ product }) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">{product.name}</h1>

      <div className="text-2xl font-bold text-[#2f5d3f]">{product.price} Points</div>

      <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>

      <div className="flex items-center gap-2 text-gray-700">
        <MapPin size={18} />
        <span>{product.address}</span>
      </div>

      <div className="text-sm text-gray-500">
        Category: <span className="font-medium">{product.category}</span>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3 mt-6">
        <button className="flex-1 border border-gray-400 px-5 py-3 rounded-md hover:bg-gray-100">
          Add To Cart
        </button>
        <button className="flex-1 bg-[#7dac8c] text-white px-5 py-3 rounded-md hover:bg-green-200">
          Buy Now
        </button>
      </div>
    </div>
  );
}
