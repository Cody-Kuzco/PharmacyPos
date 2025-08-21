"use client";
import { Store } from "@/redux/store";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

const Checkout = () => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { checkOutInfo } = cart;

  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("fullName", checkOutInfo.fullName);
    setValue("phone", checkOutInfo.phone);
    setValue("address", checkOutInfo.address);
    setValue("email", checkOutInfo.email);
  }, [setValue, checkOutInfo]);
  const submitHandler = ({ fullName, phone, address, email }) => {
    dispatch({
      type: "SAVE_CHECKOUT",
      payload: { fullName, phone, address, email },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        checkOutInfo: {
          fullName,
          phone,
          address,
          email,
        },
      })
    );
    router.push("/clientsProductsPage/payment");
  };
  return (
    <div className=" bg-gray-200 w-full h-screen px-2 py-3 my-3">
      <div className=" w-[50%] rounded-sm shadow-md bg-white px-3 py-3">
        <form onSubmit={handleSubmit(submitHandler)}>
          <h1 className=" text-center text-gray-500 mb-4 text-2xl">
            Checkout form
          </h1>

          <div className=" mb-4">
            <label className=" text-gray-400" htmlFor="username">
              Patient Full Name
            </label>
            <input
              type="text"
              id="username"
              autoFocus
              className=" w-full border-gray-200 px-2  py-2 rounded-md outline-none border-[1px]"
              {...register("fullName", {
                required: "Please enter patient fullName!",
              })}
            />
            {errors.fullName && (
              <div className=" text-red-600">{errors.fullName.message}</div>
            )}
          </div>
          <div className=" mb-4">
            <label className=" text-gray-400" htmlFor="email">
              Patient email
            </label>
            <input
              type="email"
              id="email"
              autoFocus
              className=" w-full border-gray-200 px-2  py-2 rounded-md outline-none border-[1px]"
              {...register("email", {
                required: "Please enter patient email!",
              })}
            />
            {errors.email && (
              <div className=" text-red-600">{errors.email.message}</div>
            )}
          </div>
          <div className=" mb-4">
            <label className=" text-gray-400" htmlFor="phone">
              Phone
            </label>
            <input
              type="number"
              id="phone"
              autoFocus
              className=" w-full border-gray-200 px-2  py-2 rounded-md outline-none border-[1px]"
              {...register("phone", {
                required: "Please enter patient  phone!",
              })}
            />
            {errors.phone && (
              <div className=" text-red-600">{errors.phone.message}</div>
            )}
          </div>
          <div className=" mb-4">
            <label className=" text-gray-400" htmlFor="address">
              Patient address
            </label>
            <input
              type="text"
              id="address"
              autoFocus
              className=" w-full border-gray-200 px-2  py-2 rounded-md outline-none border-[1px]"
              {...register("address", {
                required: "Please enter patient address!",
              })}
            />
            {errors.address && (
              <div className=" text-red-600">{errors.address.message}</div>
            )}
          </div>
          <div className=" mb-4 w-full">
            <button className=" w-full rounded-md px-2 py-2 bg-[#FFF455]">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
