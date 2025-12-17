import SideBar from "@/components/Profile/SideBar.jsx";
import { Link } from "react-router-dom";
import { Plus} from "lucide-react";
import ProductCard from "../../components/ProductCardForMyListing";
import Header from "../../components/HomePage/Header";
import Footer from "../../components/HomePage/Footer";
import React from "react";
import InfoApp from "@/components/HomePage/InfoApp.jsx";
import ProfileHeader from "@/components/Profile/ProfileHeader.jsx";
import mockProfileData from "@/pages/ProfilePage/ProfileData.js";
import mockProducts from "./mockProducts.js";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.jsx";

export default function MyListing() {
  window.scrollTo(0, 0);
  return (
    <div className="bg-[#F3F7ED] min-w-full">
      <Header />
      <div className="min-h-screen min-w-full bg-[#F3F7ED]">
        {/*<div className="pl-10 mt-4 mb-4"><Breadcrumb*/}
        {/*  items={[*/}
        {/*    { label: "Home", href: "/home", active: false },*/}
        {/*    { label: "My Listing", href: "/home/my-listing", active: true }*/}

        {/*  ]}*/}
        {/*/>*/}
        {/*</div>*/}
        <ProfileHeader profileData={mockProfileData}/>
        <div className="flex flex-col md:flex-row">
          <SideBar onLogout={()=>{}}/>
          <div className="w-full max-w-5xl flex-row pt-4 pl-10 pr-10 space-y-6 mx-auto mb-8">
           <Link
            to="/my-listing/addproduct"
            className="inline-flex bg-[#8DCE76] items-center gap-4 px-6 py-3 rounded-full bg-brand-green-light text-white font-montserrat text-2xl font-semibold hover:bg-opacity-90 transition-colors shadow-md"
            >
              <Plus className="h-6 w-6" />
              Add Product
            </Link>
          <div className="space-y-6">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
            ))}
            </div>
          </div>

      </div>
        <InfoApp/>
        <Footer/>
    </div>
      </div>
  );
}
