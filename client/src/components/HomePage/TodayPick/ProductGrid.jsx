// ProductGrid.jsx
import React, { useState } from "react";
import ProductCard from "./ProductCard";

import bgBanner from "../../../assets/images/bgtd.png";

export default function ProductGrid() {
  // Hiển thị 16 sản phẩm đầu tiên
  const [visibleCount, setVisibleCount] = useState(16);

  // Tăng 16 mỗi lần bấm
  const handleViewMore = () => setVisibleCount((prev) => prev + 16);

  // Tạo 40 sản phẩm test
  const products = Array.from({ length: 40 }).map((_, i) => ({
    image: "https://picsum.photos/400?random=" + i,
    title: "Vintage Denim Jacket " + (i + 1),
    condition: "Like New",
    points: 36 + i,
    oldPoints: 67 + i,
    discount: "46% off",
  }));

  return (
    <div className="w-full flex flex-col items-center mb-12 mt-12">
      {/* Banner */}
      <div
        className="w-full h-24 flex items-center justify-center mb-6 bg-cover bg-center text-4xl text-[#283645] font-semibold"
        style={{ backgroundImage: `url(${bgBanner})` }}
      >
        <i>Today's Picks</i>
      </div>

      {/* Grid */}
      <div
        className="
          grid 
          grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
          gap-4 
          w-full max-w-7xl mx-auto
        "
      >
        {products.slice(0, visibleCount).map((p, index) => (
          <ProductCard key={index} {...p} />
        ))}
      </div>

      {/* View More */}
      {visibleCount < products.length && (
        <button
          onClick={handleViewMore}
          className="
    mt-10
    px-10 
    py-3
    bg-[#d6e5cf]
    text-gray-700
    font-semibold
    rounded-md
    shadow
    hover:bg-[#c9dbbe]
    transition
    text-lg
    flex 
    items-center 
    gap-2
  "
        >
          View more
          <span className="text-xl">»</span>
        </button>
      )}
    </div>
  );
}
