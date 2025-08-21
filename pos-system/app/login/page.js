"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline, IoPersonCircleOutline } from "react-icons/io5";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(""); // Clear error when user starts typing
  };

  // Form validation
  const validateForm = () => {
    const { email, password } = formData;
    
    if (!email.trim()) {
      return "Email is required";
    }
    
    if (!password.trim()) {
      return "Password is required";
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
        return;
      }

      // Get session to check user type
      const session = await getSession();
      
      if (session?.user?.userType === "Admin") {
        router.push("/dashboard");
      } else {
        router.push("/clientsProductsPage");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const { email, password } = formData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="relative z-10 bg-white/80 backdrop-blur-lg w-full max-w-sm sm:max-w-md px-6 sm:px-8 py-8 sm:py-10 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20">
        {/* Header */}
        <div className="w-full flex flex-col items-center mb-6 sm:mb-8">
          <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg">
            <IoPersonCircleOutline className="text-3xl sm:text-4xl text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Welcome Back</h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <div className="relative">
              <input
                onChange={(e) => handleInputChange("email", e.target.value)}
                value={email}
                className="w-full text-sm py-2.5 sm:py-3 px-3 sm:px-4 bg-white/50 border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200/20 rounded-lg sm:rounded-xl outline-none transition-all duration-200 placeholder-gray-400"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <div className="flex items-center bg-white/50 border border-gray-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-200/20 rounded-lg sm:rounded-xl transition-all duration-200">
                <input
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  value={password}
                  className="w-full text-sm py-2.5 sm:py-3 px-3 sm:px-4 bg-transparent outline-none placeholder-gray-400"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 sm:px-4 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
                >
                  {showPassword ? (
                    <IoEyeOutline className="w-4 sm:w-5 h-4 sm:h-5" />
                  ) : (
                    <IoEyeOffOutline className="w-4 sm:w-5 h-4 sm:h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

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
            disabled={loading}
            className={`w-full text-white text-sm font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="w-4 sm:w-5 h-4 sm:h-5 animate-spin text-white"
                  viewBox="0 0 24 24"
                  fill="none"
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
                <span className="text-xs sm:text-sm">Signing in...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
          <div className="text-center">
            <Link 
              href="/forgotPassword" 
              className="text-blue-600 hover:text-blue-700 font-medium text-xs sm:text-sm hover:underline transition-colors"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="text-center">
            <span className="text-gray-500 text-xs sm:text-sm">
              Don't have an account?{" "}
              <Link 
                href="/register" 
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
              >
                Create one
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;