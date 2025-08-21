import { products } from "@/app/api/products/route";
import StartSales from "../../../components/StartSales";
import React from "react";
import { BsCart3 } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { IoIosArrowRoundDown, IoIosNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { LiaSearchSolid } from "react-icons/lia";
import { MdLockReset } from "react-icons/md";
import { fetchProducts } from "@/app/api/fetchProduct/route";

const page = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  // const product = await products();
  const product = await fetchProducts(q);
 
  
  return (
    <div>
      <StartSales products={product}  />
    </div>
  );
};

export default page;
