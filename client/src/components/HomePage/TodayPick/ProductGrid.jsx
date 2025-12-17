import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import bgBanner from "../../../assets/images/bgtd.png";

export default function ProductGrid({ headerTitle, searchQuery = "", itemsPerPage = 12 }) {
  // =========================
  // MOCK DATA
  // =========================
  const allProducts = Array.from({ length: 48 }).map((_, i) => ({
    id: i + 1,
    image: "https://picsum.photos/400?random=" + i,
    title: "Second-hand House " + (i + 1),
    address: "Quận " + ((i % 12) + 1) + ", TP. Hồ Chí Minh",
    points: 100 + i * 3,
  }));

  const products = searchQuery === "notfound" ? [] : allProducts;

  // =========================
  // PAGING
  // =========================
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = products.slice(startIndex, startIndex + itemsPerPage);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-[50px]">
        {displayedProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`} // ✅ CHUẨN
          >
            <ProductCard {...product} />
          </Link>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-16">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="w-11 h-11 rounded-full border hover:bg-gray-100 disabled:opacity-40"
          >
            <ChevronLeft size={20} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-11 h-11 rounded-full font-medium
                ${currentPage === page ? "bg-[#2f5d3f] text-white" : "border hover:bg-gray-100"}`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
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
