"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FaUserCircle, FaEdit, FaUser, FaEnvelope, FaPhone, FaInfoCircle } from "react-icons/fa";

const UserProfile = () => {
  const { data: session } = useSession();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-4 sm:py-6 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
            <FaUserCircle className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Your Profile
          </h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base">
            View and manage your account information
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Profile Image Section */}
            <div className="lg:w-1/3 bg-gradient-to-br from-blue-500 to-purple-600 p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center text-white">
              <div className="w-20 sm:w-24 lg:w-32 h-20 sm:h-24 lg:h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 sm:mb-4 border-4 border-white/30">
                <FaUserCircle className="w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 text-white" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 text-center">
                {session?.user?.username || 'User'}
              </h3>
              <span className="px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium">
                {session?.user?.userType || 'User'}
              </span>
            </div>

            {/* Profile Information Section */}
            <div className="lg:w-2/3 p-4 sm:p-6 lg:p-8">
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                {/* User Type */}
                <div className="flex items-center p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl border border-blue-100">
                  <div className="w-8 sm:w-10 h-8 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                    <FaUser className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">User Type</p>
                    <p className="text-sm sm:text-lg font-semibold text-gray-800">
                      {session?.user?.userType || 'Not specified'}
                    </p>
                  </div>
                </div>

                {/* Username */}
                <div className="flex items-center p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg sm:rounded-xl border border-purple-100">
                  <div className="w-8 sm:w-10 h-8 sm:h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                    <FaUser className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">Username</p>
                    <p className="text-sm sm:text-lg font-semibold text-gray-800">
                      {session?.user?.username || 'Not specified'}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg sm:rounded-xl border border-orange-100">
                  <div className="w-8 sm:w-10 h-8 sm:h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                    <FaEnvelope className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">Email Address</p>
                    <p className="text-sm sm:text-lg font-semibold text-orange-600">
                      {session?.user?.email || 'Not specified'}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg sm:rounded-xl border border-green-100">
                  <div className="w-8 sm:w-10 h-8 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                    <FaPhone className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">Phone Number</p>
                    <p className="text-sm sm:text-lg font-semibold text-gray-800">
                      {session?.user?.phone || 'Not specified'}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <div className="flex items-start p-3 sm:p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg sm:rounded-xl border border-indigo-100">
                  <div className="w-8 sm:w-10 h-8 sm:h-10 bg-indigo-500 rounded-lg flex items-center justify-center mr-3 sm:mr-4 mt-1">
                    <FaInfoCircle className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">Bio</p>
                    <p className="text-sm sm:text-lg font-semibold text-gray-800">
                      {session?.user?.bio || 'No bio provided'}
                    </p>
                  </div>
                </div>

                {/* Edit Profile Button */}
                <div className="pt-2 sm:pt-3 lg:pt-4">
                  <Link href={`/clientsProductsPage/editProfile/${session?.user?._id}`}>
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base">
                      <FaEdit className="w-3 sm:w-4 h-3 sm:h-4" />
                Edit Profile
              </button>
            </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
