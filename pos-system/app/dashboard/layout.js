import React from "react";
import SideBar from "./SideBar";
import NavBar from "../ui/dashboard/navBar/NavBar";

const layout = ({ children }) => {
  return (
    <div className="relative w-full min-h-[100vh]">
      <div className="w-full flex h-full">
        <div className="hidden lg:block w-[16%]">
          <SideBar />
        </div>
        <div className="flex-1 px-4 bg-gray-100 h-screen">
          <NavBar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
