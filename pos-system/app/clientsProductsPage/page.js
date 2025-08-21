"use client";
import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SideBar from "../dashboard/SideBar";
import { LiaSearchSolid } from "react-icons/lia";
import { IoIosArrowRoundDown, IoIosNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { TbCalendarMonth } from "react-icons/tb";
import { FcExpired } from "react-icons/fc";
import { FaUserAlt } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { CiMoneyBill } from "react-icons/ci";
import { CgToday } from "react-icons/cg";
import SalesSideNavbar from "../../components/SalesSideNavbar";
import Link from "next/link";
import { Store } from "@/redux/store";
const page = () => {
  const { data: session } = useSession();
  const [profile, setProfile] = useState(true);
  const [yesterday, setYesterday] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(false);

  // const [dateTime, setDateTime] = useState(new Date());
  const [dateTime, setDateTime] = useState({ date: "", time: "" });
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;
  
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      setDateTime({
        date: now.toLocaleDateString(undefined, dateOptions),
        time: now.toLocaleTimeString(),
      });
    };
    updateDateTime();
    // Update time every second
    const timer = setInterval(updateDateTime, 1000);
    // Cleanup timer on component unmount
    return () => clearInterval(timer);
    
  }, []);
  const formattedDate = dateTime.date;
  const formattedTime = dateTime.time;
  const [cartInfo, setCartInfo] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    if (session?.user) {
      const userId = session.user._id || session.user.id;
      const storedDate = JSON.parse(localStorage.getItem(`currentDate_${userId}`));
    if (storedDate) {
      setCurrentDate(storedDate);
    }
    }
  }, [session]);
  
  useEffect(() => {
    if (session?.user) {
      const userId = session.user._id || session.user.id;
      // Read only the logged-in user's history
    const storedCartItems = JSON.parse(
        localStorage.getItem(`cartItemsHistory_${userId}`)
    );
    if (storedCartItems) {
        // Ensure saleDate/paymentMethod
        const migratedData = storedCartItems.map(saleGroup => 
          saleGroup.map(sale => ({
            ...sale,
            saleDate: sale.saleDate || new Date().toISOString(),
            paymentMethod: sale.paymentMethod || 'Card Payment'
          }))
        );
        setCartInfo(migratedData);
        localStorage.setItem(`cartItemsHistory_${userId}`, JSON.stringify(migratedData));
      } else {
        setCartInfo([]);
      }
      // Clean legacy generic keys if present
      if (localStorage.getItem("cartItemsHistory")) {
        localStorage.removeItem("cartItemsHistory");
        localStorage.removeItem("currentDate");
        localStorage.removeItem("currentMonth");
        localStorage.removeItem("overallTotalSales");
      }
    }
  }, [session]);
//  console.log(cartInfo)
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
const todayString = today.toISOString().split('T')[0];
const flattenedSalesHistory = cartInfo.flat();
// Calculate the total sales
const overallTotalSales = flattenedSalesHistory.reduce((total, item) => {
  return total + item.productPrice * (item.quantity || 1);
}, 0);

// Filter items created today
const todaySalesItems = flattenedSalesHistory.filter(item => {
  const itemDate = new Date(currentDate).toISOString().split('T')[0];
  return itemDate === todayString;
});

// Calculate the total sales for today
const todayTotalSales = todaySalesItems.reduce((total, item) => {
  return total + item.productPrice * (item.quantity || 1);
}, 0);

// Filter items for the current month
const monthSalesItems = flattenedSalesHistory.filter(item => {
  const itemDate = new Date(currentDate);
  return itemDate.getFullYear() === currentYear && itemDate.getMonth() === currentMonth;
});

// Calculate the total sales for the current month
const totalSalesThisMonth = monthSalesItems.reduce((total, item) => {
  return total + item.productPrice * (item.quantity || 1);
}, 0);
function formatDateTime(dateString) {
  try {
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

  // Options for formatting the date and time
  const options = {
    weekday: 'long',    // "Tuesday"
    year: 'numeric',    // "2025"
    month: 'long',      // "June"
    day: 'numeric',     // "24"
    hour: 'numeric',    // "11"
    minute: 'numeric',  // "25"
    hour12: true,       // AM/PM format
  };

  // Convert to local timezone, formatted as string
  const formatted = date.toLocaleString('en-US', options);
  return formatted;
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
}
  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="w-full h-full flex flex-row">
        <div className="w-full">
          <div className="h-full">
            {/* Navigation */}
            <nav className="flex items-center justify-between py-3 sm:py-4 px-3 sm:px-6 bg-white/90 backdrop-blur-sm border-b border-white/30 shadow-sm">
              <div className="border-gray-200 border-[1px] w-full sm:w-[40%] px-2 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl flex items-center justify-between bg-white/80 backdrop-blur-sm">
                <p className="flex items-center gap-2 sm:gap-3">
                  <LiaSearchSolid className="text-xl sm:text-2xl text-gray-500" />
                  <input
                    type="text"
                    className="w-full outline-none border-none bg-transparent placeholder-gray-400 text-sm sm:text-base" 
                    placeholder="Search products..."
                  />
                </p>
                <IoIosArrowRoundDown className="text-xl sm:text-2xl text-gray-500" />
              </div>
              <div className="flex items-center gap-2 sm:gap-4 ml-3 sm:ml-0">
                <IoSettingsOutline className="cursor-pointer text-lg sm:text-xl text-gray-500 hover:text-gray-700 transition-colors" />
                <IoIosNotificationsOutline className="cursor-pointer text-lg sm:text-xl text-gray-500 hover:text-gray-700 transition-colors" />
                <div className="w-8 sm:w-10 h-8 sm:h-10 lg:w-12 lg:h-12 cursor-pointer rounded-xl sm:rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                  <Link href={"/clientsProductsPage/profile"}>
                    <FaUserAlt className="text-lg sm:text-xl lg:text-2xl text-white" />
                  </Link>
                </div>
              </div>
            </nav>

            {/* Main Content */}
            <div className="py-4 sm:py-6 px-3 sm:px-6">
              {/* Profile and Date Section */}
              <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                {/* Profile Section */}
                <div className="w-full lg:w-[45%] bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg px-4 sm:px-6 py-4 sm:py-6 border border-white/40">
                  <div className="w-full flex flex-col sm:flex-row items-center gap-3 sm:gap-6 border-gray-100 border-b-[1px] pb-3 sm:pb-4 mb-3 sm:mb-4">
                    <button 
                      onClick={() => setProfile(true) || setCurrentWeek(false) || setYesterday(false)} 
                      className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                        profile ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Profile
                    </button>
                    <button 
                      onClick={() => setYesterday(true) || setProfile(false) || setCurrentWeek(false)} 
                      className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                        yesterday ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Yesterday
                    </button>
                    <button 
                      onClick={() => setCurrentWeek(true) || setProfile(false) || setYesterday(false)} 
                      className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                        currentWeek ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Current Week
                    </button>
                  </div>
                  
                  {profile && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Welcome{" "}
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                          {session?.user.username}
                        </span>
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">You are logged in as{" "}
                        <span className="text-red-600 font-semibold">Sales Person</span>
                      </p>
                    </div>
                  )}
                  {yesterday && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Welcome{" "}
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Tahiru</span>
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">You are logged in as{" "}
                        <span className="text-red-600 font-semibold">Sales Person</span>
                      </p>
                    </div>
                  )}
                  {currentWeek && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Welcome{" "}
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Salam</span>
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">You are logged in as{" "}
                        <span className="text-red-600 font-semibold">Sales Person</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Date Section */}
                <div className="w-full lg:w-[45%] border-[#3ABEF9] border-[2px] text-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1A2130] to-[#2A3140] shadow-xl px-4 sm:px-6 py-4 sm:py-6">
                  <p className="text-lg sm:text-2xl text-white/90 mb-2">{formattedDate}</p>
                  <p className="text-3xl sm:text-4xl lg:text-5xl text-white font-bold">{formattedTime}</p>
                </div>
              </div>

              {/* Statistics Cards */}
              <div className="w-full mx-auto mb-6 sm:mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="flex flex-col text-white px-6 sm:px-8 py-4 sm:py-6 rounded-xl sm:rounded-2xl items-center bg-gradient-to-br from-[#FC4100] to-[#FF6B35] shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                  <CiMoneyBill className="text-3xl sm:text-4xl mb-2 sm:mb-3" />
                  <p className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">Overall Total Sales</p>
                  <p className="text-lg sm:text-2xl font-bold">GHS {overallTotalSales}</p>
                </div>
                <div className="flex flex-col text-white px-6 sm:px-8 py-4 sm:py-6 rounded-xl sm:rounded-2xl items-center bg-gradient-to-br from-[#050C9C] to-[#1E3A8A] shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                  <CgToday className="text-3xl sm:text-4xl mb-2 sm:mb-3" />
                  <p className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">Total Sales Today</p>
                  <p className="text-lg sm:text-2xl font-bold">GHS {todayTotalSales}</p>
                </div>
                <div className="flex flex-col text-white px-6 sm:px-8 py-4 sm:py-6 rounded-xl sm:rounded-2xl items-center bg-gradient-to-br from-[#C40C0C] to-[#DC2626] shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                  <FcExpired className="text-3xl sm:text-4xl mb-2 sm:mb-3" />
                  <p className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">Expired Products</p>
                  <p className="text-lg sm:text-2xl font-bold">0</p>
                </div>
                <div className="flex flex-col text-white px-6 sm:px-8 py-4 sm:py-6 rounded-xl sm:rounded-2xl items-center bg-gradient-to-br from-[#FF204E] to-[#E11D48] shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                  <TbCalendarMonth className="text-3xl sm:text-4xl mb-2 sm:mb-3" />
                  <p className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">Sales This Month</p>
                  <p className="text-lg sm:text-2xl font-bold">GHS {totalSalesThisMonth}</p>
                </div>
              </div>

              {/* Sales Log Section */}
              <div className="w-full mx-auto">
                <div className="w-full rounded-xl sm:rounded-2xl shadow-xl px-4 sm:px-6 py-4 sm:py-6 bg-white/80 backdrop-blur-sm border border-white/20">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 sm:mb-6 gap-4">
                    <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent capitalize tracking-wide">
                      Your Sales Log ({session?.user.username})
                    </h2>
                  </div>

                  {/* Table Controls */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
                    <div className="flex items-center gap-2">
                      <p className="text-gray-600 text-sm">Show</p>
                      <input
                        type="number"
                        defaultValue={10} 
                        className="outline-none w-16 border-gray-300 border-[1px] px-2 sm:px-3 py-1 sm:py-2 rounded-lg bg-white/50 text-sm"
                      />
                      <p className="text-gray-600 text-sm">entries</p>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <p className="text-gray-600 text-sm">Search:</p>
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="outline-none border-gray-300 border-[1px] px-3 sm:px-4 py-1 sm:py-2 rounded-lg bg-white/50 text-sm w-full sm:w-auto"
                      />
                    </div>
                  </div>

                  {/* Sales Table */}
                  {cartInfo.length >= 1 ? (
                    <div className="overflow-x-auto">
                      {/* Mobile Card View */}
                      <div className="block lg:hidden space-y-4">
                        {cartInfo.map((product, index) => (
                          product.map((salesHistory) => (
                            <div key={salesHistory._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                              {/* Card Header */}
                              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-sm font-bold text-white mr-3">
                                      {index + 1}
                                    </div>
                                    <div>
                                      <h3 className="text-white font-semibold text-sm">{salesHistory.productName}</h3>
                                      <div className="flex items-center gap-2 mt-1">
                                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-white/20 text-white">
                                          Qty: {salesHistory.quantity}
                                        </span>
                                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-white/20 text-white">
                                          {salesHistory.paymentMethod || 'Card Payment'}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-white font-bold text-lg">
                                      GHS {salesHistory.quantity * salesHistory.productPrice}
                                    </div>
                                    <div className="text-white/80 text-sm">
                                      GHS {salesHistory.productPrice} each
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Card Content */}
                              <div className="p-4">
                                <div className="grid grid-cols-2 gap-4 mb-3">
                                  <div>
                                    <p className="text-xs text-gray-500 mb-1">Payment Method</p>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      salesHistory.paymentMethod === 'Mobile Money'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-blue-100 text-blue-800'
                                    }`}>
                                      {salesHistory.paymentMethod || 'Card Payment'}
                                    </span>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500 mb-1">Sale Date</p>
                                    <div className="text-xs font-medium text-gray-700">
                                      {salesHistory.saleDate ? formatDateTime(salesHistory.saleDate) : 'N/A'}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ))}
                      </div>

                      {/* Desktop Table View */}
                      <table className="hidden lg:table w-full">
                        <thead>
                          <tr className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white">
                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold uppercase tracking-wider">S/N</th>
                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold uppercase tracking-wider">Product Name</th>
                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold uppercase tracking-wider">Quantity</th>
                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold uppercase tracking-wider">Unit Price</th>
                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold uppercase tracking-wider">Total Price</th>
                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold uppercase tracking-wider">Payment Method</th>
                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold uppercase tracking-wider">Sale Date</th>
                        </tr>
                      </thead>
                        <tbody>
                          {cartInfo.map((product, index) => (
                            product.map((salesHistory) => (
                            <tr
                              key={salesHistory._id}
                                className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                              >
                                <td className="px-4 sm:px-6 py-3 sm:py-4 font-semibold text-gray-700 text-sm">
                                  {index + 1}
                                </td>
                                <td className="px-4 sm:px-6 py-3 sm:py-4 font-semibold text-gray-800 text-sm">
                                {salesHistory.productName}
                              </td>
                                <td className="px-4 sm:px-6 py-3 sm:py-4 font-semibold text-gray-700 text-sm">
                                {salesHistory.quantity}
                              </td>
                                <td className="px-4 sm:px-6 py-3 sm:py-4 font-semibold text-green-600 text-sm">
                                GHS {salesHistory.productPrice}
                              </td>
                                <td className="px-4 sm:px-6 py-3 sm:py-4 font-semibold text-gray-800 text-sm">
                                  GHS {salesHistory.quantity * salesHistory.productPrice}
                                </td>
                                <td className="px-4 sm:px-6 py-3 sm:py-4 font-semibold">
                                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                                    salesHistory.paymentMethod === 'Mobile Money'
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-blue-100 text-blue-800'
                                  }`}>
                                    {salesHistory.paymentMethod || 'Card Payment'}
                                  </span>
                              </td>
                                <td className="px-4 sm:px-6 py-3 sm:py-4 font-semibold text-gray-700 text-xs sm:text-sm">
                                  {salesHistory.saleDate ? formatDateTime(salesHistory.saleDate) : 'N/A'}
                              </td>
                            </tr>
                            ))
                          ))}
                        </tbody>
                    </table>
                    </div>
                  ) : (
                    <div className="text-center py-8 sm:py-12">
                      <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CiMoneyBill className="text-3xl sm:text-4xl text-gray-400" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No sales recorded yet!</h3>
                      <p className="text-gray-500 text-sm sm:text-base">
                        You haven't made any sales today, {session?.user.username}. Start selling to see your performance here!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
