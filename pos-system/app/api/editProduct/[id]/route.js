import AddProduct from "@/models/AddProducts";
import { connect } from "@/utils/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newProductImg: productImg,
    newProductName: productName,
    newProductPrice: productPrice,
    newProductDescription: productDescription,
    newProductCategory: productCategory,
    newProductQuantity: productQuantity,
  } = await request.json();

  await connect();
  await AddProduct.findByIdAndUpdate(id, {
    productCategory,
    productDescription,
    productImg,
    productName,
    productPrice,
    productQuantity,
  });
  return NextResponse.json({ message: "Product Updated!!" }, { status: 200 });
}
