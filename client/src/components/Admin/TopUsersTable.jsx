import React from "react";

export default function TopUsersTable({ users }) {
  return (
    <div className="bg-white p-6 rounded-xl">
      <h3 className="font-bold mb-4">Top 5 Users by Revenue</h3>

      <table className="w-full text-sm border-collapse">
        {/* Chia đều 4 cột */}
        <colgroup>
          <col style={{ width: "35%" }} />
          <col style={{ width: "25%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "20%" }} />
        </colgroup>

        <thead className="text-gray-500 border-b">
          <tr>
            <th className="text-left pb-2">ID</th>
            <th className="text-left pb-2">Name</th>
            <th className="text-right pb-2">Total Products</th>
            <th className="text-right pb-2">Revenue</th>
          </tr>
        </thead>

        <tbody>
          {users.slice(0, 5).map((u) => (
            <tr key={u.id} className="border-b last:border-0">
              <td className="py-3">{u.id}</td>
              <td className="py-3">{u.name}</td>
              <td className="py-3 text-right tabular-nums">{u.productsSold}</td>
              <td className="py-3 text-right font-medium tabular-nums">
                {u.revenue.toLocaleString("vi-VN")}₫
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
