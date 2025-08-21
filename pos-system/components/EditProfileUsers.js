"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";

const EditProfileUsers = ({ id, phone, bio, email, username }) => {
  const [newUsername, setNewUsername] = useState(username);
  const [newPhone, setNewPhone] = useState(phone);
  const [newEmail, setNewEmail] = useState(email);
  const [newBio, setNewBio] = useState(bio);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/editProfile/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ newUsername, newEmail, newBio, newPhone }),
      });
      if (!res.ok) {
        setLoading(false);
        throw new Error("Failed to update user!!");
      }
      router.refresh();
      toast.success("User updated successfully! ");
      router.push("/clientsProductsPage");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FaUserCircle className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Edit Profile
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Update your account information
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-sm sm:text-base"
                type="text"
                placeholder="Enter username"
                onChange={(e) => setNewUsername(e.target.value)}
                value={newUsername}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-sm sm:text-base"
                type="email"
                placeholder="Enter email"
                onChange={(e) => setNewEmail(e.target.value)}
                value={newEmail}
                required
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-sm sm:text-base"
                type="tel"
                placeholder="Enter phone number"
                onChange={(e) => setNewPhone(e.target.value)}
                value={newPhone}
                required
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-sm sm:text-base resize-none"
                rows={4}
                placeholder="Tell us about yourself"
                onChange={(e) => setNewBio(e.target.value)}
                value={newBio}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              {loading ? (
                <button
                  disabled
                  type="button"
                  className="w-full bg-gray-400 text-white px-6 py-3 rounded-xl font-semibold cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5 animate-spin text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  <span className="text-sm sm:text-base">Updating Profile...</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 text-sm sm:text-base"
                >
                  Update Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileUsers;
