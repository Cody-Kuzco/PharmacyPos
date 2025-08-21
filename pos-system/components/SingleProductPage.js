"use client";
import { Store } from "@/redux/store";
import React, { useContext, useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { IoIosArrowRoundDown } from "react-icons/io";
import { LiaSearchSolid } from "react-icons/lia";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
const SingleProductPage = ({ product }) => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, []);
  // console.log(cartItemsCount)
  const router = useRouter();
  const addToCartHandler = async () => {
    const existingItem = state.cart.cartItems.find(
      (x) => x._id === product._id
    );
    const quantity = existingItem ? existingItem.quantity + 1 : 1;
    if (product.productQuantity < quantity) {
      toast.error("Sorry! product is out of stock");
      return;
    }
    toast.success("Product added to cart");
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/clientsProductsPage/cart");
  
  };
  return (
    <div className=" w-full">
      <nav className=" flex items-center  justify-between py-3 px-3">
        <div className=" border-gray-300 border-[1px] w-[40%] py-1 rounded-md flex items-center justify-between ">
          <p className=" flex items-center gap-2">
            <LiaSearchSolid className=" text-2xl" />
            <input
              type="text"
              className=" w-full outline-none border-none"
              placeholder="Search Here"
            />
          </p>
          <IoIosArrowRoundDown className=" text-2xl" />
        </div>
        <Link href={`/clientsProductsPage/cart`}>
          <div className=" relative  flex items-center gap-4">
            <BsCart3 className=" text-gray-500 font-semibold cursor-pointer mr-1     text-xl" />
            
            <div className=" w-10 h-10 cursor-pointer rounded-full flex items-center justify-center bg-gray-300">
              <FaUserAlt className=" text-2xl" />
            </div>
            <span className="  absolute right-12 top-0 bg-[#FF0000] text-white flex items-center justify-center w-4 h-4 text-xs  rounded-full">
              {cartItemsCount > 0 ? (
                <span>{cartItemsCount}</span>
              ) : (
                <span>0</span>
              )}
            </span>
          </div>
        </Link>
      </nav>
      <div className=" w-full px-2 py-2 flex  gap-2">
        <div className=" w-[50%]">
          <img
            src={product.productImg}
            className=" w-full object-cover"
            alt="img"
          />
        </div>
        <div>
          <p>{product.productName}</p>
          <p> Category: {product.productCategory}</p>
          <p> In Stock{product.productQuantity}</p>
          <p> Description: {product.productDescription}</p>
        </div>
        <div className=" border-gray-200 border-[1px] rounded-md shadow-md w-[30%] px-4 py-5 h-fit">
          <p className=" w-full flex items-center justify-between">
            <span>Price:</span> GHS{product.productPrice}
          </p>
          <p className=" w-full flex items-center justify-between">
            {" "}
            <span>Status:</span>
            {product.productQuantity > 1 ? (
              <span>In Stock</span>
            ) : (
              <span>Out of Stock</span>
            )}
          </p>
          <button
            className=" w-full mt-2 bg-[#FFF455] rounded-md px-1 py-2"
            onClick={addToCartHandler}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
