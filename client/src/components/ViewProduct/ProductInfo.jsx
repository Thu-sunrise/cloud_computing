import React, { useState, useContext } from "react";
import { MapPin } from "lucide-react";
import { cartApi } from "../../api/authApi";
import { CartContext } from "../../context/CartContext";

export default function ProductInfo({ product, owner }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // ✅ Thêm state message
  const { fetchCart } = useContext(CartContext);

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await cartApi.addToCart(product._id.toString());

      setMessage({ type: "success", text: "Product added to cart!" }); // ✅ Hiển thị message
      fetchCart?.();

      // 3s sau tự ẩn
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error("Failed to add to cart:", err);
      setMessage({ type: "error", text: "Failed to add product to cart" });

      setTimeout(() => setMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 relative">
      <h1 className="text-3xl font-semibold">{product.name}</h1>
      <div className="text-2xl font-bold text-[#2f5d3f]">{product.price} Points</div>
      <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>

      {owner?.address && (
        <div className="flex items-center gap-2 text-gray-700">
          <MapPin size={18} />
          <span>{owner.address}</span>
        </div>
      )}

      <div className="text-sm text-gray-500">
        Category: <span className="font-medium">{product.categoryId?.name}</span>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col gap-3 mt-6">
        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="flex-1 border border-gray-400 px-5 py-3 rounded-md hover:bg-gray-100 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add To Cart"}
          </button>
          <button className="flex-1 bg-[#7dac8c] text-white px-5 py-3 rounded-md hover:bg-green-200">
            Buy Now
          </button>
        </div>

        {/* ✅ Thông báo */}
        {message && (
          <div
            className={`mt-2 p-3 rounded-md text-white font-medium ${
              message.type === "success" ? "bg-[#7dac9c]" : "bg-red-500"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}
