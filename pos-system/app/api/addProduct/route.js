import AddProduct from "@/models/AddProducts";
import { connect } from "@/utils/db";

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {
      productImg,
      productName,
      productCategory,
      productPrice,
      productDescription,
      productQuantity,
     
    } = await request.json();
    await connect();
    await AddProduct.create({
      productImg,
      productName,
      productCategory,
      productPrice,
      productDescription,
      productQuantity,
      
    });
    return NextResponse.json(
      { message: "Product Added successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to add product!" },
      { status: 500 }
    );
  }
}
