import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import bgBanner from "../../../assets/images/bgtd.png";
import mockProductsData from "@/pages/ViewProductPage/mockProductsData.js";
import { Link } from "react-router-dom";

export default function ProductGrid({
                                      headerTitle,
                                      searchQuery = "",
                                      mode = "loadmore",
                                      itemsPerPage = 12,
                                    }) {
  // 1. Dữ liệu giả lập
  let allProducts = Array.from({ length: 50 }).map((_, i) => ({
    image: "https://picsum.photos/400?random=" + i,
    title: "Vintage Denim Jacket " + (i + 1),
    condition: "Like New",
    points: 36 + i,
    oldPoints: 67 + i,
    discount: "46%",
  }));

  allProducts.splice(2,0, ...mockProductsData);

  const filteredProducts = searchQuery === "notfound" ? [] : allProducts;

  const [visibleCount, setVisibleCount] = useState(itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
    setVisibleCount(itemsPerPage);
  }, [searchQuery, itemsPerPage]);

  let displayedProducts = [];
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (mode === "pagination") {
    const startIndex = (currentPage - 1) * itemsPerPage;
    displayedProducts = filteredProducts.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  } else {
    displayedProducts = filteredProducts.slice(0, visibleCount);
  }

  const handleViewMore = () => setVisibleCount((prev) => prev + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Link to={"/view-product"}
      className="w-full flex flex-col items-center mb-12">
      {/* Banner */}
      <div
        className="w-full h-24 flex items-center justify-center mb-6 bg-cover bg-center text-4xl text-[#283645] font-semibold"
        style={{ backgroundImage: `url(${bgBanner})` }}
      >
        <i>{headerTitle}</i>
      </div>

      {searchQuery === "notfound" && (
        <div className="text-gray-500 text-lg mt-10 mb-20 text-center">
          <p>No products found for &#34;{searchQuery}&#34;</p>
          {/*<span className="text-sm text-gray-400">(Try removing the search term)</span>*/}
        </div>
      )}

      {filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-7xl mx-auto px-4">
          {displayedProducts.map((p, index) => (
            <ProductCard key={index} {...p} />
          ))}
        </div>
      )}

      <div className="mt-10">

        {filteredProducts.length > 0 && (
          <>
            {mode === "loadmore" && visibleCount < filteredProducts.length && (
              <button
                onClick={handleViewMore}
                className="px-10 py-3 bg-[#d6e5cf] text-gray-700 font-semibold rounded-md shadow hover:bg-[#c9dbbe] transition text-lg flex items-center gap-2"
              >
                View more <span className="text-xl">»</span>
              </button>
            )}

            {mode === "pagination" && totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft size={20} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`w-10 h-10 flex items-center justify-center rounded-full transition font-medium
                        ${
                        currentPage === pageNumber
                          ? "bg-[#2f3b40] text-white shadow-lg"
                          : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                      }
                      `}
                    >
                      {pageNumber}
                    </button>
                  )
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </Link>
  );
}

ProductGrid.propTypes = {
  headerTitle: PropTypes.string.isRequired,
  searchQuery: PropTypes.string,
  mode: PropTypes.oneOf(["pagination", "loadmore"]),
  itemsPerPage: PropTypes.number,
};