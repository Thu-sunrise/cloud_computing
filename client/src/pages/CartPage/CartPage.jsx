import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/HomePage/Header";
import Footer from "../../components/HomePage/Footer";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import CartItem from "../../components/HomePage/Cart/CartItem";
import { cartApi, orderApi } from "../../api/authApi";
import { CartContext } from "../../context/CartContext";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const navigate = useNavigate();

  // =======================
  // Fetch Cart
  // =======================
  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await cartApi.getCart();
      const products = Array.isArray(res.data.data?.products) ? res.data.data.products : [];

      const mappedItems = products
        .map((item) => {
          const product = item.id || item;
          if (!product || !product._id) return null;

          return {
            id: product._id,
            name: product.name || "No Name",
            description: product.description || "",
            price: product.price || 0,
            image:
              product.imagePublicUrl ||
              (product.imagePublicId
                ? `https://res.cloudinary.com/do7o7ymyt/image/upload/${product.imagePublicId}`
                : "https://via.placeholder.com/136"),
            checked: false,
          };
        })
        .filter(Boolean);

      setCartItems(mappedItems);
    } catch (error) {
      console.error("❌ Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // =======================
  // Cart actions
  // =======================
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

  const checkedItems = cartItems.filter((item) => item.checked);
  const totalPrice = checkedItems.reduce((acc, item) => acc + item.price, 0);

  // =======================
  // Handle Checkout
  // =======================
  const handleCheckout = async () => {
    if (checkedItems.length === 0) return;

    try {
      setCheckoutLoading(true);
      const response = await orderApi.createOrder({
        items: checkedItems,
        totalPrice,
      });

      // Chuyển sang trang Checkout, truyền danh sách item vừa tạo
      navigate("/checkout", { state: { listItem: response.data.items || [] } });
    } catch (error) {
      console.error("❌ Failed to create order:", error);
    } finally {
      setCheckoutLoading(false);
    }
  };

  // =======================
  // Render
  // =======================
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
              {/* Cart Items */}
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

              {/* Checkout Section */}
              <div className="w-full lg:w-[400px] shrink-0 bg-[#CFDDC6] rounded-lg p-6 flex flex-col gap-6">
                <div className="flex justify-between text-lg font-medium">
                  <span>Total:</span>
                  <span>{totalPrice} Points</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={checkoutLoading || checkedItems.length === 0}
                  className={`w-full p-4 flex items-center justify-center gap-3 transition-colors rounded-xl ${
                    checkoutLoading || checkedItems.length === 0
                      ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                      : "bg-[#283645] hover:bg-[#1a242f] text-white"
                  }`}
                >
                  {checkoutLoading ? "Processing..." : "Checkout"}
                </button>
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </CartContext.Provider>
  );
}
