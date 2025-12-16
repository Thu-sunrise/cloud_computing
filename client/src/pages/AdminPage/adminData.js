export const mockUsers = [
  { id: "U01", name: "Nguyen Van A", revenue: 12000000, productsSold: 320 },
  { id: "U02", name: "Tran Thi B", revenue: 9800000, productsSold: 210 },
  { id: "U03", name: "Le Van C", revenue: 8700000, productsSold: 180 },
  { id: "U04", name: "Pham Thi D", revenue: 6500000, productsSold: 140 },
  { id: "U05", name: "Hoang Van E", revenue: 5200000, productsSold: 95 },
];

export const mockCategories = [
  { id: "C01", name: "Electronics", totalProduct: 120, totalEarning: 25000000 },
  { id: "C02", name: "Fashion", totalProduct: 200, totalEarning: 18000000 },
  { id: "C03", name: "Books", totalProduct: 90, totalEarning: 6000000 },
];

export const mockOrders = Array.from({ length: 32 }).map((_, i) => ({
  orderId: `ORD-${1000 + i}`,
  date: "2025-10-21",
  buyerId: `B${i + 1}`,
  sellerId: `S${i + 1}`,
  status: i % 2 === 0 ? "Completed" : "Pending",
  price: 500000 + i * 10000,
}));

export const mockProducts = Array.from({ length: 25 }).map((_, i) => ({
  id: `P-${i + 1}`,
  name: `Product ${i + 1}`,
  image: "https://via.placeholder.com/60",
  date: "2025-10-20",
  customerId: `U${i + 1}`,
  status: i % 4 === 0 ? "Pending" : i % 4 === 1 ? "Approved" : i % 4 === 2 ? "Rejected" : "Deleted",
  price: 100000 + i * 50000,
  category: "Electronics",
}));

export const mockCustomers = Array.from({ length: 40 }).map((_, i) => ({
  id: `CUS-${i + 1}`,
  name: `Customer ${i + 1}`,
  avatar: "https://i.pravatar.cc/40",
  email: `customer${i + 1}@mail.com`,
  orders: Math.floor(Math.random() * 20),
  productsSold: Math.floor(Math.random() * 50),
  rating: { score: (Math.random() * 2 + 3).toFixed(1), count: Math.floor(Math.random() * 200) },
  status: i % 3 === 0 ? "Inactive" : "Active",
}));
