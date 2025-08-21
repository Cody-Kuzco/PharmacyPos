
import React from "react";
import { fetchProductsById } from "@/app/api/fetchProduct/route";
import EditProductForm from "@/components/EditProductForm";

const EditProductPage = async ({ params: { id } }) => {
 
  const product = await fetchProductsById(id);
  const {
    productCategory,
    productDescription,
    productImg,
    productName,
    productPrice,
    productQuantity,
  } = product;

  return (
    <div>
      <EditProductForm
        id={id}
        productCategory={productCategory}
        productDescription={productDescription}
        productImg={productImg}
        productName={productName}
        productPrice={productPrice}
        productQuantity={productQuantity}
      />
    </div>
  );
};

export default EditProductPage;
