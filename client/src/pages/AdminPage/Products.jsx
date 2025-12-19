import React, { useState } from "react";
import { Search, MoreHorizontal, ChevronRight, ChevronLeft } from "lucide-react";
import useProducts from "@/hooks/useProducts";

export default function Products() {
  const {
    products,
    page,
    setPage,
    searchTerm,
    setSearchTerm,
    totalPages,
    totalResults,
    updateProductStatus,
  } = useProducts({ pageSize: 8 });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [statusValue, setStatusValue] = useState("");

  /* ===== STATUS COLOR ===== */
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-500";
      case "pending":
        return "text-blue-400";
      case "sold":
        return "text-purple-500";
      case "deleted":
        return "text-orange-500";
      case "rejected":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const handleUpdateStatus = async () => {
    await updateProductStatus({
      id: selectedProduct.id,
      status: statusValue,
    });

    setSelectedProduct(null);
    setStatusValue("");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Products</h2>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        {/* ===== SEARCH ===== */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        {/* ===== TABLE ===== */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b text-gray-500">
              <tr>
                <th className="py-3 text-left">Product</th>
                <th className="py-3 text-left">Date</th>
                <th className="py-3 text-left">Customer</th>
                <th className="py-3 text-left">Status</th>
                <th className="py-3 text-left">Price</th>
                <th className="py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                      <span className="font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-gray-600">{p.date}</td>
                  <td className="py-3 text-gray-600">{p.customerId}</td>
                  <td className={`py-3 font-medium ${getStatusColor(p.status)}`}>{p.status}</td>
                  <td className="py-3 font-medium">{p.price.toLocaleString()} pts</td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => {
                        setSelectedProduct(p);
                        setStatusValue(p.status);
                      }}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===== PAGINATION ===== */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center gap-2">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
              <ChevronLeft />
            </button>

            <span className="text-sm">
              Page {page} / {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              <ChevronRight />
            </button>
          </div>

          <div className="text-sm text-gray-500">{totalResults} results</div>
        </div>
      </div>

      {/* ===== MODAL ===== */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6 relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded"
            >
              ✕
            </button>

            <h3 className="text-lg font-semibold mb-4">Change Product Status</h3>

            <Select
              label="Status"
              value={statusValue}
              options={["active", "pending", "sold", "rejected", "deleted"]}
              onChange={setStatusValue}
            />

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 border rounded-lg text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateStatus}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== SELECT ===== */
function Select({ label, value, options, onChange }) {
  return (
    <div>
      <label className="text-xs text-gray-500">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
