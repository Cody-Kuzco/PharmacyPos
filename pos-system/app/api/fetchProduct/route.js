import AddProduct from "@/models/AddProducts";
import { connect } from "@/utils/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const fetchProducts = async (q, req, res) => {
  const regex = new RegExp(q, "i");
  try {
    await connect();

    const products = await AddProduct.find({ productName: { $regex: regex } });

    return products;
   
  } catch (error) {
    console.error("Error in fetchProducts:", error);
    throw new Error(`Unable to fetch product! Details: ${error.message}`);
  }
};

export const fetchProductsById = async (id) => {
  try {
    await connect();

    const products = await AddProduct.findOne({ _id: new ObjectId(id) });

    if (!products) {
      throw new Error("Product not found");
    }

    return {
      _id: products._id.toString(),
      productName: products.productName,
      productDescription: products.productDescription,
      productPrice: products.productPrice,
      productQuantity: products.productQuantity,
      productCategory: products.productCategory,
      productImg: products.productImg,
    };
  } catch (error) {
    console.error("Error in fetchProductsById:", error);
    throw new Error(`Unable to fetch product by ID! Details: ${error.message}`);
  }
};

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    await connect();
    await AddProduct.findByIdAndDelete(id);
    return NextResponse.json({message:"Product Deleted!"}, {status:201});
  } catch (error) {
    console.error("Error in DELETE:", error);
    return NextResponse.json(
      { error: `Failed to delete product: ${error.message}` }, 
      { status: 500 }
    );
  }
}
