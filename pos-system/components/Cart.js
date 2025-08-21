"use client";
// import { fetchProductsById } from "@/app/api/fetchProduct/route";
import { Store } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { BsCart3 } from "react-icons/bs";
import { CiCircleRemove } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa";
import { IoIosArrowRoundDown } from "react-icons/io";
import { LiaSearchSolid } from "react-icons/lia";

import { TiShoppingCart } from "react-icons/ti";

const Cart = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const product = await fetch(`/api/singleProduct/${item._id}`);
    if (product.productQuantity < quantity) {
      return toast.error("Sorry! Product is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
    toast.success("Product updated in the cart..");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <BsCart3 className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Shopping Cart
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Review your selected items
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <BsCart3 className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Add some products to get started!</p>
            <Link 
              href="/clientsProductsPage/startSales"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <TiShoppingCart className="mr-2" />
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-3">
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                <div className="bg-gradient-to-r from-slate-50 to-white p-6 border-b border-gray-200/50">
                  <h2 className="text-xl font-bold text-gray-800">Cart Items</h2>
                  <p className="text-gray-600 text-sm mt-1">{cartItems.length} item(s) in cart</p>
                </div>
                
                {/* Mobile Card View */}
                <div className="block lg:hidden">
                  <div className="p-4 space-y-4">
                    {cartItems.map((item) => (
                      <div key={item._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-4">
                          <div className="flex items-center space-x-4">
                            <img
                              src={item.productImg}
                              className="w-16 h-16 object-cover rounded-lg"
                              alt={item.productName}
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-800 text-sm">{item.productName}</h3>
                              <p className="text-green-600 font-bold text-sm">GHS {item.productPrice}</p>
                            </div>
                            <button 
                              onClick={() => removeItemHandler(item)}
                              className="p-2 text-red-500 hover:text-red-700 transition-colors"
                            >
                              <CiCircleRemove className="w-5 h-5" />
                            </button>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <select
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              value={item.quantity}
                              onChange={(e) => updateCartHandler(item, e.target.value)}
                            >
                              {[...Array(item.productQuantity).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </select>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">Total</p>
                              <p className="font-bold text-gray-800">GHS {item.quantity * item.productPrice}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop Table View */}
                <div className="hidden lg:block">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white">
                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Product</th>
                        <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider">Price</th>
                        <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200/50">
                      {cartItems.map((item) => (
                        <tr key={item._id} className="hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-4">
                              <img
                                src={item.productImg}
                                className="w-12 h-12 object-cover rounded-lg"
                                alt={item.productName}
                              />
                              <div>
                                <h3 className="font-semibold text-gray-800">{item.productName}</h3>
                                <p className="text-sm text-gray-500">{item.productCategory}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <select
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              value={item.quantity}
                              onChange={(e) => updateCartHandler(item, e.target.value)}
                            >
                              {[...Array(item.productQuantity).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <p className="font-bold text-green-600">GHS {item.productPrice}</p>
                            <p className="text-sm text-gray-500">Total: GHS {item.quantity * item.productPrice}</p>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button 
                              onClick={() => removeItemHandler(item)}
                              className="p-2 text-red-500 hover:text-red-700 transition-colors rounded-lg hover:bg-red-50"
                            >
                              <CiCircleRemove className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6 sticky top-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items)</span>
                    <span className="font-bold text-gray-800">
                      GHS {cartItems.reduce((a, c) => a + c.quantity * c.productPrice, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-lg font-semibold text-gray-800">Total</span>
                    <span className="text-xl font-bold text-blue-600">
                      GHS {cartItems.reduce((a, c) => a + c.quantity * c.productPrice, 0)}
                    </span>
                  </div>
                  <button
                    onClick={() => router.push("/clientsProductsPage/checkout")}
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
