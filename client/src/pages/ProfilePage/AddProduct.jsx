import React, { useState } from "react";
import Header from "@/components/HomePage/Header.jsx";
import ProfileHeader from "@/components/Profile/ProfileHeader.jsx";
import mockProfileData from "@/pages/ProfilePage/ProfileData.js";
import SideBar from "@/components/Profile/SideBar.jsx";
import mockProducts from "@/pages/ProfilePage/mockProducts.js";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/HomePage/Footer.jsx";
import InfoApp from "@/components/HomePage/InfoApp.jsx";

export default function AddProduct() {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [country, setCountry] = useState("");
  const [taxEnabled, setTaxEnabled] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    "Mobile Devices",
    "Computers",
    "Cameras",
    "Home Furniture",
    "Home Appliances",
    "Books",
    "Clothing",
    "Footwear",
    "Sports Equipment",
    "Toys and Games",
    "Vehicles",
    "Collectibles",
  ];

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleSave = () => {
    if (!productName || !description || !price || !weight || !country) {
      alert("Please fill in all required fields");
      return;
    }
    const dateOptions = { month: "short", day: "numeric", year: "numeric" };
    const today = new Date().toLocaleDateString("en-US", dateOptions);

    const newProduct = {
      id: mockProducts.length + 1,
      title: productName,
      points: Number(price),
      image: "https://api.builder.io/api/v1/image/assets/TEMP/placeholder?width=336",
      shippingVia: "Standard Shipping",
      trackingId: `TRK-${Math.floor(Math.random() * 1000000)}`,
      status: "Processing",
      eta: "Calculating...",
      lastUpdate: `(${today}) Order Created`,
      state: "new",

      details: {
        description,
        discountPrice,
        weight,
        country,
        taxEnabled,
        categories: selectedCategories,
      },
    };

    mockProducts.push(newProduct);

    console.log("New Product Added:", newProduct);
    console.log("Updated List:", mockProducts);

    navigate("/my-listing");
  };

  const handleCancel = () => {
    console.log("Cancelled");
    return <div>Cancelled</div>;
  };

  return (
    <div className="bg-[#F3F7ED] min-w-full">
      <Header />
      <div className="min-h-screen min-w-full bg-[#F3F7ED]">
        <ProfileHeader profileData={mockProfileData} />
        <div className="flex flex-col md:flex-row">
          <SideBar onLogout={() => {}} />
          <div className="max-w-[1440px] min-w-screen pt-10 flex-row mx-auto mb-8">
            <h1 className="font-roboto text-2xl font-bold text-gray-900 mb-8">Add Product</h1>

            <div className="flex gap-8">
              <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-7">
                  <h2 className="font-roboto text-base font-bold text-gray-900 mb-6">
                    Information
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <span className="block font-roboto text-sm text-gray-600 mb-2">
                        Product Name
                      </span>
                      <input
                        type="text"
                        placeholder="Summer T-Shirt"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full h-10 px-4 rounded border border-gray-300 font-inter text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green-light"
                      />
                    </div>

                    <div>
                      <span className="block font-roboto text-sm text-gray-600 mb-2">
                        Product Description
                      </span>
                      <textarea
                        placeholder="Product description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full h-24 px-4 py-3 rounded border border-gray-300 font-inter text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green-light resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200" />

                <div className="p-7">
                  <h2 className="font-roboto text-base font-bold text-gray-900 mb-6">Images</h2>

                  <div className="border-2 border-dashed border-gray-400 rounded h-[168px] flex items-center justify-center">
                    <div className="text-center">
                      <button className="px-6 py-2 rounded border border-gray-300 bg-white text-blue-600 font-inter text-base hover:bg-gray-50 transition-colors mb-3">
                        Add File
                      </button>
                      <p className="font-inter text-sm text-gray-600">Or drag and drop files</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200" />

                <div className="p-7">
                  <h2 className="font-inter text-base font-bold text-gray-900 mb-6">Price</h2>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <span className="block font-inter text-sm text-gray-600 mb-2">
                        Product Price
                      </span>
                      <input
                        type="text"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full h-10 px-4 rounded border border-gray-300 font-inter text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green-light"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200" />
              </div>

              {/* Categories Sidebar */}
              <div className="w-[350px]">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-7 mb-6">
                  <h2 className="font-inter text-base font-bold text-gray-900 mb-6">Categories</h2>

                  <div className="space-y-3">
                    {categories.map((category) => (
                      <span key={category} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryToggle(category)}
                          className="w-5 h-5 rounded border-gray-300 text-brand-green-light focus:ring-brand-green-light"
                        />
                        <span className="font-inter text-base text-gray-900">{category}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 flex-row ">
                  <button
                    onClick={handleSave}
                    className="flex-1 h-10 rounded border border-gray-300 bg-white text-brand-green-light font-inter text-base hover:bg-gray-50 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 h-10 rounded border border-gray-300 bg-white text-brand-green-light font-inter text-base hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
