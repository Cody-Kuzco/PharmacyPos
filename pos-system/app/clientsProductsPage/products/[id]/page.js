import { fetchProductsById } from "@/app/api/fetchProduct/route";
import Cart from "@/components/Cart";
import SingleProductPage from "@/components/SingleProductPage";
import React from "react";
import { BsCart3 } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { IoIosArrowRoundDown } from "react-icons/io";
import { LiaSearchSolid } from "react-icons/lia";
const productScreen = async ({ params: { id } }) => {
  const productById = await fetchProductsById(id);
  //   const { state, dispatch } = useContext(Store);
  return (
    <div>
      <SingleProductPage product={productById} />
    </div>
  );
};

export default productScreen;
