import React from "react";
import { MapPin } from "lucide-react";

export default function ProductInfo() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">Asgaard sofa</h1>

      <div className="flex items-center gap-4">
        <div className="text-xl font-bold">100 Points</div>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">
        Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact,
        stout-hearted hero with a well-balanced audio which boasts a clear midrange.
      </p>

      <div className="flex items-center gap-2 text-gray-700 mt-4">
        <MapPin size={18} />
        <span>Abbey Road, London City</span>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <button className="flex-1 border border-gray-400 px-5 py-3 rounded-md hover:bg-gray-100 transition">
          Add To Cart
        </button>
        <button className="flex-1 border border-gray-400 px-5 py-3 rounded-md hover:bg-gray-100 transition">
          Add To Wishlist
        </button>
        <button className="flex-1 bg-[#7dac8c] text-white px-5 py-3 rounded-md hover:bg-green-200 transition">
          Buy Now
        </button>
      </div>

      <p className="text-xs text-gray-500">Secured transaction • Hand-made wood material</p>
    </div>
  );
}
