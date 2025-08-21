import AddProduct from "@/models/AddProducts";
import { connect } from "@/utils/db";

export const products = async () => {
  try {
    await connect();
    const product = await AddProduct.find();
    
    return product;
  } catch (error) {
    console.log("Unable to fetch product!", error);
  }
};
