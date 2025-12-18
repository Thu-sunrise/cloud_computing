import React, { useState, useEffect } from "react";
import Header from "../../components/HomePage/Header";
import Footer from "../../components/HomePage/Footer";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import OrderSummary from "../../components/HomePage/Cart/OrderSummary";
import CartItem from "../../components/HomePage/Cart/CartItem";
import { cartApi } from "../../api/authApi";
import { CartContext } from "../../context/CartContext";
import { getCloudinaryImage } from "../../utils/cloudinary";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await cartApi.getCart();
      console.log("🛒 CART RESPONSE:", res.data);

      const products = Array.isArray(res.data.data?.products) ? res.data.data.products : [];
      console.log("📦 PRODUCTS RAW:", products);

      const mappedItems = products.map((item, index) => {
        const product = item.id; // populated product

        if (!product || !product._id) {
          console.warn("⚠️ INVALID PRODUCT ITEM:", item);
          return null;
        }

        // Xử lý ảnh: ưu tiên Cloudinary publicId, fallback imageUrl, cuối cùng placeholder
        const imageUrl = product.imagePublicId
          ? getCloudinaryImage(product.imagePublicId)
          : product.imageUrl || "https://via.placeholder.com/136";

        return {
          id: product._id,
          name: product.name || "No Name",
          description: product.description || "",
          price: product.price || 0,
          image: imageUrl,
          checked: false,
        };
      });

      setCartItems(mappedItems.filter(Boolean));
      console.log("✅ MAPPED CART ITEMS:", mappedItems);
    } catch (error) {
      console.error("❌ Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (productId) => {
    try {
      await cartApi.removeOne(productId);
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
    } catch (error) {
      console.error("❌ Failed to remove item:", error);
    }
  };

  const toggleItem = (productId) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, checked: !item.checked } : item))
    );
  };

  const toggleAll = () => {
    const allChecked = cartItems.every((item) => item.checked);
    setCartItems((prev) => prev.map((item) => ({ ...item, checked: !allChecked })));
  };

  const checkedPrices = cartItems.filter((item) => item.checked).map((item) => item.price);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, fetchCart }}>
      <div className="min-h-screen bg-[#E7E7E7] flex flex-col font-sans">
        <Header />

        <main className="flex-grow container mx-auto px-4 py-8 max-w-[1440px]">
          <Breadcrumb
            items={[
              { label: "Home", href: "/home", active: false },
              { label: "Shopping Cart", href: "/home/cart", active: true },
            ]}
          />

          {loading ? (
            <div className="text-center py-10 text-slate-500">Loading...</div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 mt-6 items-start">
              <div className="flex-1 w-full bg-[#CFDDC6] rounded-lg p-4 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="font-['Montserrat'] font-bold text-3xl sm:text-[42px] text-[#283645]">
                    MY CART
                  </h1>

                  <button
                    onClick={toggleAll}
                    className="font-['Roboto'] text-lg sm:text-[23px] text-[rgba(78,78,78,0.73)] hover:text-black hover:underline transition-colors"
                  >
                    {cartItems.every((i) => i.checked) && cartItems.length > 0
                      ? "Deselect All"
                      : "Select All"}
                  </button>
                </div>

                <div className="space-y-4">
                  {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onToggle={toggleItem}
                        onRemove={removeItem}
                      />
                    ))
                  ) : (
                    <div className="text-center py-10 text-slate-500">Your cart is empty.</div>
                  )}
                </div>
              </div>

              <div className="w-full lg:w-[400px] shrink-0">
                <OrderSummary listPrice={checkedPrices} />
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </CartContext.Provider>
  );
}
