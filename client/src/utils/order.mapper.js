const STATUS_UI = {
  pending: {
    label: "Pending",
    className: "bg-orange-50 text-orange-700 border-orange-100",
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-blue-50 text-blue-700 border-blue-100",
  },
  shipping: {
    label: "Shipping",
    className: "bg-purple-50 text-purple-700 border-purple-100",
  },
  completed: {
    label: "Completed",
    className: "bg-green-50 text-green-700 border-green-100",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-50 text-red-700 border-red-100",
  },
};

export const mapOrderFromApiToUI = (order) => {
  const statusUI = STATUS_UI[order.status] || {
    label: order.status,
    className: "bg-gray-50 text-gray-700 border-gray-100",
  };

  return {
    /** ===== ORDER IDS ===== */
    orderId: order._id, // ID chính xác

    ownerId: order.ownerId,

    /** ===== PRODUCT IDS ===== */
    productIds: (order.products || []).map((p) => p.id || p._id),

    /** ===== DATE ===== */
    createdAt: order.createdAt,
    date: new Date(order.createdAt).toLocaleDateString("vi-VN"),

    /** ===== STATUS ===== */
    status: order.status,
    statusLabel: statusUI.label,
    statusClass: statusUI.className,
  };
};

export const mapOrderListFromApiToUI = (orders = []) => orders.map(mapOrderFromApiToUI);
