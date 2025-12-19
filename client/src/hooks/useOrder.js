import { useEffect, useMemo, useState } from "react";
import { orderApi } from "@/api/orderApi";
import { mapOrderListFromApiToUI } from "@/utils/order.mapper";

export default function useOrder({ pageSize = 8 } = {}) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await orderApi.getList();
        setOrders(mapOrderListFromApiToUI(res.data.data));
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  /* ===== FILTER ===== */
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => o.orderId.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [orders, searchTerm]);

  /* ===== PAGINATION ===== */
  const totalPages = Math.ceil(filteredOrders.length / pageSize);

  const pagedOrders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredOrders.slice(start, start + pageSize);
  }, [filteredOrders, page, pageSize]);

  return {
    loading,

    // data
    orders: pagedOrders,
    totalOrders: filteredOrders.length,
    totalPages,

    // state
    page,
    setPage,
    searchTerm,
    setSearchTerm,
  };
}
