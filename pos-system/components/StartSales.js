"use client";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsCart3 } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { IoIosArrowRoundDown } from "react-icons/io";
import { LiaSearchSolid } from "react-icons/lia";
import { Store } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Search from "./Search";
import SearchProducts from "./SearchProducts";

const StartSalesPage = ({ products }) => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);
  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.productQuantity < quantity) {
      return toast.error("Sorry! Product is out of stock..");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    toast.success("Product added to cart");
  };
  const router = useRouter();
  return (
    <div>
      <div>
        <nav className=" flex items-center  justify-between py-3 px-3">
          <div className=" border-gray-300 border-[1px] w-[40%] py-1 rounded-md flex items-center justify-between ">
            {/* <p className=" flex items-center gap-2">
              <LiaSearchSolid className=" text-2xl" />
              <input
                type="text"
                className=" w-full outline-none border-none"
                placeholder="Search Here"
              />
            </p>
            <IoIosArrowRoundDown className=" text-2xl" /> */}
          </div>

          <div className=" relative  flex items-center gap-4">
            <Link href={`/clientsProductsPage/cart`}>
              <BsCart3 className=" text-gray-500 font-semibold cursor-pointer mr-1     text-xl" />
            </Link>
            <div className=" w-10 h-10 cursor-pointer rounded-full flex items-center justify-center bg-gray-300">
              <Link href={"/clientsProductsPage/profile"}>
                <FaUserAlt className=" text-2xl" />
              </Link>
            </div>
            <span className="  absolute right-12 top-0 bg-[#FF0000] text-white flex items-center justify-center w-4 h-4 text-xs  rounded-full">
              {cartItemsCount ? <span>{cartItemsCount}</span> : <span>0</span>}
            </span>
          </div>
        </nav>
        <div className="   bg-gray-100 w-full px-4    py-5 h-screen ">
          <div className=" rounded-md px-2 py-2 shadow-md  bg-white">
            <div className=" flex items-center justify-between">
              <div>
                {/* <input
                  type="text"
                  className=" px-1 py-2 outline-none bg-white border-gray-200 border-[1px] rounded-sm"
                  placeholder="Search Product"
                /> */}
                {/* <Search /> */}
                <SearchProducts/>
                
              </div>
              {/* <div>
                <input
                  type="text"
                  className="  px-1 py-2 outline-none bg-white border-gray-200 border-[1px] rounded-sm"
                  placeholder="Search Product by barcode"
                />
              </div> */}
            </div>
            <div className="  flex items-center  justify-center overflow-y-scroll gap-4 flex-wrap  mt-6">
              {products.map((products) => (
                <div className="" key={products._id}>
                  <div className="px-1 rounded-sm py-2 w-[200px] border-gray-300 border-[1px]">
                    <div className=" w-full flex flex-col items-center ">
                      <Link
                        href={`/clientsProductsPage/products/${products._id}`}
                      >
                        <img
                          src={products.productImg}
                          alt="image"
                          className=" w-[200px] h-[160px] rounded-md object-cover "
                        />
                      </Link>
                      <Link
                        href={`/clientsProductsPage/products/${products._id}`}
                      >
                        <p className=" text-blue-700 text-center mt-2">
                          {products.productName}
                        </p>
                      </Link>
                      <p className=" text-red-600 font-semibold">
                        {" "}
                        GHS {products.productPrice}
                      </p>

                      {products.productQuantity >= 1 ? (
                        <p className=" px-2 py-1 bg-gray-400 rounded-md  my-2 text-white">
                          {products.productQuantity} Available
                        </p>
                      ) : (
                        <p className=" px-2 py-1 bg-gray-400 rounded-md  my-2 text-white">
                          Unavailable
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => addToCartHandler(products)}
                      className=" w-full px-2 py-1 bg-gray-500 rounded-md  my-2 text-white"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <div className=" px-2 shadow-md rounded-md py-3 w-[40%] bg-white">
            <Cart product={product} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default StartSalesPage;
