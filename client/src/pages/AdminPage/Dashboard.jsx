import TopUsersContainer from "../../components/Admin/TopUsersContainer";
import TopCategoriesContainer from "../../components/Admin/TopCategoriesContainer";

export default function Dashboard() {
  return (
    <div className="p-6">
      {/* Grid 2 cột */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <div className="h-full">
          <TopUsersContainer />
        </div>

        <div className="h-full">
          <TopCategoriesContainer />
        </div>
      </div>
    </div>
  );
}
