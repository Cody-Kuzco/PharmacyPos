"use client";
import { Store } from "@/redux/store";
import React, { useContext, useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import PrintReceipt from "./PrintReceipt";
import Link from "next/link";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaCreditCard, FaMobileAlt } from "react-icons/fa";

const SuccessPage = () => {
  const componentRef = useRef();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const [transactionDetails, setTransactionDetails] = useState(null);
  
  useEffect(() => {
    // Get transaction details from localStorage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems && storedCartItems.length > 0) {
      setTransactionDetails({
        paymentMethod: storedCartItems[0].paymentMethod || 'Card Payment',
        totalAmount: storedCartItems.reduce((total, item) => total + (item.quantity * item.productPrice), 0),
        itemsCount: storedCartItems.length,
        saleDate: storedCartItems[0].saleDate || new Date().toISOString()
      });
    }
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  return (
    <div className=" px-3 py-3 w-full h-screen flex items-center justify-center flex-col">
      <div className=" bg-gray-200 rounded-md w-full h-full  flex flex-col items-center justify-center">
      <IoIosCheckmarkCircle className=" text-9xl text-[#059212]" />
        <h2 className=" text-5xl capitalize text-[#059212] font-semibold text-center"> Payment received successfully!!</h2>
        
        {/* Transaction Summary */}
        {transactionDetails && (
          <div className="mt-6 bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Transaction Summary</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <div className="flex items-center gap-2">
                  {transactionDetails.paymentMethod === 'Mobile Money' ? (
                    <FaMobileAlt className="text-green-600 text-xl" />
                  ) : (
                    <FaCreditCard className="text-blue-600 text-xl" />
                  )}
                  <span className="font-semibold text-gray-800">
                    {transactionDetails.paymentMethod}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-bold text-green-600 text-xl">
                  GHS {transactionDetails.totalAmount.toFixed(2)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Items Purchased:</span>
                <span className="font-semibold text-gray-800">
                  {transactionDetails.itemsCount}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Transaction Date:</span>
                <span className="font-semibold text-gray-800 text-sm">
                  {formatDate(transactionDetails.saleDate)}
                </span>
              </div>
            </div>
            
            {/* Important Notice about Paystack Emails */}
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-start gap-3">
                <div className="text-yellow-600 text-xl mt-1">⚠️</div>
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">Important Notice</h4>
                  <p className="text-yellow-700 text-sm leading-relaxed">
                    <strong>Paystack Email Limitation:</strong> The email receipt from Paystack may show "Card Payment" 
                    even for mobile money transactions. This is a known platform limitation.
                  </p>
                  <p className="text-yellow-700 text-sm mt-2 leading-relaxed">
                    <strong>For Accurate Records:</strong> Use this transaction summary or print the receipt below. 
                    Your payment method selection has been correctly recorded in our system.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Payment Method Specific Information */}
            {transactionDetails.paymentMethod === 'Mobile Money' && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start gap-3">
                  <div className="text-green-600 text-xl mt-1">📱</div>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Mobile Money Payment Confirmed</h4>
                    <p className="text-green-700 text-sm leading-relaxed">
                      Your mobile money payment has been successfully processed. The transaction has been recorded 
                      as a mobile money payment in our system, regardless of what the Paystack email shows.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {transactionDetails.paymentMethod === 'Card Payment' && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <div className="text-blue-600 text-xl mt-1">💳</div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">Card Payment Confirmed</h4>
                    <p className="text-blue-700 text-sm leading-relaxed">
                      Your card payment has been successfully processed. The transaction has been recorded 
                      as a card payment in our system.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* {cartItems.map((product) => (
          <div key={product._id} className=" invisible absolute">
            <PrintReceipt props={product} ref={componentRef} />
          </div>
        ))} */}
         <div  className=" invisible absolute">
            <PrintReceipt props={cartItems} ref={componentRef} />
          </div>
        <div className=" w-full flex items-center justify-center gap-3 mt-6">
          <button className=" px-4 rounded-md py-2 text-gray-600  border-[#059212] border-[1px] bg-transparent">
            <Link href={"/clientsProductsPage"}> Dashboard</Link>
          </button>
          <button
            onClick={handlePrint}
            className=" px-4 rounded-md py-2 text-gray-600  border-[#059212] border-[1px] bg-transparent"
          >
            Print Receipt
          </button>
        </div>
        
        {/* Additional Options */}
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm mb-2">
            Need a digital copy of your receipt?
          </p>
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={() => window.print()} 
              className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Save as PDF
            </button>
            <button 
              onClick={() => {
                const receiptData = {
                  paymentMethod: transactionDetails?.paymentMethod,
                  amount: transactionDetails?.totalAmount,
                  date: transactionDetails?.saleDate,
                  items: transactionDetails?.itemsCount
                };
                const dataStr = JSON.stringify(receiptData, null, 2);
                const dataBlob = new Blob([dataStr], {type: 'application/json'});
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `receipt-${Date.now()}.json`;
                link.click();
              }}
              className="px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Download Receipt Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
