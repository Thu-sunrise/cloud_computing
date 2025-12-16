import React from "react";
import { Star, ChevronRight } from "lucide-react";

export default function ProductReviews() {
  return (
    <>
      <h3 className="font-semibold text-lg mb-4">Review Shop</h3>
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-3">
            <img
              src={`https://picsum.photos/100?random=${30 + i}`}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <div className="font-medium text-sm">Melanie</div>
                <div className="flex items-center text-yellow-500">
                  <Star size={14} />
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-1">
                Amazing product! Absolutely love it, delivery was super fast.
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1 text-gray-600 mt-4 text-sm cursor-pointer">
        <span>See more</span>
        <ChevronRight size={16} />
      </div>
    </>
  );
}
