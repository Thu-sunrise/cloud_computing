import React from "react";

export default function ProductImages({ images, mainImage, setMainImage }) {
  return (
    <div className="flex gap-3">
      {/* Thumbnails */}
      <div className="flex flex-col gap-3">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            className={`w-24 h-24 object-cover rounded-md cursor-pointer transition-transform duration-200 
              hover:scale-105 ${mainImage === img ? "ring-2 ring-green-400" : ""}`}
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>

      {/* Main Image */}
      <img
        src={mainImage}
        className="flex-1 h-[360px] object-cover rounded-md transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}
