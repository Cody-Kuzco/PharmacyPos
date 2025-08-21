import { fetchProductsById } from "@/app/api/fetchProduct/route";
import Cart from "@/components/Cart";
import React from "react";
import dynamic from "next/dynamic";
function CartScreen() {
  return (
    <div>
      <Cart />
    </div>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
