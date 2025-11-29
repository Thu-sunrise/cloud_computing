import React, { useState } from "react";
import Header from "../../components/HomePage/Header";
import InfoApp from "../../components/HomePage/InfoApp";
import Footer from "../../components/HomePage/Footer";
import ProductGrid from "../../components/HomePage/TodayPick/ProductGrid";

import ProductImages from "../../components/ViewProduct/ProductImages";
import ProductInfo from "../../components/ViewProduct/ProductInfo";
import ShopOwnerCard from "../../components/ViewProduct/ShopOwnerCard";
import ProductDescription from "../../components/ViewProduct/ProductDescription";
import ProductReviews from "../../components/ViewProduct/ProductReviews";

export default function ViewProductPage() {
  const productImages = [
    "https://picsum.photos/600/500?random=1",
    "https://picsum.photos/600/500?random=2",
    "https://picsum.photos/600/500?random=3",
  ];
  const [mainImage, setMainImage] = useState(productImages[0]);

  return (
    <>
      <Header />
      <div className="w-full flex flex-col items-center bg-white">
        <div className="max-w-[1080px] w-full px-4 mt-10">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-6">
              <ProductImages
                images={productImages}
                mainImage={mainImage}
                setMainImage={setMainImage}
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <ProductInfo />
            </div>
          </div>

          <div className="w-full h-px bg-gray-200 my-10"></div>

          <ProductDescription />

          <ShopOwnerCard />

          <ProductReviews />

          <div className="h-20"></div>
        </div>
      </div>

      <ProductGrid />
      {/* <InfoApp /> */}
      <Footer />
    </>
  );
}
