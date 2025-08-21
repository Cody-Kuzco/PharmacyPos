"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const DeleteBtn = ({ id }) => {
  const router = useRouter();
  const removeProduct = async () => {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      const res = await fetch(`/api/fetchProduct?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      }
    }
  };
  return (
    <div>
      <FaRegTrashAlt
        onClick={removeProduct}
        className=" text-red-500 text-xl cursor-pointer"
      />
    </div>
  );
};

export default DeleteBtn;
