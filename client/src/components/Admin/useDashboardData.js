import { mockUsers, mockCategories } from "@/pages/AdminPage/adminData";

export default function useDashboardData() {
  // sau này thay bằng fetch/axios
  return {
    userUsage: {
      percent: 78,
      totalUser: 957,
    },
    topUsers: [...mockUsers].sort((a, b) => b.revenue - a.revenue),
    topCategories: [...mockCategories].sort((a, b) => b.totalRegister - a.totalRegister),
  };
}
