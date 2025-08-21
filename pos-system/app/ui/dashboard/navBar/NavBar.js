"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const NavBar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div>
      <div className=" flex items-center  justify-between  py-4 border-gray-300 border-b-[1px]">
        <p className="  text-xl font-thin">
          Welcome,{" "}
          <span className=" text-[#01252e] text-xl font-semibold">
            {session?.user?.username}
          </span>{" "}
        </p>
        <button
          onClick={() => {
            signOut ({ redirect: false }).then(() => {
              router.push("/"); // Redirect to the dashboard page after signing out
            });
          }}
          className=" bg-[#01252e] text-white px-2 py-1 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;
