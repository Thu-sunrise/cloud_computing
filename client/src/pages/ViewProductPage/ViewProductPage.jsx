import React, { useState } from "react";
import PropTypes from "prop-types";

// Components
import Header from "../../components/HomePage/Header";
import Footer from "../../components/HomePage/Footer";
import InfoApp from "../../components/HomePage/InfoApp";
import ProductGrid from "../../components/HomePage/TodayPick/ProductGrid";
import ProductImages from "../../components/ViewProduct/ProductImages";
import ProductInfo from "../../components/ViewProduct/ProductInfo";
import ShopOwnerCard from "../../components/ViewProduct/ShopOwnerCard";
import ProductDescription from "../../components/ViewProduct/ProductDescription";
import ProductReviews from "../../components/ViewProduct/ProductReviews";

//Data
// import mockProductsData from "./mockProductsData.js.js";

// 1. Define static data outside the component (or move to a constants file)
const PRODUCT_IMAGES = [
  "https://picsum.photos/600/500?random=1",
  "https://picsum.photos/600/500?random=2",
  "https://picsum.photos/600/500?random=3",
];

// 2. Small layout wrapper to keep the main code clean
const PageContainer = ({ children, className = "" }) => (
  <div className={`w-full flex flex-col items-center bg-white ${className}`}>
    <div className="max-w-[1080px] w-full px-4 mt-10 mb-20">
      {children}
    </div>
  </div>
);

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default function ViewProductPage() {
  const [activeImage, setActiveImage] = useState(PRODUCT_IMAGES[0]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <PageContainer>
          {/* Top Section: Gallery & Info */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full">
              <ProductImages
                images={PRODUCT_IMAGES}
                mainImage={activeImage}
                setMainImage={setActiveImage}
              />
            </div>
            <div className="w-full">
              <ProductInfo />
            </div>
          </section>

          {/* Divider */}
          <hr className="border-gray-200 my-10" />

          {/* Bottom Section: Details, Shop, Reviews */}
          <section className="flex flex-col gap-8">
            <ProductDescription />
            <ShopOwnerCard />
            <ProductReviews />
          </section>
        </PageContainer>

        {/* Recommendations Section */}
        <section className="bg-gray-50 py-10">
          <ProductGrid headerTitle={"You may also like..."} mode={"carousel"}/>
        </section>
      </main>

      <InfoApp />
      <Footer />
    </div>
  );
}