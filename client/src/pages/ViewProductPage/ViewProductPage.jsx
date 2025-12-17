import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Layout
import Header from "../../components/HomePage/Header";
import Footer from "../../components/HomePage/Footer";

// Product components
import ProductImages from "../../components/ViewProduct/ProductImages";
import ProductInfo from "../../components/ViewProduct/ProductInfo";
import ShopOwnerCard from "../../components/ViewProduct/ShopOwnerCard";
// import ProductDescription from "../../components/ViewProduct/ProductDescription";
import ProductReviews from "../../components/ViewProduct/ProductReviews";

export default function ViewProductPage() {
  const { id } = useParams();

  // =========================
  // MOCK API DATA (SAU ĐỔI = AXIOS)
  // =========================
  const mockProduct = {
    id,
    name: "Second-hand Wooden House",
    price: 120,
    description:
      "This second-hand wooden house is well preserved and suitable for small families. Quiet neighborhood, easy access to city center.",
    address: "Quận 7, TP. Hồ Chí Minh",
    image: "https://picsum.photos/900/600?random=5",
    category: "Real Estate",
  };

  const mockReviews = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      avatar: "https://picsum.photos/100?random=21",
      rating: 5,
      comment: "Nhà rất đẹp, đúng mô tả, chủ nhà hỗ trợ nhiệt tình.",
    },
    {
      id: 2,
      name: "Trần Thị B",
      avatar: "https://picsum.photos/100?random=22",
      rating: 4,
      comment: "Giá hợp lý, giao dịch nhanh gọn.",
    },
  ];

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // giả lập call api
    setProduct(mockProduct);
    setReviews(mockReviews);
  }, [id]);

  if (!product) return null;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-[50px] py-12">
          {/* =========================
              TOP: IMAGE + INFO
          ========================= */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <ProductImages image={product.image} />
            <ProductInfo product={product} />
          </section>

          {/* =========================
              SHOP OWNER
          ========================= */}
          <ShopOwnerCard />

          {/* =========================
              DESCRIPTION
          ========================= */}
          {/* <ProductDescription description={product.description} /> */}

          {/* =========================
              REVIEWS
          ========================= */}
          <ProductReviews reviews={reviews} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
