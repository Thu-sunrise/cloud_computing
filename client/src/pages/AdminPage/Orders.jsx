import React, { useState, useMemo } from "react";
import { mockOrders } from "@/pages/AdminPage/adminData";
import { Search, Eye, ChevronLeft, ChevronRight, Calendar } from "lucide-react";

export default function Orders() {
  // 2. State nội bộ
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // 3. Logic Filter (Tìm theo Order ID hoặc Buyer ID)
  const filteredOrders = useMemo(() => {
    return mockOrders.filter(
      (o) =>
        o.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.buyerId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // 4. Logic Pagination
  const totalPages = Math.ceil(filteredOrders.length / pageSize);
  const pagedOrders = filteredOrders.slice((page - 1) * pageSize, page * pageSize);

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-50 text-green-700 border-green-100";
      case "Pending":
        return "bg-orange-50 text-orange-700 border-orange-100";
      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-100";
      default:
        return "bg-gray-50 text-gray-700 border-gray-100";
    }
  };

  // Chuyển trang
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Orders</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {/* --- THANH TÌM KIẾM --- */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search Order ID, Buyer..."
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
                <th className="py-4 pl-2">Order ID</th>
                <th className="py-4 px-2">Date</th>
                <th className="py-4 px-2">Buyer</th>
                <th className="py-4 px-2">Seller</th>
                <th className="py-4 px-2">Status</th>
                <th className="py-4 px-2">Price</th>
                <th className="py-4 px-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pagedOrders.length > 0 ? (
                pagedOrders.map((o) => (
                  <tr key={o.orderId} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 pl-2 font-medium text-gray-800">{o.orderId}</td>
                    <td className="py-4 px-2 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-gray-400" />
                        {o.date}
                      </div>
                    </td>
                    <td className="py-4 px-2 text-blue-600 hover:underline cursor-pointer">
                      {o.buyerId}
                    </td>
                    <td className="py-4 px-2 text-blue-600 hover:underline cursor-pointer">
                      {o.sellerId}
                    </td>
                    <td className="py-4 px-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(o.status)}`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="py-4 px-2 font-medium text-gray-800">
                      {o.price.toLocaleString()}₫
                    </td>
                    <td className="py-4 px-2 text-right">
                      <button className="text-gray-400 hover:text-green-600 p-2 rounded hover:bg-green-50 transition-colors">
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-400">
                    No orders found matching "{searchTerm}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- PHÂN TRANG --- */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => handlePageChange(num)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-colors ${
                  page === num
                    ? "bg-green-50 text-green-700 font-bold border border-green-100"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="text-sm text-gray-500">
            Showing {pagedOrders.length} of {filteredOrders.length} orders
          </div>
        </div>
      </div>
    </div>
  );
}
