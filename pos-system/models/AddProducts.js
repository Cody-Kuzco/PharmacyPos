import mongoose, { Schema, models } from "mongoose";

const AddProductSchema = new Schema(
  {
    productImg: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productCategory: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },

    productQuantity: {
      type: Number,
      required: true,
    },

    productDescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const AddProduct = models.AddProduct || mongoose.model("AddProduct", AddProductSchema);
export default AddProduct;
