import React, { useState } from "react";
import Header from "../../components/HomePage/Header";
import Footer from "../../components/HomePage/Footer";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import OrderSummary from "../../components/HomePage/Cart/OrderSummary";
import CartItem from "../../components/HomePage/Cart/CartItem";
// import Recommend from "../../components/HomePage/Cart/Recommend";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Aurora Wireless Headphones",
      description: "Active noise cancellation",
      price: 5,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/da0ceebcfd861d6714fd9674292fe6d548846bc5?width=272",
      checked: true,
    },
    {
      id: 2,
      name: "Second hand Phone case",
      description: "Suitable for Samsung Users with affordable price",
      price: 4,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/86be281528b523de180bee34489ac64058a9f4b4?width=272",
      checked: true,
    },
    {
      id: 3,
      name: "Old Student Shoe Rack",
      description: "50cm width - 250cm height - 60cm length.",
      price: 12,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/fd2c8930d76c4165f8bb22327e4c4deb1afcc978?width=272",
      checked: true,
    },
    {
      id: 4,
      name: "Secondhand Textbooks",
      description: "For those aiming for good grade in Literature, still in good condition.",
      price: 3,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/ab01140d1468d153b74cbc51b9f516cdb7dd62b7?width=272",
      checked: false,
    },
    {
      id: 5,
      name: "Mini Electric Fan",
      description: "Portable and Available, Require mini Battery.",
      price: 8,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/9d1123d447409e1e367e63c7ed2739f456dd67df?width=272",
      checked: false,
    },
  ]);

  // const [recommendations] = useState([
  //   { id: 1, name: "Hair Comb", price: 4, image: "https://api.builder.io/api/v1/image/assets/TEMP/8c62af914b77dc38e63131c4f7f2fa6274f0ae05?width=510" },
  //   { id: 2, name: "Plastic Basket", price: 3, image: "https://api.builder.io/api/v1/image/assets/TEMP/e6fe2aaf95020bfdc57277274f789cba64fdf0e4?width=510" },
  //   { id: 3, name: "Mechanical Keyboard.", price: 12, image: "https://api.builder.io/api/v1/image/assets/TEMP/9e1695e076f1ba74f1557ae9abd86e8151dbac9b?width=510" },
  //   { id: 4, name: "Old Teddy Bear", price: 7, image: "https://api.builder.io/api/v1/image/assets/TEMP/d8fde9c2acd5d9330cfd44bbb710d87ff0889ef7?width=510" },
  //   { id: 5, name: "Key Board", price: 4, image: "https://api.builder.io/api/v1/image/assets/TEMP/c641d842f26ff9e38fd5b886f1c804a68abad349?width=304" },
  // ]);

  const removeItem = (id) => {
    setCartItems(prev => prev.filter((item) => item.id !== id));
  };

  const toggleItem = (id) => {
    setCartItems(prev =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const toggleAll = () => {
    const allChecked = cartItems.every((item) => item.checked);
    setCartItems(prev => prev.map((item) => ({ ...item, checked: !allChecked })));
  };

  const checkedPrices = cartItems
    .filter((item) => item.checked)
    .map((item) => item.price);

  return (
    <div className="min-h-screen bg-[#E7E7E7] flex flex-col font-sans">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-[1440px]">
        <Breadcrumb
          items={[
            { label: "Home", href: "/home", active: false },
            { label: "Shopping Cart", href: "/home/cart", active: true },
          ]}
        />

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
                {cartItems.every(i => i.checked) && cartItems.length > 0 ? "Deselect All" : "Select All"}
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
                <div className="text-center py-10 text-slate-500 font-['Roboto']">
                  Your cart is empty.
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-[400px] shrink-0">
            <OrderSummary listPrice={checkedPrices} />
          </div>
        </div>

        {/*<Recommend recommendations={recommendations} />*/}

      </main>

      <Footer />
    </div>
  );
}