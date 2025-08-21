import React from "react";
import SalesSideNavbar from "../../components/SalesSideNavbar";
// import NavBar from "../ui/dashboard/navBar/NavBar";

const layout = ({ children }) => {
  return (
    <div className=" w-full">
      <div className="w-full  h-full flex flex-row">
        <div className="   w-[19%]  ">
          <SalesSideNavbar />
        </div>
        <div className="  px-2 w-[81%]   h-screen ">
          {/* <NavBar /> */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
