import React, { useState } from "react";
import Sidebar from "@/components/Admin/Sidebar";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Products from "./Products";
import Categories from "./Categories";
import Customers from "./Customers";
import AdminHeader from "@/components/Admin/AdminHeader";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "orders":
        return <Orders />;
      case "products":
        return <Products />;
      case "categories":
        return <Categories />;
      case "customers":
        return <Customers />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="min-h-screen flex bg-[#F3F7ED]">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 p-8"> {renderContent()}</main>
      </div>
    </>
  );
}
