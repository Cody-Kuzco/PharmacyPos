// import React, { useContext } from "react";
import { BiCategory, BiSolidDollarCircle } from "react-icons/bi";
import { BsCart4, BsCartX } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
// import { ProductContext } from "./ProductProvider";
import Link from "next/link";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";
import { fetchProducts } from "../api/fetchProduct/route";
import { deleteProduct } from "@/lib/actions";
import DeleteBtn from "@/components/DeleteBtn";
const page = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const products = await fetchProducts(q);
  //  const  products = { ...product, _id: product._id.toString() };

  // Calculate the total product value
  const totalProductValue = products.reduce(
    (acc, product) => acc + product.productPrice * product.productQuantity,
    0
  );

  // Calculate the number of unique categories
  const categories = new Set(
    products.map((product) => product.productCategory)
  );
  const uniqueCategories = categories.size;

  // Calculate the number of out-of-stock products
  const outOfStockCount = products.filter(
    (product) => product.productQuantity === 0
  ).length;

  return (
    <div className="pb-6 px-4 sm:px-6">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
          Inventory Dashboard
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">Monitor your pharmacy's inventory and sales performance</p>
      </div>

      {/* Inventory stats */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 sm:mb-6 flex items-center gap-3">
          <div className="w-1 h-4 sm:h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
          Inventory Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="group relative overflow-hidden bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="absolute top-0 right-0 w-12 sm:w-16 h-12 sm:h-16 bg-white/10 rounded-full -mr-6 sm:-mr-8 -mt-6 sm:-mt-8"></div>
            <div className="absolute bottom-0 left-0 w-8 sm:w-12 h-8 sm:h-12 bg-white/5 rounded-full -ml-4 sm:-ml-6 -mb-4 sm:-mb-6"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl">
                  <BsCart4 className="text-lg sm:text-2xl text-white" />
                </div>
                <div className="text-right">
                  <p className="text-purple-100 text-xs sm:text-sm font-medium">Total</p>
                  <p className="text-2xl sm:text-3xl font-bold text-white">{products.length}</p>
                </div>
              </div>
              <p className="text-purple-100 font-medium text-sm sm:text-base">Products</p>
              <div className="mt-2 flex items-center text-purple-200 text-xs sm:text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Active inventory
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="absolute top-0 right-0 w-12 sm:w-16 h-12 sm:h-16 bg-white/10 rounded-full -mr-6 sm:-mr-8 -mt-6 sm:-mt-8"></div>
            <div className="absolute bottom-0 left-0 w-8 sm:w-12 h-8 sm:h-12 bg-white/5 rounded-full -ml-4 sm:-ml-6 -mb-4 sm:-mb-6"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl">
                  <BiSolidDollarCircle className="text-lg sm:text-2xl text-white" />
                </div>
                <div className="text-right">
                  <p className="text-green-100 text-xs sm:text-sm font-medium">Value</p>
                  <p className="text-xl sm:text-2xl font-bold text-white">GHS {totalProductValue.toLocaleString()}</p>
                </div>
              </div>
              <p className="text-green-100 font-medium text-sm sm:text-base">Store Value</p>
              <div className="mt-2 flex items-center text-green-200 text-xs sm:text-sm">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                Total worth
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-gradient-to-br from-rose-500 via-pink-600 to-red-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="absolute top-0 right-0 w-12 sm:w-16 h-12 sm:h-16 bg-white/10 rounded-full -mr-6 sm:-mr-8 -mt-6 sm:-mt-8"></div>
            <div className="absolute bottom-0 left-0 w-8 sm:w-12 h-8 sm:h-12 bg-white/5 rounded-full -ml-4 sm:-ml-6 -mb-4 sm:-mb-6"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl">
                  <BsCartX className="text-lg sm:text-2xl text-white" />
                </div>
                <div className="text-right">
                  <p className="text-pink-100 text-xs sm:text-sm font-medium">Empty</p>
                  <p className="text-2xl sm:text-3xl font-bold text-white">{outOfStockCount}</p>
                </div>
              </div>
              <p className="text-pink-100 font-medium text-sm sm:text-base">Out of Stock</p>
              <div className="mt-2 flex items-center text-pink-200 text-xs sm:text-sm">
                <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                Needs restocking
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-gradient-to-br from-blue-500 via-indigo-600 to-cyan-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="absolute top-0 right-0 w-12 sm:w-16 h-12 sm:h-16 bg-white/10 rounded-full -mr-6 sm:-mr-8 -mt-6 sm:-mt-8"></div>
            <div className="absolute bottom-0 left-0 w-8 sm:w-12 h-8 sm:h-12 bg-white/5 rounded-full -ml-4 sm:-ml-6 -mb-4 sm:-mb-6"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl">
                  <BiCategory className="text-lg sm:text-2xl text-white" />
                </div>
                <div className="text-right">
                  <p className="text-blue-100 text-xs sm:text-sm font-medium">Types</p>
                  <p className="text-2xl sm:text-3xl font-bold text-white">{uniqueCategories}</p>
                </div>
              </div>
              <p className="text-blue-100 font-medium text-sm sm:text-base">Categories</p>
              <div className="mt-2 flex items-center text-blue-200 text-xs sm:text-sm">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
                Product variety
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory items */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-50 to-white p-4 sm:p-6 border-b border-gray-200/50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center">
              <div className="w-1 h-4 sm:h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3 sm:mr-4"></div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Inventory Items</h2>
                <p className="text-gray-600 text-xs sm:text-sm mt-1">Manage your product catalog</p>
              </div>
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto">
          <Search />
        </div>
      </div>
        </div>

        {/* Mobile Card View */}
        <div className="block lg:hidden">
          <div className="p-4 space-y-4">
            {products.map((product, index) => (
              <div key={product._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-sm font-bold text-white mr-3">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-sm">{product.productName}</h3>
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-white/20 text-white mt-1">
                          {product.productCategory}
                        </span>
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <BsCart4 className="text-white text-lg" />
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Price</p>
                      <div className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                        GHS {product.productPrice.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Stock</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded text-center w-full justify-center ${
                        product.productQuantity === 0 
                          ? 'bg-red-100 text-red-800' 
                          : product.productQuantity < 10
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {product.productQuantity === 0 ? 'Out of Stock' : `${product.productQuantity} units`}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Total Value</p>
                    <div className="text-sm font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded">
                      GHS {(product.productPrice * product.productQuantity).toLocaleString()}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-center space-x-3 pt-3 border-t border-gray-100">
                    <Link href={`/dashboard/productDetail/${product._id}`}>
                      <div className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-all duration-200">
                        <MdOutlineRemoveRedEye className="text-sm" />
                      </div>
                    </Link>
                    <Link href={`/dashboard/editProduct/${product._id}`}>
                      <div className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-lg transition-all duration-200">
                        <FaEdit className="text-sm" />
                      </div>
                    </Link>
                    <DeleteBtn id={product._id.toString()} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white">
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold uppercase tracking-wider">
                  <div className="flex items-center">
                    <span className="w-5 sm:w-6 h-5 sm:h-6 bg-white/20 rounded-full flex items-center justify-center text-xs mr-2">#</span>
                    S/N
                  </div>
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold uppercase tracking-wider">Product Name</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold uppercase tracking-wider">Category</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold uppercase tracking-wider">Price</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold uppercase tracking-wider">Stock</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold uppercase tracking-wider">Total Value</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-bold uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
            <tbody className="divide-y divide-gray-200/50">
          {products.map((product, index) => (
            <tr
              key={product._id}
                  className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-200 border-l-4 border-transparent hover:border-blue-400"
                >
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-7 sm:w-8 h-7 sm:h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-sm font-semibold text-gray-700 group-hover:from-blue-100 group-hover:to-blue-200 group-hover:text-blue-700 transition-all duration-200">
                        {index + 1}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mr-3 group-hover:from-indigo-200 group-hover:to-purple-200 transition-all duration-200">
                        <BsCart4 className="text-indigo-600 text-xs sm:text-sm" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-900 transition-colors duration-200 max-w-28 sm:max-w-32 truncate">
                          {product.productName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 sm:px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200/50 shadow-sm max-w-20 sm:max-w-24 truncate">
                      {product.productCategory}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-green-600 bg-green-50 px-2 sm:px-3 py-1 rounded-lg inline-block">
                      GHS {product.productPrice.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 sm:px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
                      product.productQuantity === 0 
                        ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200' 
                        : product.productQuantity < 10
                        ? 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border border-yellow-200'
                        : 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200'
                    }`}>
                      {product.productQuantity === 0 ? 'Out of Stock' : `${product.productQuantity} units`}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900 bg-gray-50 px-2 sm:px-3 py-1 rounded-lg inline-block">
                      GHS {(product.productPrice * product.productQuantity).toLocaleString()}
                    </div>
              </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                <Link href={`/dashboard/productDetail/${product._id}`}>
                        <div className="group/btn relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-1.5 sm:p-2 rounded-lg transition-all duration-200 transform hover:scale-110 shadow-md hover:shadow-lg">
                          <MdOutlineRemoveRedEye className="text-xs sm:text-sm relative z-10" />
                          <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-200 origin-left"></div>
                        </div>
                </Link>
                <Link href={`/dashboard/editProduct/${product._id}`}>
                        <div className="group/btn relative overflow-hidden bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white p-1.5 sm:p-2 rounded-lg transition-all duration-200 transform hover:scale-110 shadow-md hover:shadow-lg">
                          <FaEdit className="text-xs sm:text-sm relative z-10" />
                          <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-200 origin-left"></div>
                        </div>
                </Link>
                      <div className="transform hover:scale-110 transition-all duration-200">
                        <DeleteBtn id={product._id.toString()} />
                      </div>
                    </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-12 sm:py-16 px-4">
            <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <BsCartX className="text-3xl sm:text-4xl text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500 max-w-md mx-auto text-sm sm:text-base px-4">
              {q ? `No products match your search for "${q}". Try adjusting your search terms.` : 'Start building your inventory by adding your first product.'}
            </p>
            <div className="mt-4 sm:mt-6">
              <Link href="/dashboard/addProduct" className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg sm:rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base">
                <BsCart4 className="mr-2" />
                Add Your First Product
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;