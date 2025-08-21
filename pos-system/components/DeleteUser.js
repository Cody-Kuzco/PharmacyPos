"use client";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";

const DeleteBtn = ({ id }) => {
  const router = useRouter();
  const removeUser = async () => {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      const res = await fetch(`/api/user?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
        toast.success("User deleted!!");
      }
    }
  };
  return (
    <div>
      <FaRegTrashAlt
        onClick={removeUser}
        className=" text-red-500 text-xl cursor-pointer"
      />
    </div>
  );
};

export default DeleteBtn;
