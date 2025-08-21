import Link from "next/link";
import React from "react";

const Layout = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-35"></div>
      
      {/* Header */}
      <header className="py-4 sm:py-5 relative z-10">
        <nav className="w-[95%] sm:w-[90%] max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-0">
          {/* Logo */}
          <div className="group relative">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 flex items-center justify-center rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
              <h2 className="text-white font-bold text-2xl">P</h2>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-4 sm:gap-5">
            <Link
              className="text-white/90 hover:text-white px-4 py-2.5 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium text-base"
              href="/register"
            >
              Register
            </Link>
            <Link
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 transform hover:scale-105 text-base"
              href="/login"
            >
              Login
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="w-[95%] sm:w-[90%] max-w-6xl mx-auto mt-16 sm:mt-20 relative z-10 px-4 sm:px-0">
        <div className="flex items-center gap-8 lg:gap-10 flex-col lg:flex-row">
          {/* Hero Content */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4 sm:mb-5">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-white/80 text-sm font-medium">Pharmacy Management System</span>
            </div>
            
            <h1 className="capitalize mb-4 sm:mb-5 text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Smart Pharmacy
              </span>
              <br />
              <span className="text-white">Management</span>
            </h1>
            
            <p className="text-white/90 text-lg sm:text-xl mb-4 sm:mb-5 font-medium max-w-xl mx-auto lg:mx-0">
              Streamline your pharmacy operations with our modern POS system
            </p>
            
            <p className="text-white/70 text-base sm:text-lg mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Intelligent inventory tracking, seamless sales processing, and comprehensive customer management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-10">
              <Link
                href="/register"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg px-6 py-3 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 text-base"
              >
                Get Started Today
              </Link>
              <Link
                href="/login"
                className="border-2 border-white/30 text-white font-semibold rounded-lg px-6 py-3 hover:bg-white hover:text-slate-900 transition-all duration-300 backdrop-blur-sm text-base"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex-1 mt-8 sm:mt-10 lg:mt-0 order-1 lg:order-2 relative">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
              <img 
                src="/2.png" 
                alt="Pharmacy POS System Dashboard"
                className="relative w-full h-auto max-w-sm sm:max-w-lg mx-auto rounded-xl shadow-xl"
              />
            </div>
            
            {/* Floating Elements */}
            <div className="hidden sm:block absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-70 animate-pulse"></div>
            <div className="hidden sm:block absolute -bottom-3 -left-3 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-50 animate-bounce"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;