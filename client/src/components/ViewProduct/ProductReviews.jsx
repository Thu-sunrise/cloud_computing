import React from "react";
import { Star } from "lucide-react";

export default function ProductReviews({ reviews }) {
  return (
    <div className="mt-16">
      <h3 className="font-semibold text-lg mb-6">Review Shop</h3>

      <div className="space-y-6 max-w-2xl">
        {reviews.map((r) => (
          <div key={r.id} className="flex gap-4">
            <img src={r.avatar} className="w-12 h-12 rounded-full object-cover" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{r.name}</span>
                <div className="flex text-yellow-500">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} size={14} />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-1">{r.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
