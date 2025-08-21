"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { FaUserAlt, FaEdit, FaUsers } from "react-icons/fa";
import { IoLogOutOutline, IoBugOutline } from "react-icons/io5";

const SideBar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    if (typeof window !== "undefined") {
      return window.location.pathname === path;
    }
    return false;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { href: "/dashboard", icon: <MdDashboard />, label: "Dashboard" },
    { href: "/dashboard/addProduct", icon: <BsCart4 />, label: "Add Product" },
    { href: "/dashboard/profile", icon: <FaUserAlt />, label: "Profile" },
    { href: "/dashboard/editProfile", icon: <FaEdit />, label: "Edit Profile" },
    { href: "/dashboard/users", icon: <FaUsers />, label: "Users" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <HiMenuAlt3 className="text-xl" />
        </button>
        </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeMobileMenu}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`h-screen fixed w-full lg:w-[16%] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl transition-transform duration-300 z-50 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="w-full h-full flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-4 sm:py-6 w-full flex items-center justify-between shadow-lg">
            <div className="group relative">
              <div className="border-white border-2 w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-sm">
                <h2 className="text-white font-bold text-lg sm:text-xl">
                  <Link href={"/"}>P</Link>
                </h2>
              </div>
              <div className="absolute -inset-1 bg-white/20 rounded-xl sm:rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
            </div>
            <button
              onClick={closeMobileMenu}
              className="lg:hidden text-white hover:text-white/80 transition-colors"
            >
              <HiMenuAlt3 className="text-xl" />
            </button>
        </div>

          {/* Navigation Items */}
          <div className="flex-1 px-3 sm:px-4 py-4 sm:py-6 space-y-2">
            {navItems.map((item, index) => (
              <div
                key={index}
                className={`group transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg transform scale-105"
                    : "text-gray-300 hover:text-white hover:bg-white/10 rounded-xl"
                }`}
              >
          <Link
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="w-full px-3 sm:px-4 py-3 sm:py-4 flex items-center gap-2 sm:gap-3 transition-all duration-200"
                >
                  <div className={`p-2 rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-white/20 backdrop-blur-sm"
                      : "group-hover:bg-white/10"
                  }`}>
                    {item.icon}
        </div>
                  <span className="font-medium text-sm sm:text-base">{item.label}</span>
          </Link>
        </div>
            ))}
        </div>

          {/* Logout Button */}
          <div className="px-3 sm:px-4 pb-4 sm:pb-6">
          <button
            onClick={() => {
              signOut({ redirect: false }).then(() => {
                  router.push("/");
              });
            }}
              className="w-full group bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-3 sm:px-4 py-3 sm:py-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 sm:gap-3"
          >
              <IoLogOutOutline className="text-lg sm:text-xl" />
              <span className="text-sm sm:text-base">Logout</span>
          </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Toggle for larger screens */}
      <div className="lg:hidden">
        <div className="h-screen w-0"></div>
    </div>
    </>
  );
};

export default SideBar;
