"use client";
import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdDashboard, MdProductionQuantityLimits } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";
import { FaChartColumn, FaUsers } from "react-icons/fa6";
import { IoIosArrowForward, IoIosArrowDown, IoIosLogOut } from "react-icons/io";
import { FaMessage } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { TbLogout } from "react-icons/tb";
import { IoCartOutline } from "react-icons/io5";
const SideBar = () => {
  const path = usePathname();
  const { data: session } = useSession();
  const isActive = (pathName) => {
    return path === pathName;
  };
  const router = useRouter();
  return (
    <div className=" h-screen fixed  w-[19%] ">
      <div className=" w-full">
        <div className=" bg-black text-white px-4  py-4 w-full flex items-center justify-between">
          <div className=" border-white border-[2px] w-8 h-8 flex items-center justify-center rounded-full">
            <h2 className=" text-white font-semibold text-xl">
              {" "}
              <Link href={"/"}>P</Link>{" "}
            </h2>
          </div>
          <HiMenuAlt3 className=" cursor-pointer font-semibold text-xl text-white" />
        </div>
        <div
          className={
            isActive("/clientsProductsPage")
              ? `w-full px-4 py-3 border-b-gray-200 border-b-[2px]  border-r-[5px] shadow-sm border-blue-500 bg-gray-100 flex items-center gap-2`
              : `w-full px-4 py-3 border-b-gray-200 border-b-[2px] flex items-center gap-2`
          }
        >
          <MdDashboard
            className={
              isActive("/clientsProductsPage")
                ? ` text-2xl text-blue-500`
                : `
              text-2xl text-gray-600`
            }
          />
          <Link
            href={"/clientsProductsPage"}
            className={
              isActive("/clientsProductsPage")
                ? `text-blue-500 cursor-pointer `
                : ` text-gray-500 cursor-pointer`
            }
          >
            {" "}
            Home
          </Link>
        </div>
        <div
          className={
            isActive("/clientsProductsPage/startSales")
              ? `w-full px-4 py-3 border-b-gray-200 border-b-[2px]  border-r-[5px] shadow-sm border-blue-500 bg-gray-100 flex items-center gap-2`
              : `w-full px-4 py-3 border-b-gray-200 border-b-[2px] flex items-center gap-2`
          }
        >
          <BiImageAdd
            className={
              isActive("/clientsProductsPage/startSales")
                ? `text-2xl text-blue-500`
                : ` text-2xl text-gray-600`
            }
          />
          <Link
            href={"/clientsProductsPage/startSales"}
            className={
              isActive("/clientsProductsPage/startSales")
                ? `text-blue-500 cursor-pointer`
                : `cursor-pointer text-gray-600`
            }
          >
            {" "}
            Start Sales
          </Link>
        </div>
        <div
          className={
            isActive("/clientsProductsPage/profile")
              ? `w-full px-4 py-3 border-b-gray-200 border-b-[2px]  border-r-[5px] shadow-sm border-blue-500 bg-gray-100 flex items-center gap-2`
              : `w-full px-4 py-3 border-b-gray-200 border-b-[2px] flex items-center gap-2`
          }
        >
          <CgProfile
            className={
              isActive("/clientsProductsPage/profile")
                ? `text-2xl text-blue-500`
                : ` text-2xl text-gray-600`
            }
          />
          <Link
            href={"/clientsProductsPage/profile"}
            className={
              isActive("/clientsProductsPage/profile")
                ? `text-blue-500 cursor-pointer`
                : `cursor-pointer text-gray-600`
            }
          >
            Profile
          </Link>
        </div>
        <div
          className={
            isActive(`/clientsProductsPage/cart`)
              ? `w-full px-4 py-3 border-b-gray-200 border-b-[2px]  border-r-[5px] shadow-sm border-blue-500 bg-gray-100 flex items-center gap-2`
              : `w-full px-4 py-3 border-b-gray-200 border-b-[2px] flex items-center gap-2`
          }
        >
          <IoCartOutline
            className={
              isActive(`/clientsProductsPage/cart`)
                ? `text-2xl text-blue-500`
                : ` text-2xl text-gray-600`
            }
          />
          <Link
            href={`/clientsProductsPage/cart`}
            className={
              isActive(`/clientsProductsPage/cart`)
                ? `text-blue-500 cursor-pointer`
                : `cursor-pointer text-gray-600`
            }
          >
            Cart
          </Link>
        </div>
        <div
          className={
            isActive("/dashboard/users")
              ? `w-full px-4 py-3 border-b-gray-200 border-b-[2px]  border-r-[5px] shadow-sm border-blue-500 bg-gray-100 flex items-center gap-2`
              : `w-full px-4 py-3 border-b-gray-200 border-b-[2px] flex items-center gap-2`
          }
        >
          <TbLogout
            className={
              isActive("/dashboard/users")
                ? `text-2xl text-blue-500`
                : ` text-3xl text-gray-600 hover:text-blue-500`
            }
          />
          <button
            onClick={() => {
              signOut({ redirect: false }).then(() => {
                router.push("/"); // Redirect to the dashboard page after signing out
              });
            }}
            className={
              isActive("/dashboard/users")
                ? `text-blue-500 cursor-pointer`
                : `cursor-pointer text-gray-600 hover:text-blue-500`
            }
          >
            Logout
          </button>
        </div>

        {/* <div
          className={
            isActive("/dashboard/reportBug")
              ? `w-full px-4 py-3 border-b-gray-200 border-b-[2px]  border-r-[5px] shadow-sm border-blue-500 bg-gray-100 flex items-center gap-2`
              : `w-full px-4 py-3 border-b-gray-200 border-b-[2px] flex items-center gap-2`
          }
        >
          <FaMessage
            className={
              isActive("/dashboard/reportBug")
                ? `text-2xl text-blue-500`
                : ` text-2xl text-gray-600`
            }
          />
          <Link
            href={"/dashboard/reportBug"}
            className={
              isActive("/dashboard/reportBug")
                ? `text-blue-500 cursor-pointer`
                : `cursor-pointer text-gray-600`
            }
          >
            {" "}
            Report Bug
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default SideBar;
