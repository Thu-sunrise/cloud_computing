import React, { useState } from "react";
import Header from "@/components/HomePage/Header.jsx";
import ProfileHeader from "@/components/Profile/ProfileHeader.jsx";
import SideBar from "@/components/Profile/SideBar.jsx";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/HomePage/Footer.jsx";
import axios from "axios";

export default function AddProduct() {
  const navigate = useNavigate();

  // Form State
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  // File State
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

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
    setSelectedCategories([category]);


  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...files]);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleSave = async () => {
    // 1. Validation
    if (!productName || !description || !price || selectedCategories.length === 0) {
      alert("Please fill in: Name, Description, Price and one Category");
      return;
    }

    try {

      const formData = new FormData();
      formData.append("name", productName);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("status", "active");

      formData.append("categoryName", selectedCategories[0]);

      selectedFiles.forEach((file) => {
        formData.append("file", file);
      });

      await axios.post("/api/product/", formData);

      alert("Product created successfully!");
      navigate("/my-listing");

    } catch (error) {
      console.error("Error creating product:", error);
      alert(error.response?.data?.message || "Failed to create product");
    }
  };

  const handleCancel = () => {
    navigate("/my-listing");
  };

  return (
    <div className="bg-[#F3F7ED] min-w-full">
      <Header />
      <div className="min-h-screen min-w-full bg-[#F3F7ED]">
        <ProfileHeader />

        <div className="flex flex-col md:flex-row">
          <SideBar/>

          <div className="max-w-[1440px] w-full pt-10 px-4 md:px-10 flex flex-col mx-auto mb-8">
            <h1 className="font-roboto text-2xl font-bold text-gray-900 mb-8">Add Product</h1>

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200">

                {/* Information Section */}
                <div className="p-7">
                  <h2 className="font-roboto text-base font-bold text-gray-900 mb-6">Information</h2>
                  <div className="space-y-6">
                    <div>
                      <span className="block font-roboto text-sm text-gray-600 mb-2">
                        Product Name <span className="text-red-500">*</span>
                      </span>
                      <input
                        type="text"
                        placeholder="e.g. MacBook Air M2"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full h-10 px-4 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                      />
                    </div>

                    <div>
                      <span className="block font-roboto text-sm text-gray-600 mb-2">
                        Product Description <span className="text-red-500">*</span>
                      </span>
                      <textarea
                        placeholder="Describe your product..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full h-24 px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200" />

                {/* Images Section */}
                <div className="p-7">
                  <h2 className="font-roboto text-base font-bold text-gray-900 mb-6">Images</h2>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50">
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer bg-white px-6 py-2 border rounded-md text-blue-600 hover:bg-gray-50 mb-2"
                    >
                      Choose Images
                    </label>
                    <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 5MB</p>

                    {previewUrls.length > 0 && (
                      <div className="flex gap-3 mt-6 flex-wrap">
                        {previewUrls.map((url, idx) => (
                          <div key={idx} className="relative group">
                            <img src={url} alt="preview" className="h-20 w-20 object-cover rounded-lg border-2 border-white shadow-md" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200" />

                {/* Price Section */}
                <div className="p-7">
                  <h2 className="font-inter text-base font-bold text-gray-900 mb-6">Pricing</h2>
                  <div className="max-w-xs">
                    <span className="block font-inter text-sm text-gray-600 mb-2">
                      Price ($) <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full h-10 px-4 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Sidebar Right */}
              <div className="lg:w-[350px] flex flex-col gap-6">
                {/* Categories */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-7">
                  <h2 className="font-inter text-base font-bold text-gray-900 mb-6">Category <span className="text-red-500">*</span></h2>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryToggle(category)}
                          className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-green-600 transition-colors">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    className="flex-1 h-12 rounded-lg bg-[#8DCE76] text-white font-bold hover:bg-[#7bc063] transition-all shadow-md"
                  >
                    Publish Product
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 h-12 rounded-lg bg-white border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-all"
                  >
                    Discard
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