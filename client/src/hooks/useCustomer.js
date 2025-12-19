import { useEffect, useMemo, useState } from "react";
import { customerApi } from "@/api/customerApi";
import { mapCustomerListFromApiToUI } from "@/utils/customer.mapper";

export default function useCustomer({ pageSize = 8 } = {}) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const res = await customerApi.getList({
          page: 1,
          limit: 100,
        });

        setCustomers(mapCustomerListFromApiToUI(res.data.data));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  /* ===== FILTER ===== */
  const filteredCustomers = useMemo(() => {
    return customers.filter(
      (c) =>
        c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [customers, searchTerm]);

  /* ===== PAGINATION ===== */
  const totalPages = Math.ceil(filteredCustomers.length / pageSize);

  const pagedCustomers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredCustomers.slice(start, start + pageSize);
  }, [filteredCustomers, page, pageSize]);

  return {
    /* status */
    loading,
    error,

    /* data */
    customers: pagedCustomers,
    totalCustomers: filteredCustomers.length,
    totalPages,

    /* controls */
    page,
    setPage,
    searchTerm,
    setSearchTerm,
  };
}
