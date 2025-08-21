"use client";
import React, { useState } from "react";
import { PaystackButton } from "react-paystack";

const Pay = () => {
  // const publicKey = "pk_test_db4e0085cf211bad348d0f063851f27f6ec7ebb9";
 const publicKey= "pk_test_e08f7d9246802a7dee22cde845b7b6dadacbc4b5"
  //   const amount = 1000000; // Remember, set in kobo!
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const componentProps = {
    email,
    amount: amount * 100,
    metadata: {
      name,
      phone,
      paymentMethod, // Add payment method to metadata
    },
    publicKey,

    currency: "GHS",
    text: "Pay Now",
    onSuccess: () =>
      alert("Thanks for doing business with us! Come back soon!!"),
    onClose: () => alert("Wait! Don't leave :("),
  };
  return (
    <div className=" bg-gray-200  w-full h-screen flex items-center justify-center px-2 py-3 my-3">
      <div className="w-[50%] rounded-sm shadow-md bg-white px-3 py-3">
        <form>
          <h1 className=" text-center text-gray-500 mb-4 text-2xl">
            Payment form
          </h1>
          <div className=" mb-4">
            <label className=" text-gray-400">Name</label>
            <input
              className=" w-full border-gray-200 px-2  py-2 rounded-md outline-none border-[1px]"
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className=" mb-4">
            <label className=" text-gray-400">Email</label>
            <input
              className=" w-full border-gray-200 px-2  py-2 rounded-md outline-none border-[1px]"
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className=" mb-4">
            <label className=" text-gray-400">Phone</label>
            <input
              className=" w-full border-gray-200 px-2  py-2 rounded-md outline-none border-[1px]"
              type="number"
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className=" mb-4">
            <label className=" text-gray-400">Amount</label>
            <input
              className=" w-full border-gray-200 px-2  py-2 rounded-md outline-none border-[1px]"
              type="number"
              id="amount"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          
          {/* Payment Method Selection */}
          <div className=" mb-4">
            <label className=" text-gray-400">Payment Method</label>
            <div className="flex gap-4 mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700 font-medium">💳 Card Payment</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="mobile"
                  checked={paymentMethod === "mobile"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700 font-medium">📱 Mobile Money</span>
              </label>
            </div>
          </div>
        </form>
        <PaystackButton
          className=" w-full rounded-md px-2 py-2 bg-[#FFF455]"
          {...componentProps}
        />
      </div>
    </div>
  );
};

export default Pay;
