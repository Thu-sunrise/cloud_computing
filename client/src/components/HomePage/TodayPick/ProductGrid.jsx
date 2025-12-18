import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

import ProductCard from "./ProductCard";
import bgBanner from "../../../assets/images/bgtd.png";
import { productApi } from "../../../api/authApi";
import { getCloudinaryImage } from "../../../utils/cloudinary";

export default function ProductGrid({ headerTitle, searchQuery = "", itemsPerPage = 12 }) {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // URL ?page=
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // ✅ truyền searchQuery vào API nếu có
        const res = await productApi.getList(currentPage, itemsPerPage, {
          ...(searchQuery && { search: searchQuery }),
          status: "active",
        });

        const rawData = res.data?.data || [];

        const normalizedData = rawData.map((p) => ({
          ...p,
          imagePublicId:
            p.imagePublicId || p.thumbnail || p.images?.[0]?.public_id || p.images?.[0] || null,
        }));

        setProducts(normalizedData);

        // 🔥 TÍNH PAGE DỰA TRÊN DATA THẬT
        const totalProducts = res.data?.totalProducts ?? res.data?.total ?? normalizedData.length;

        setTotalPages(Math.max(1, Math.ceil(totalProducts / itemsPerPage)));
      } catch (err) {
        console.error("❌ Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, itemsPerPage, searchQuery]);

  // đổi page → cập nhật URL
  const goToPage = (page) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", page);
      return params;
    });
  };

  return (
    <section className="w-full mb-20">
      {/* BANNER */}
      <div
        className="w-full h-24 flex items-center justify-center mb-[50px]
                   bg-cover bg-center text-4xl font-semibold text-[#283645]"
        style={{ backgroundImage: `url(${bgBanner})` }}
      >
        <i>{headerTitle}</i>
      </div>

      {/* GRID */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-[50px]">
          {products.map((product) => {
            const imageUrl = product.imagePublicId
              ? getCloudinaryImage(product.imagePublicId)
              : "/placeholder.png";

            return (
              <Link key={product._id} to={`/product/${product._id}`}>
                <ProductCard
                  image={imageUrl}
                  title={product.name}
                  address={product.address || "Unknown"}
                  points={product.price}
                />
              </Link>
            );
          })}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-16">
          <button
            onClick={() => goToPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="w-11 h-11 rounded-full border hover:bg-gray-100 disabled:opacity-40"
          >
            <ChevronLeft size={20} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`w-11 h-11 rounded-full font-medium ${
                currentPage === page ? "bg-[#2f5d3f] text-white" : "border hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="w-11 h-11 rounded-full border hover:bg-gray-100 disabled:opacity-40"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </section>
  );
}

ProductGrid.propTypes = {
  headerTitle: PropTypes.string.isRequired,
  searchQuery: PropTypes.string,
  itemsPerPage: PropTypes.number,
};
