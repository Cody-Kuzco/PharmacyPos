// "use client";
// import React, { createContext, useEffect, useState } from "react";

// export const ProductContext = createContext();
// const ProductProvider = ({ children }) => {
//   const [products, setProduct] = useState([]);
//   const [totalProductValue, setTotalProductValue] = useState(0);
//   const [uniqueCategories, setUniqueCategories] = useState(0);
//   const [outOfStockCount, setOutOfStockCount] = useState(0);

//   useEffect(() => {
//     const fetchProductData = async () => {
//       try {
//         const res = await fetch("http://localhost:3000/api/fetchProduct/");
//         const data = await res.json();
//         setProduct(data);

//         // Calculate the total product value
//         const totalValue = data.reduce(
//           (acc, product) =>
//             acc + product.productPrice * product.productQuantity,
//           0
//         );
//         setTotalProductValue(totalValue);

//         // Calculate the number of unique categories
//         const categories = new Set(
//           data.map((product) => product.productCategory)
//         );
//         setUniqueCategories(categories.size);

//         // Calculate the number of out-of-stock products
//         const outOfStock = data.filter(
//           (product) => product.productQuantity === 0
//         ).length;
//         setOutOfStockCount(outOfStock);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProductData();
//   }, []);
//   return (
//     <ProductContext.Provider
//       value={{ products, totalProductValue, uniqueCategories, outOfStockCount }}
//     >
//       {children}
//     </ProductContext.Provider>
//   );
// };

// export default ProductProvider;
