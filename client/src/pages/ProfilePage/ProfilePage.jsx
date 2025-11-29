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
  Eye,
  EyeOff,
  Plus,
  Save,
  Lock,
  KeyRoundIcon,
  Mail,
  Smartphone,
} from "lucide-react";
import bgBanner from "../../assets/images/hello.png"; // Ensure this path is correct
import Header from "../../components/HomePage/Header";
import InfoApp from "../../components/HomePage/InfoApp";
import Footer from "../../components/HomePage/Footer";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  // State for Profile Form
  const [profileData, setProfileData] = useState({
    fullName: "nigganest",
    email: "",
    phone: "(+84) 111111111",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#F3F7ED]">
        <div
          className="w-full px-10 py-10 flex flex-col md:flex-row items-center justify-between bg-green-100 relative"
          style={{
            backgroundImage: `url(${bgBanner})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex items-start gap-8">
            <div className="relative w-fit">
              <img
                src="https://i.pravatar.cc/200"
                alt="avatar"
                className="w-28 h-28 rounded-full object-cover shadow-lg border-4 border-white"
              />
              <div className="absolute right-0 bottom-0 bg-white rounded-full p-1.5 shadow cursor-pointer hover:bg-gray-100 transition">
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

            <div>
              <p className="text-lg text-gray-700 mt-2 font-medium">Welcome,</p>
              <h1 className="text-4xl font-bold text-[#243242] -mt-1">
                {profileData.fullName}
              </h1>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-xl font-semibold text-gray-800">4.6</span>
                <div className="text-[#F9C847] text-xl">★★★★☆</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-16 pr-10 mt-6 md:mt-0">
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-full p-3 shadow">
                <CheckCircle size={28} className="text-green-600" />
              </div>
              <div>
                <p className="text-3xl font-semibold text-[#374151]">12</p>
                <p className="text-gray-600">Sold</p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-l border-gray-300 pl-8">
              <div className="bg-white rounded-full p-3 shadow">
                <ShoppingBag size={28} className="text-green-700" />
              </div>
              <div>
                <p className="text-3xl font-semibold text-[#374151]">5</p>
                <p className="text-gray-600">Purchased</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row">

          <aside className="w-full md:w-64 bg-white py-8 px-6 border-r border-gray-200">
            <ul className="space-y-6 text-gray-700 font-medium">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-3 cursor-pointer transition-colors ${
                  activeTab === "profile" || activeTab === "payment" || activeTab === "address"
                    ? "text-green-600 border-l-4 border-green-600 pl-3"
                    : "hover:text-green-600"
                }`}
              >
                <User size={20} /> Profile
              </button>
              <li className="flex items-center gap-3 cursor-pointer hover:text-green-600">
                <List size={20} /> My Listing
              </li>
              <li className="flex items-center gap-3 cursor-pointer hover:text-green-600">
                <CreditCard size={20} /> Order History
              </li>
              <li className="flex items-center gap-3 cursor-pointer hover:text-green-600">
                <Heart size={20} /> WishList
              </li>
              <li className="flex items-center gap-3 cursor-pointer hover:text-green-600">
                <Bell size={20} /> Notification
              </li>
            </ul>

            <hr className="my-6 border-gray-200" />

            <ul>
              <li className="flex items-center gap-3 text-red-600 cursor-pointer hover:bg-red-50 p-2 rounded-md transition">
                <LogOut size={20} /> Log out
              </li>
            </ul>
          </aside>

          <div className="flex-1 px-4 md:px-6 py-8">

            <div className="w-full max-w-5xl mx-auto mb-8">
              <div className="flex items-center border-b border-gray-300">

                <button
                  onClick={() => setActiveTab("profile")}
                  className="relative flex-1 md:flex-none md:px-10 py-4 group"
                >
                  <div
                    className={`flex items-center justify-center gap-2 text-lg transition-colors ${
                      activeTab === "profile"
                        ? "text-green-600 font-bold"
                        : "text-gray-500 group-hover:text-green-600"
                    }`}
                  >
                    <User size={20} />
                    <span className="hidden md:inline">Update Profile</span>
                    <span className="md:hidden">Profile</span>
                  </div>
                  {activeTab === "profile" && (
                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-green-600 rounded-t-full"></div>
                  )}
                </button>

                <div className="h-6 w-[1px] bg-gray-300 mx-2 hidden md:block"></div>

                <button
                  onClick={() => setActiveTab("payment")}
                  className="relative flex-1 md:flex-none md:px-10 py-4 group"
                >
                  <div
                    className={`flex items-center justify-center gap-2 text-lg transition-colors ${
                      activeTab === "payment"
                        ? "text-green-600 font-bold"
                        : "text-gray-500 group-hover:text-green-600"
                    }`}
                  >
                    <CreditCard size={20} />
                    <span className="hidden md:inline">Payment Method</span>
                    <span className="md:hidden">Payment</span>
                  </div>
                  {activeTab === "payment" && (
                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-green-600 rounded-t-full"></div>
                  )}
                </button>

                <div className="h-6 w-[1px] bg-gray-300 mx-2 hidden md:block"></div>

                <button
                  onClick={() => setActiveTab("address")}
                  className="relative flex-1 md:flex-none md:px-10 py-4 group"
                >
                  <div
                    className={`flex items-center justify-center gap-2 text-lg transition-colors ${
                      activeTab === "address"
                        ? "text-green-600 font-bold"
                        : "text-gray-500 group-hover:text-green-600"
                    }`}
                  >
                    <MapPin size={20} />
                    Address
                  </div>
                  {activeTab === "address" && (
                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-green-600 rounded-t-full"></div>
                  )}
                </button>
              </div>
            </div>

            <div className="w-full max-w-5xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-sm border border-gray-100 min-h-[500px]">

              {activeTab === "profile" && (
                <form onSubmit={(e) => e.preventDefault()} className="animate-fadeIn">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-[#374151]">Personal Information</h2>
                    <button className="bg-[#7dac8c] hover:bg-[#6b967a] text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium transition shadow-sm">
                      <Save size={18} /> Save Changes
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10">

                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold text-gray-700">
                        Full Name
                      </span>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          name="fullName"
                          value={profileData.fullName}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none text-gray-700 bg-gray-50/50 transition"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold text-gray-700">
                        Phone Number
                      </span>
                      <div className="relative">
                        <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none text-gray-700 bg-gray-50/50 transition"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <span className="text-sm font-semibold text-gray-700">
                        Email Address
                      </span>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none text-gray-700 bg-gray-50/50 transition"
                        />
                      </div>
                    </div>
                  </div>

                  <hr className="border-gray-200 my-8" />

                  <h2 className="text-xl font-bold text-[#374151] mb-6 flex items-center gap-2">
                    <Lock size={20} className="text-green-600"/> Security & Password
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold text-gray-700">
                        Current Password
                      </span>
                      <div className="relative">
                        {/*<KeyRoundIcon className="absolute text-gray-400" size={18} />*/}
                        <input
                          type={showCurrentPass ? "text" : "password"}
                          name="currentPassword"
                          placeholder="••••••••"
                          value={profileData.currentPassword}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none text-gray-700 bg-gray-50/50 transition"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPass(!showCurrentPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showCurrentPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="hidden md:block"></div>

                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold text-gray-700">
                        New Password
                      </span>
                      <div className="relative">
                        <input
                          type={showNewPass ? "text" : "password"}
                          name="newPassword"
                          placeholder="Enter new password"
                          value={profileData.newPassword}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none text-gray-700 bg-gray-50/50 transition"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPass(!showNewPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold text-gray-700">
                        Confirm New Password
                      </span>
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm new password"
                        value={profileData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none text-gray-700 bg-gray-50/50 transition"
                      />
                    </div>
                  </div>
                </form>
              )}

              {activeTab === "address" && (
                <div className="animate-fadeIn">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-semibold text-[#374151]">My Address</h2>
                    <button className="flex items-center gap-2 bg-[#7dac8c] hover:bg-[#6b967a] text-white px-4 py-2 rounded-lg transition shadow-sm">
                      <Plus size={18} /> Add new Address
                    </button>
                  </div>

                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="border border-gray-300 rounded-lg p-6 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 hover:border-green-500 transition-colors bg-gray-50/30"
                    >
                      <div className="md:col-span-2">
                        <div className="flex items-center gap-4">
                          <p className="font-semibold text-lg text-[#374151]">Phan Kien</p>
                          <div className="h-4 w-[1px] bg-gray-400"></div>
                          <p className="text-gray-600">(+84) 398688615</p>
                        </div>
                        <p className="text-gray-700 mt-2 leading-relaxed">
                          1234 Elmwood Crescent, Apt. 5B, Brookside, CA 94022, United States
                        </p>
                        {i === 1 && (
                          <span className="inline-block mt-3 px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 border border-green-200 rounded">
                            Default
                          </span>
                        )}
                        {i !== 1 && (
                          <span className="inline-block mt-3 px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded">
                           Pickup Address
                         </span>
                        )}
                      </div>

                      <div className="flex flex-row md:flex-col justify-end md:justify-between items-center md:items-end gap-3">
                        <div className="flex gap-4">
                          <button className="text-green-700 font-medium hover:underline">Update</button>
                          {i !== 1 && <button className="text-red-500 font-medium hover:underline">Delete</button>}
                        </div>

                        {i !== 1 && (
                          <button className="bg-white border border-gray-300 text-gray-600 hover:text-green-700 hover:border-green-700 px-3 py-1 text-sm rounded transition">
                            Set as default
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* === PAYMENT TAB CONTENT === */}
              {activeTab === "payment" && (
                <div className="flex flex-col items-center justify-center py-20 animate-fadeIn text-center">
                  <div className="bg-gray-100 p-6 rounded-full mb-4">
                    <CreditCard size={48} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-700">No Payment Methods</h3>
                  <p className="text-gray-500 mt-2 max-w-sm">You haven&apos;t saved any payment methods yet. Add a card to checkout faster.</p>
                  <button className="mt-6 bg-[#7dac8c] text-white px-6 py-2 rounded-lg flex items-center gap-2">
                    <Plus size={18} /> Add Payment Method
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <InfoApp />
      <Footer />
    </>
  );
}