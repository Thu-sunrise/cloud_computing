import React, { useState } from "react";
import {
  User,
  List,
  Heart,
  Bell,
  LogOut,
  CreditCard,
  MapPin,
  CheckCircle,
  ShoppingBag,
  Mail,
  Smartphone,
  Key,
  Eye,
  EyeOff,
  Plus,
} from "lucide-react";
import bgBanner from "../../assets/images/hello.png";
import Header from "../../components/AllPage/HeaderNoNavBar";
import InfoApp from "../../components/HomePage/InfoApp";
import Footer from "../../components/HomePage/Footer";
export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Header></Header>

      <div className="min-h-screen bg-[#F3F7ED]">
        {/* HEADER */}
        <div
          className="w-full px-10 py-10 flex items-center justify-between bg-green-100 relative"
          style={{
            backgroundImage: `url(${bgBanner})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* LEFT */}
          <div className="flex items-start gap-8">
            {/* AVATAR + CAMERA */}
            <div className="relative w-fit">
              <img
                src="https://i.pravatar.cc/200"
                alt="avatar"
                className="w-28 h-28 rounded-full object-cover shadow-lg border-4 border-white"
              />

              {/* Camera icon */}
              <div className="absolute right-0 bottom-0 bg-white rounded-full p-1.5 shadow cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  className="text-gray-700"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    d="M3 7h3l2-2h6l2 2h3v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7z"
                  />
                  <circle
                    cx="12"
                    cy="13"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    fill="none"
                  />
                </svg>
              </div>
            </div>

            {/* TEXT + RATING */}
            <div>
              <p className="text-lg text-gray-700 mt-2">Welcome,</p>
              <h1 className="text-4xl font-bold text-[#243242] -mt-1">Phan Kien</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <span className="text-xl font-semibold text-gray-800">4.6</span>
                <div className="text-[#F9C847] text-xl">★★★★☆</div>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="flex items-center gap-16 pr-10">
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-full p-3 shadow">
                <CheckCircle size={28} className="text-green-600" />
              </div>
              <div>
                <p className="text-3xl font-semibold text-[#374151]">0</p>
                <p className="text-gray-600">Sold</p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-l pl-8">
              <div className="bg-white rounded-full p-3 shadow">
                <ShoppingBag size={28} className="text-green-700" />
              </div>
              <div>
                <p className="text-3xl font-semibold text-[#374151]">0</p>
                <p className="text-gray-600">Purchased</p>
              </div>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="flex">
          {/* SIDEBAR */}
          <aside className="w-64 bg-white py-8 px-6 border-r">
            <ul className="space-y-6 text-gray-700">
              <li className="flex items-center gap-3 font-semibold text-green-600 border-l-4 border-green-600 pl-3 cursor-pointer">
                <User size={20} /> Profile
              </li>
              <li className="flex items-center gap-3 cursor-pointer">
                <List size={20} /> My Listing
              </li>
              <li className="flex items-center gap-3 cursor-pointer">
                <CreditCard size={20} /> Order History
              </li>
              <li className="flex items-center gap-3 cursor-pointer">
                <Heart size={20} /> WishList
              </li>
              <li className="flex items-center gap-3 cursor-pointer">
                <Bell size={20} /> Notification
              </li>
            </ul>

            <hr className="my-6" />

            <ul>
              <li className="flex items-center gap-3 text-red-600 cursor-pointer">
                <LogOut size={20} /> Log out
              </li>
            </ul>
          </aside>

          {/* MAIN */}
          <div className="flex-1 px-6 justify-center">
            {/* TAB BAR */}
            <div className="w-full max-w-5xl mx-auto">
              <div className="flex items-center border-b">
                {/* TAB: PROFILE */}
                <button
                  onClick={() => setActiveTab("profile")}
                  className="relative inline-flex flex-col items-center justify-center px-10 py-4"
                >
                  <div
                    className={`flex items-center gap-2 text-lg ${
                      activeTab === "profile" ? "text-green-600 font-semibold" : "text-gray-700"
                    }`}
                  >
                    <User size={20} />
                    Update Profile
                  </div>

                  {activeTab === "profile" && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-[70%] bg-green-600 rounded-full"></div>
                  )}
                </button>

                <div className="h-10 w-[1px] bg-gray-300"></div>

                {/* TAB: PAYMENT */}
                <button
                  onClick={() => setActiveTab("payment")}
                  className="relative inline-flex flex-col items-center justify-center px-10 py-4"
                >
                  <div
                    className={`flex items-center gap-2 text-lg ${
                      activeTab === "payment" ? "text-green-600 font-semibold" : "text-gray-700"
                    }`}
                  >
                    <CreditCard size={20} />
                    Payment Method
                  </div>

                  {activeTab === "payment" && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-[70%] bg-green-600 rounded-full"></div>
                  )}
                </button>

                <div className="h-10 w-[1px] bg-gray-300"></div>

                {/* TAB: ADDRESS */}
                <button
                  onClick={() => setActiveTab("address")}
                  className="relative inline-flex flex-col items-center justify-center px-10 py-4"
                >
                  <div
                    className={`flex items-center gap-2 text-lg ${
                      activeTab === "address" ? "text-green-600 font-semibold" : "text-gray-700"
                    }`}
                  >
                    <MapPin size={20} />
                    Address
                  </div>

                  {activeTab === "address" && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-[70%] bg-green-600 rounded-full"></div>
                  )}
                </button>
              </div>
            </div>

            {/* CONTENT */}
            <div className="w-full max-w-5xl mx-auto bg-white p-10 rounded-xl shadow-sm">
              {activeTab === "address" && (
                <>
                  {/* HEADER */}
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-semibold text-[#374151]">My Address</h2>

                    <button className="flex items-center gap-2 bg-[#7dac8c] text-white px-4 py-2 rounded-lg">
                      <Plus size={18} /> Add new Address
                    </button>
                  </div>

                  {/* ADDRESS LIST */}
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="border border-gray-300 rounded-lg p-6 mb-6 grid grid-cols-3"
                    >
                      <div className="col-span-2">
                        <div className="flex justify-between">
                          <p className="font-semibold text-lg text-[#374151]">Phan Kien</p>
                          <p className="text-gray-600">(+84) 398688615</p>
                        </div>

                        <p className="text-gray-700 mt-2">
                          1234 Elmwood Crescent, Apt. 5B, Brookside, CA 94022, United States
                        </p>

                        <span className="inline-block mt-3 px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded">
                          {i === 1 ? "default" : "Pickup address"}
                        </span>
                      </div>

                      <div className="flex flex-col justify-between items-end">
                        <button className="text-green-700 font-semibold">Update</button>

                        <button className="bg-green-100 text-green-700 px-3 py-1 rounded-lg">
                          Set to default
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {activeTab === "payment" && (
                <div className="text-xl text-gray-700">Payment Method Content...</div>
              )}

              {activeTab === "profile" && (
                <div className="text-xl text-gray-700">Profile Section...</div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <InfoApp></InfoApp> */}
      <Footer></Footer>
    </>
  );
}
