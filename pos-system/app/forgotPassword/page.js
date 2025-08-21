"use client";
import React from 'react'
import Link from "next/link";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline, IoPersonCircleOutline } from "react-icons/io5";


const page = () => {

  const [email, setEmail] = useState("");
  const [newPassword,setNewPassword] = useState("")
  const [confirmNewPassword,setConfirmNewPassword] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword,setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

      if(newPassword !== confirmNewPassword){
       setLoading(false);
       setError("Passwords don't match!");
         return;
      }
     
    try {
      const res = await fetch("/api/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword ,email}),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center w-full h-screen">
      <div className="bg-white w-[350px] px-6 py-8 rounded-xl shadow-lg animate-fade-in">
        <div className="w-full flex flex-col items-center mb-4">
         <IoPersonCircleOutline className="text-5xl text-blue-500 mb-2"/>
          <h2 className="text-3xl text-blue-600 font-bold">Reset Password</h2>
          <p className="text-sm text-gray-400">
            Enter your email to receive a reset link
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-sm py-2 px-3 bg-blue-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-md outline-none transition"
              type="email"
              placeholder="Enter your email!"
              required
            />
          </div>
          <div className="mt-4 flex align-items-center justify-content-between  py-2 px-3 bg-blue-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-md outline-none transition">
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full text-sm  bg-transparent outline-none"
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              required
            />
            {
              showPassword ? <IoEyeOutline className="cursor-pointer"  onClick={() => setShowPassword(false)}/> : <IoEyeOffOutline  onClick={() => setShowPassword(true)}/>
            }
          </div>
          <div className="mt-4 flex align-items-center justify-content-between  py-2 px-3 bg-blue-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-md outline-none transition">
            <input
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full text-sm  bg-transparent outline-none"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm new password"
              required
            />
            {
             showPassword ? <IoEyeOutline className="cursor-pointer"  onClick={() => setShowPassword(false)}/> : <IoEyeOffOutline  onClick={() => setShowPassword(true)}/>
            }
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white text-sm font-medium px-4 py-2 rounded-md transition duration-300 ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4 animate-spin text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Sending...
                </div>
              ) : (
                "Reset Password"
              )}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
        </form>
        <div className="text-xs mt-5 flex justify-between items-center">
          <Link href="/login" className="text-blue-500 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>

  );
  
}
export default page
