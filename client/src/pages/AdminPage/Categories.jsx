import React, { useState, useMemo } from "react";
import { mockCategories } from "@/pages/AdminPage/adminData";
import { Search, Plus, Pencil, ChevronLeft, ChevronRight } from "lucide-react";

export default function Categories() {
  // 1. Khởi tạo state nội bộ (Khắc phục lỗi undefined do không cần nhận props từ ngoài nữa)
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // 2. Logic Filter (Tìm kiếm)
  const filteredCategories = useMemo(() => {
    return mockCategories.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  // 3. Logic Pagination (Phân trang)
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const currentData = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Helper chuyển trang
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="space-y-4">
      {/* Tiêu đề */}
      <h2 className="text-2xl font-bold text-gray-800">Categories</h2>

      {/* Card chứa nội dung */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {/* THANH CÔNG CỤ: Search + Add Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          {/* Search Input */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset về trang 1 khi search
              }}
            />
          </div>

          {/* Add Category Button */}
          <button className="flex items-center gap-2 bg-[#77B08B] hover:bg-[#5da075] text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <Plus size={18} />
            <span>Add Category</span>
          </button>
        </div>

        {/* BẢNG DỮ LIỆU */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="py-4 pl-2">Category</th>
                <th className="py-4 px-2">Total Products</th>
                <th className="py-4 px-2">Total Earning</th>
                <th className="py-4 px-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentData.length > 0 ? (
                currentData.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    {/* Cột Category: Ảnh + Tên */}
                    <td className="py-4 pl-2">
                      <div className="flex items-center gap-3">
                        {/* Placeholder ảnh vì mockData cũ chưa có field image */}
                        <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center text-gray-400">
                          <img
                            src={`https://via.placeholder.com/40?text=${c.name.charAt(0)}`}
                            alt={c.name}
                            className="w-full h-full object-cover rounded"
                            onError={(e) => (e.target.style.display = "none")}
                          />
                        </div>
                        <span className="font-medium text-gray-800">{c.name}</span>
                      </div>
                    </td>

                    <td className="py-4 px-2 text-gray-600 font-medium">
                      {c.totalProduct.toLocaleString()}
                    </td>
                    <td className="py-4 px-2 text-gray-600">
                      {c.totalEarning.toLocaleString()} pts
                    </td>

                    {/* Cột Action: Nút sửa */}
                    <td className="py-4 px-2 text-right">
                      <button className="text-gray-400 hover:text-gray-600 p-2 rounded hover:bg-gray-100">
                        <Pencil size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-gray-400">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PHÂN TRANG (Footer) */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1">
            {/* Nút Prev */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Số trang */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => handlePageChange(num)}
                className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors ${
                  currentPage === num
                    ? "bg-blue-50 text-blue-600" // Active style
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {num}
              </button>
            ))}

            {/* Nút Next */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Tổng số kết quả */}
          <div className="text-sm text-gray-500">{filteredCategories.length} Results</div>
        </div>
      </div>
    </div>
  );
}
