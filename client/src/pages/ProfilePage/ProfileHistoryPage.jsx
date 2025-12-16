// ==============================
// File: pages/ProfilePage/ProfileHistoryPage.jsx
// ==============================
import React from "react";
import Header from "../../components/HomePage/Header";
import Footer from "../../components/HomePage/Footer";
import InfoApp from "../../components/HomePage/InfoApp";
import SideBar from "@/components/Profile/SideBar";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import HistoryList from "@/components/Profile/HistoryList";
import mockProfileData from "@/pages/ProfilePage/ProfileData.js";

export default function ProfileHistoryPage() {
  //---------------------------MOCKDATA----------------------------------------
  const titles = [
    "Tiramisu so delicious",
    "Chocolate Cake",
    "Matcha Latte",
    "Strawberry Cheesecake",
    "Milk Tea Premium",
    "Croissant Butter",
  ];

  const shops = ["Candy Candy Shop", "Sweet House", "Bakery Corner", "Coffee Time", "Dessert Lab"];

  const images = [
    "https://images.unsplash.com/photo-1601979031925-424e53b6caaa",
    "https://images.unsplash.com/photo-1541781286675-9f1afc9cfc5c",
    "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
  ];

  const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const historyData = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    title: randomItem(titles),
    shop: randomItem(shops),
    price: Math.floor(Math.random() * 500) + 100,
    image: randomItem(images),
  }));

  ///////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <Header />

      <div className="min-h-screen bg-[#F3F7ED]">
        <ProfileHeader profileData={mockProfileData} />

        <div className="flex">
          <SideBar />

          <main className="flex-1 px-6 py-8">
            <div className="max-w-5xl mx-auto">
              <HistoryList data={historyData} />
            </div>
          </main>
        </div>
      </div>

      <InfoApp />
      <Footer />
    </>
  );
}
