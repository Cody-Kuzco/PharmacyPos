"use server";

import AddProduct from "@/models/AddProducts";
import { connect } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { Trykker } from "next/font/google";
import { redirect } from "next/navigation";

export const deleteProduct = async (FormData) => {
  const { id } = Object.fromEntries(FormData);

  try {
    await connect();
    await AddProduct.findByIdAndDelete(id);
  } catch (error) {
    // throw new Error("Failed to delete product!")
    console.log("Failed to delete product!", error);
    revalidatePath("/dashboard");
  }
};
export const updateProduct = async (formData) => {
  const {
    id,
    productCategory,
    productDescription,
    productImg,
    productName,
    productPrice,
    productQuantity,
  } = Object.fromEntries(formData);
  try {
    await connect();
    const updatedProduct = {
      productCategory,
      productDescription,
      productImg,
      productName,
      productPrice,
      productQuantity,
    };
    Object.keys(updatedProduct).forEach(
      (key) =>
        (updatedProduct[key] === "" || undefined) && delete updatedProduct[key]
    );
    await AddProduct.findByIdAndUpdate(id,updatedProduct)
  } catch (error) {
    console.log("Failed to delete product!", error);
    revalidatePath("/dashboard");
  }
  revalidatePath("/dashboard");
  // redirect("/dashboard");
};
