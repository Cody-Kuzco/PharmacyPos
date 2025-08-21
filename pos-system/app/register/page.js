"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline, IoPersonCircleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    bio: "",
    userType: "",
    secretKey: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const ADMIN_SECRET_KEY = "Ansong";

  const validatePassword = (password) => {
    if (password.length < 8) return "Password must be at least 8 characters";
    if (password.length > 15) return "Password must not exceed 15 characters";
    return "";
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const validateForm = () => {
    const { username, password, email, phone, bio, userType, secretKey } = formData;

    if (!username.trim() || !password || !email.trim() || !phone.trim() || !bio.trim()) {
      return "All fields are required!";
    }
    if (!userType) return "Please select a user type!";
    
    const passwordError = validatePassword(password);
    if (passwordError) return passwordError;
    
    if (userType === "Admin" && secretKey !== ADMIN_SECRET_KEY) {
      return "Invalid admin secret key!";
    }
    return "";
  };

  const resetForm = () => {
    setFormData({
      username: "", password: "", email: "", phone: "", bio: "", userType: "", secretKey: ""
    });
    setError("");
    setShowPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { secretKey, ...registrationData } = formData;
      
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationData),
      });
      
      const data = await res.json();

      if (res.ok) {
        resetForm();
        toast.success(data.message || "Registration successful!");
        router.push("/login");
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const { username, password, email, phone, bio, userType, secretKey } = formData;
  const isPasswordValid = password.length >= 8 && password.length <= 15;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="relative z-10 bg-white/80 backdrop-blur-lg w-full max-w-sm sm:max-w-md px-6 sm:px-8 py-8 sm:py-10 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <IoPersonCircleOutline className="text-3xl sm:text-4xl text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Create Account</h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">Join our pharmacy management system</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Username */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Username</label>
            <input
              onChange={(e) => handleInputChange("username", e.target.value)}
              value={username}
              className="w-full text-sm py-2.5 sm:py-3 px-3 sm:px-4 bg-white/50 border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200/20 rounded-lg sm:rounded-xl outline-none transition-all duration-200 placeholder-gray-400"
              type="text"
              placeholder="Enter your username"
              required
            />
          </div>
          
          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <div className="flex items-center bg-white/50 border border-gray-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-200/20 rounded-lg sm:rounded-xl transition-all duration-200">
                <input
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  value={password}
                  className="w-full text-sm py-2.5 sm:py-3 px-3 sm:px-4 bg-transparent outline-none placeholder-gray-400"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password (8-15 chars)"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 sm:px-4 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <IoEyeOutline className="w-4 sm:w-5 h-4 sm:h-5" /> : <IoEyeOffOutline className="w-4 sm:w-5 h-4 sm:h-5" />}
                </button>
              </div>
              {password.length > 0 && (
                <div className="flex items-center justify-between mt-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        password.length < 8 ? 'bg-red-500' : 
                        password.length < 12 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${(password.length / 15) * 100}%` }}
                    ></div>
                  </div>
                  <span className={`text-xs font-medium ${
                    isPasswordValid ? 'text-green-600' : 'text-red-500'
                  }`}>
                    {password.length}/15 {isPasswordValid ? '✓' : '✗'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <input
              onChange={(e) => handleInputChange("email", e.target.value)}
              value={email}
              className="w-full text-sm py-2.5 sm:py-3 px-3 sm:px-4 bg-white/50 border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200/20 rounded-lg sm:rounded-xl outline-none transition-all duration-200 placeholder-gray-400"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          
          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <input
              onChange={(e) => handleInputChange("phone", e.target.value)}
              value={phone}
              className="w-full text-sm py-2.5 sm:py-3 px-3 sm:px-4 bg-white/50 border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200/20 rounded-lg sm:rounded-xl outline-none transition-all duration-200 placeholder-gray-400"
              type="tel"
              placeholder="Enter your phone number"
              required
            />
          </div>
          
          {/* Bio */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Bio</label>
            <textarea
              onChange={(e) => handleInputChange("bio", e.target.value)}
              value={bio}
              className="w-full text-sm py-2.5 sm:py-3 px-3 sm:px-4 bg-white/50 border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200/20 rounded-lg sm:rounded-xl outline-none transition-all duration-200 placeholder-gray-400 resize-none"
              placeholder="Tell us about yourself"
              rows={3}
              required
            />
          </div>

          {/* User Type Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">User Type</label>
            <div className="grid grid-cols-2 gap-3">
              <label className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                userType === "User" 
                  ? "border-blue-500 bg-blue-50" 
                  : "border-gray-200 hover:border-gray-300"
              }`}>
                <input
                  type="radio"
                  name="userType"
                  value="User"
                  checked={userType === "User"}
                  onChange={(e) => handleInputChange("userType", e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 mr-3"
                  required
                />
                <span className="text-sm font-medium text-gray-700">User</span>
              </label>
              <label className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                userType === "Admin" 
                  ? "border-purple-500 bg-purple-50" 
                  : "border-gray-200 hover:border-gray-300"
              }`}>
                <input
                  type="radio"
                  name="userType"
                  value="Admin"
                  checked={userType === "Admin"}
                  onChange={(e) => handleInputChange("userType", e.target.value)}
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 mr-3"
                  required
                />
                <span className="text-sm font-medium text-gray-700">Admin</span>
              </label>
            </div>
          </div>

          {/* Admin Secret Key */}
          {userType === "Admin" && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Admin Secret Key</label>
              <input
                onChange={(e) => handleInputChange("secretKey", e.target.value)}
                value={secretKey}
                className="w-full text-sm py-2.5 sm:py-3 px-3 sm:px-4 bg-white/50 border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200/20 rounded-lg sm:rounded-xl outline-none transition-all duration-200 placeholder-gray-400"
                type="password"
                placeholder="Enter admin secret key"
                required
              />
              <p className="text-xs text-gray-500">This key is required for admin registration</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !isPasswordValid}
            className={`w-full text-white text-sm font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
              loading || !isPasswordValid
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 sm:w-5 h-4 sm:h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                <span className="text-xs sm:text-sm">Creating Account...</span>
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-6 sm:mt-8">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors" href="/login">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;