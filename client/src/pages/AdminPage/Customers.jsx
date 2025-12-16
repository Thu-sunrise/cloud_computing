import React, { useState, useMemo } from "react";
import { mockCustomers } from "@/pages/AdminPage/adminData"; // Đảm bảo đường dẫn import đúng
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function Customers() {
  // 1. State quản lý nội bộ
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // 2. Logic Filter
  const filteredCustomers = useMemo(() => {
    return mockCustomers.filter(
      (c) =>
        c.id.includes(searchTerm) ||
        c.email.includes(searchTerm) ||
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // 3. Logic Pagination
  const totalPages = Math.ceil(filteredCustomers.length / pageSize);
  const pagedCustomers = filteredCustomers.slice((page - 1) * pageSize, page * pageSize);

  // Helper chuyển trang
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="space-y-4">
      {/* Tiêu đề */}
      <h2 className="text-2xl font-bold text-gray-800">Customers</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {/* --- THANH TÌM KIẾM --- */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, email or ID..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        {/* --- BẢNG DỮ LIỆU --- */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="py-4 pl-2">User</th>
                <th className="py-4 px-2">Email</th>
                <th className="py-4 px-2">Orders</th>
                <th className="py-4 px-2">Sold</th>
                <th className="py-4 px-2">Rating</th>
                <th className="py-4 px-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pagedCustomers.length > 0 ? (
                pagedCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="flex items-center gap-3 py-4 pl-2">
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                      />
                      <div>
                        <span className="block font-medium text-gray-800">{c.name}</span>
                        <span className="text-xs text-gray-400">{c.id}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-gray-600">{c.email}</td>
                    <td className="py-4 px-2 text-gray-600">{c.orders}</td>
                    <td className="py-4 px-2 text-gray-600">{c.productsSold}</td>
                    <td className="py-4 px-2">
                      <span className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-xs font-medium border border-yellow-100">
                        ★ {c.rating.score}
                      </span>
                      <span className="text-gray-400 text-xs ml-1">({c.rating.count})</span>
                    </td>
                    <td className="py-4 px-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          c.status === "Active"
                            ? "bg-green-50 text-green-700 border border-green-100"
                            : "bg-red-50 text-red-700 border border-red-100"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-400">
                    No customers found matching "{searchTerm}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- PHÂN TRANG (Pagination) --- */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            <span className="text-sm font-medium text-gray-600 px-2">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 disabled:opacity-30 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="text-sm text-gray-500">{filteredCustomers.length} Results</div>
        </div>
      </div>
    </div>
  );
}
