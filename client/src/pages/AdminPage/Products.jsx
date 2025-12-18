import React, { useState, useMemo } from "react";
import { mockProducts } from "@/pages/AdminPage/adminData";
import { Search, MoreHorizontal, ChevronRight, ChevronLeft } from "lucide-react";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // 1. Logic Filter
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  // 2. Logic Pagination
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const pagedProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize);

  // Helper chọn màu cho Status
  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "text-green-500";
      case "Pending":
        return "text-orange-400";
      case "Rejected":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Products</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {/* THANH TÌM KIẾM */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        {/* BẢNG DỮ LIỆU */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="py-4 pr-4">Product</th>
                <th className="py-4 px-2">Date</th>
                <th className="py-4 px-2">Customer</th>
                <th className="py-4 px-2">Status</th>
                <th className="py-4 px-2">Price</th>
                <th className="py-4 px-2">Category</th>
                <th className="py-4 px-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pagedProducts.length > 0 ? (
                pagedProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 group transition-colors">
                    {/* Cột Product (Ảnh + Tên) */}
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded-md object-cover border border-gray-200"
                        />
                        <span className="font-medium text-gray-800">{p.name}</span>
                      </div>
                    </td>

                    <td className="py-4 px-2 text-gray-600">{p.date}</td>
                    <td className="py-4 px-2 text-gray-600">{p.customerId}</td>

                    {/* Cột Status (Chữ màu) */}
                    <td className={`py-4 px-2 font-medium ${getStatusColor(p.status)}`}>
                      {p.status}
                    </td>

                    <td className="py-4 px-2 text-gray-800 font-medium">
                      {p.price.toLocaleString()} pts
                    </td>
                    <td className="py-4 px-2 text-gray-600">{p.category}</td>

                    {/* Cột Action (Dấu 3 chấm) */}
                    <td className="py-4 px-2 text-right">
                      <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                        <MoreHorizontal size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-400">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PHÂN TRANG (Footer) */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          {/* List số trang */}
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-colors ${
                  page === num
                    ? "bg-blue-50 text-blue-600 font-bold"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages}
              className="ml-2 text-gray-400 hover:text-gray-600 disabled:opacity-30"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Tổng số kết quả */}
          <div className="text-sm text-gray-500">{filteredProducts.length} Results</div>
        </div>
      </div>
    </div>
  );
}
