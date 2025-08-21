"use client";
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "./ProductProvider";
import { useParams, useSearchParams } from "next/navigation";
import { IoIosArrowRoundForward } from "react-icons/io";

const ProductDetail = ({product}) => {
  // console.log(typeof(product.productCategory))
  return (
    <div className=" w-full">
      <p className=" text-gray-500 text-2xl">{product.productName}</p>
      <div className=" w-[50%] shadow-md border-gray-200 border-[1px] rounded-md mt-2 px-3 py-3">
        <div className=" bg-white px-2 py-2 border-gray-300 rounded-md border-[1px]  h-[250px]">
          <img
            className=" w-full h-full rounded-md  object-cover "
            src={ product.productImg}
            alt={product.productName}
          />
          {/* {console.log(product?.productImg)} */}
        </div>
        <p className=" border-b-gray-400 mb-2 text-xl mt-2 pb-1 border-b-[2px]">
          Product Availability:{" "}
          <span className=" text-green-700">In stock</span>
        </p>

        <p className=" text-gray-500">
          {" "}
          <span className=" bg-orange-600 px-2 rounded-md text-lg tracking-wide py-1 text-white">
            Name :
          </span>{" "}
          {product.productName}
        </p>

        <p className=" flex mt-2 text-gray-500 items-center">
          {" "}
          <IoIosArrowRoundForward className=" text-2xl" />{" "}
          <span className=" font-semibold mr-2">Category : </span>{" "}
          {product.productCategory}
        </p>
        <p className=" flex mt-2 text-gray-500 items-center">
          {" "}
          <IoIosArrowRoundForward className=" text-2xl" />{" "}
          <span className=" font-semibold mr-2">Price :</span>{" "}
          ${product.productPrice}
        </p>

        <p className=" flex mt-2 text-gray-500 items-center">
          {" "}
          <IoIosArrowRoundForward className=" text-2xl" />{" "}
          <span className=" font-semibold mr-2">Quantity in stock :</span>{" "}
          {product.productQuantity}
        </p>
        <p className=" flex mt-2 text-gray-500 items-center"> <IoIosArrowRoundForward className=" text-2xl"/> <span className=" font-semibold mr-2">Total value in stock :</span> ${ parseInt(product.productQuantity * product.productPrice) }</p>

        <p className=" flex mt-2 text-gray-500 items-center"> <IoIosArrowRoundForward className=" text-2xl"/> <span className=" font-semibold mr-2">Description :</span> {product.productDescription}</p>

      </div>
    </div>
  );
};

export default ProductDetail;
