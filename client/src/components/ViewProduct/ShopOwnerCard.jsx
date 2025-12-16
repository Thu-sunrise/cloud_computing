import React from "react";
import { Star, MessageCircle } from "lucide-react";

export default function ShopOwnerCard() {
  return (
    <div className="flex items-center gap-4 mb-6 p-4 bg-green-50 rounded-md shadow-md border border-green-100">
      <img
        src="https://picsum.photos/100?random=20"
        className="w-16 h-16 rounded-full object-cover border-2 border-green-300"
      />

      <div>
        <div className="font-semibold text-gray-800">Phan Kien</div>
        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          <Star size={14} />
          <span className="text-gray-600">5.0</span>
        </div>
      </div>

      <button className="ml-auto px-4 py-2 flex items-center gap-2 rounded-md bg-[#7dac8c] text-white hover:bg-green-200 transition">
        <MessageCircle size={16} />
        Chat with shop
      </button>
    </div>
  );
}
