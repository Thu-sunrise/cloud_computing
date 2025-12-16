import UserUsageChart from "../../components/Admin/UserUsageChart";
import TopCategoriesList from "../../components/Admin/TopCategoriesList";
import TopUsersTable from "../../components/Admin/TopUsersTable";
import useDashboardData from "../../components/Admin/useDashboardData";

export default function Dashboard() {
  const { userUsage, topUsers, topCategories } = useDashboardData();

  return (
    <div className="space-y-4">
      {/* Page Title */}
      <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>

      {/* Top section */}
      <div className="grid grid-cols-12 gap-6">
        {/* Top Users - chiếm nhiều không gian */}
        <div className="col-span-8">
          <TopUsersTable users={topUsers} />
        </div>

        {/* Top Categories - nhỏ gọn */}
        <div className="col-span-4">
          <TopCategoriesList categories={topCategories} />
        </div>
      </div>
    </div>
  );
}
