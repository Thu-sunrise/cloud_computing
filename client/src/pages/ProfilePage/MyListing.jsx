import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Plus } from "lucide-react";

// Components
import SideBar from "@/components/Profile/SideBar.jsx";
import ProductCard from "../../components/ProductCardForMyListing";
import Header from "../../components/HomePage/Header";
import Footer from "../../components/HomePage/Footer";
import InfoApp from "@/components/HomePage/InfoApp.jsx";
import ProfileHeader from "@/components/Profile/ProfileHeader.jsx";
import mockProfileData from "@/pages/ProfilePage/ProfileData.js";

export default function MyListing() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserAndProducts = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const userRes = await axios.get("/api/users/me", config);
        const user = userRes.data;
        setCurrentUser(user);

        const productRes = await axios.get(
          "http://localhost:5000/api/product/list?limit=1000&sort=desc",
          config
        );

        const allProducts = productRes.data.data;

        const myProducts = allProducts.filter((product) => {
          const creatorId = product.createdBy?._id || product.createdBy;
          return creatorId === user._id;
        });

        const mappedProducts = myProducts.map((p) => ({
          id: p._id,
          name: p.name,
          price: p.price,
          status: p.status,
          image: p.images && p.images.length > 0 ? p.images[0].url : "https://via.placeholder.com/150",
          description: p.description
        }));
        // {
        //   "name": "Sony WH-1000XM5 Headphones",
        //   "description": "",
        //   "price": 348,
        //   "imagePublicId": "sonywh100_oeodle",
        //   "status": "active",
        //   "createdBy": "qkiet@example.com",
        //   "categoryName": "Computers"
        // },
        setProducts(mappedProducts);
      } catch (err) {
        console.error("Error loading listings:", err);
        setError("Failed to load your products.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndProducts();
  }, [navigate]);

  return (
    <div className="bg-[#F3F7ED] min-w-full">
      <Header />
      <div className="min-h-screen min-w-full bg-[#F3F7ED]">
        <ProfileHeader profileData={currentUser ? {
          fullName: `${currentUser.name?.firstName || ""} ${currentUser.name?.lastName || ""}`,
          email: currentUser.mail,
          phone: currentUser.phone || "N/A",
          address: currentUser.address || "N/A"
        } : mockProfileData} />

        <div className="flex flex-col md:flex-row">
          <SideBar/>

          <div className="w-full max-w-5xl flex-row pt-4 pl-10 pr-10 space-y-6 mx-auto mb-8">
            <Link
              to="/my-listing/addproduct"
              className="inline-flex bg-[#8DCE76] items-center gap-4 px-6 py-3 rounded-full bg-brand-green-light text-white font-montserrat text-2xl font-semibold hover:bg-opacity-90 transition-colors shadow-md"
            >
              <Plus className="h-6 w-6" />
              Add Product
            </Link>

            {/* Error Message */}
            {error && <div className="text-red-500 font-semibold">{error}</div>}

            {/* Loading State */}
            {loading ? (
              <div className="text-center py-10 text-gray-500 text-xl">Loading your products...</div>
            ) : (
              <div className="space-y-6">
                {products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <p className="text-xl">You haven't listed any products yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <InfoApp />
        <Footer />
      </div>
    </div>
  );
}