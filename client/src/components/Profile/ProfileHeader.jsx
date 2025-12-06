import bgBanner from "@assets/images/hello.png";
import { CheckCircle, ShoppingBag } from "lucide-react";
import React from "react";
import PropTypes from "prop-types";

export default function ProfileHeader({ profileData }) {
  return (
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
            <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.2" fill="none" />
          </svg>
        </div>
      </div>

      <div>
        <p className="text-lg text-gray-700 mt-2 font-medium">Welcome,</p>
        <h1 className="text-4xl font-bold text-[#243242] -mt-1">{profileData.fullName}</h1>
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
  </div>)
}

ProfileHeader.propTypes = {
  profileData: PropTypes.object.isRequired,
};