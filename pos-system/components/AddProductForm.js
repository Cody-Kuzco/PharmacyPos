"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [productImg, setProductImg] = useState(false);
  const router = useRouter();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (
  //     !productImg ||
  //     !productName ||
  //     !productCategory ||
  //     !productPrice ||
  //     !productDescription ||
  //     !productQuantity
  //   ) {
  //     setError("All fields are required!!");
  //   }
  //   try {
  //     const res = await fetch("/api/addProduct", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         productImg,
  //         productName,
  //         productCategory,
  //         productPrice,
  //         productDescription,
  //         productQuantity,
  //       }),
  //     });
  //     if (res.ok) {
  //       const formBox = e.target;
  //       formBox.reset();
  //       console.log("product Image:",productImg)
  //       toast.success("Product added successfully! ");
  //     } else {
  //       console.log("Failed product!!");
  //     }
  //   } catch (error) {
  //     console.log("Error during adding product!", error);
  //   }
  // };
  //create upload preset
  //   // name:products_preset
  //   //cloudName:dpwypmp2s
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  async function unSubmit(data) {
    setLoading(true);
    const raw_img = data.productImg[0];
    const formData = new FormData();
    formData.append("file", raw_img);
    formData.append("upload_preset", "products_preset");
    //upload img to cloudinary
    try {
      const uploadRsponse = await fetch(

       " https://api.cloudinary.com/v1_1/dgy0pyl7a/image/upload",
        
        {
          method: "POST",
          body: formData,
        }
      );
      if (!uploadRsponse.ok) {
        throw new Error("Image upload faild!");
      }
      const imageData = await uploadRsponse.json();
      const imageUrl = imageData.secure_url;
      // const productData = { ...data, productImg: imageUrl };
      const productData = {
        ...data,
        productImg: imageUrl,
      };
      // console.log(productData)
      const {
        productImg,
        productName,
        productCategory,
        productPrice,
        productDescription,
        productQuantity,
      } = productData;
      try {
        const res = await fetch("/api/addProduct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productImg,
            productName,
            productCategory,
            productPrice,
            productDescription,
            productQuantity,
          }),
        });
        if (res.ok) {
          reset();
        }
      } catch (error) {}

      setLoading(false);
      toast.success("Product added successfully! ");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 sm:w-10 h-8 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Add New Product
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Expand your inventory with a new product
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8">
          <form onSubmit={handleSubmit(unSubmit)} className="space-y-6">
            {/* Image Upload Section */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Product Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-400 transition-colors duration-200">
                <div className="space-y-2 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="productImg"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        {...register("productImg", { required: true })}
                        id="productImg"
                        name="productImg"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setProductImg(true);
                          }
                        }}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  {productImg && (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="ml-2 text-sm text-green-600 font-medium">Image selected</span>
                    </div>
                  )}
                </div>
              </div>
              {errors.productImg && (
                <p className="text-sm text-red-600 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Product image is required
                </p>
              )}
            </div>

            {/* Product Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                {...register("productName", { required: true })}
                id="productName"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-sm sm:text-base"
                type="text"
                placeholder="Enter product name"
              />
              {errors.productName && (
                <p className="text-sm text-red-600 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Product name is required
                </p>
              )}
            </div>

            {/* Product Category */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Category
              </label>
              <input
                {...register("productCategory", { required: true })}
                id="productCategory"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-sm sm:text-base"
                type="text"
                placeholder="Enter product category"
              />
              {errors.productCategory && (
                <p className="text-sm text-red-600 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Product category is required
                </p>
              )}
            </div>

            {/* Price and Quantity Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Product Price */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Product Price (GHS)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">₵</span>
                  <input
                    {...register("productPrice", { required: true })}
                    id="productPrice"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-sm sm:text-base"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                  />
                </div>
                {errors.productPrice && (
                  <p className="text-sm text-red-600 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Product price is required
                  </p>
                )}
              </div>

              {/* Product Quantity */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Product Quantity
                </label>
                <input
                  {...register("productQuantity", { required: true })}
                  id="productQuantity"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-sm sm:text-base"
                  type="number"
                  min="0"
                  placeholder="Enter quantity"
                />
                {errors.productQuantity && (
                  <p className="text-sm text-red-600 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Product quantity is required
                  </p>
                )}
              </div>
            </div>

            {/* Product Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Description
              </label>
              <textarea
                {...register("productDescription", { required: true })}
                id="productDescription"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-sm sm:text-base resize-none"
                placeholder="Describe your product..."
              />
              {errors.productDescription && (
                <p className="text-sm text-red-600 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Product description is required
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              {loading ? (
                <button
                  disabled
                  type="button"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-3 transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5 animate-spin text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  <span className="text-sm sm:text-base">Adding Product...</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 text-sm sm:text-base"
                >
                  Add Product
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
