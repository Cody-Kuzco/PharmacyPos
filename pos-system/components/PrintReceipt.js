"use client";
import { Store } from "@/redux/store";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";

const PrintReceipt = React.forwardRef((props, ref) => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  // const { cartItems } = cart;
  const { checkOutInfo } = cart;
  // const { paymentMethod } = cart; // Removed this line to fix naming conflict
  // const { cartInfo } = state;
  // console.log(cartInfo);
  const { data: session } = useSession();
  const [dateTime, setDateTime] = useState({ date: "", time: "" });
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems) {
      setCartItems(storedCartItems);
      // Get payment method from the first item (they should all have the same payment method)
      if (storedCartItems.length > 0 && storedCartItems[0].paymentMethod) {
        setPaymentMethod(storedCartItems[0].paymentMethod);
      }
    }
  }, []);
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      const hoursStr = hours.toString().padStart(2, "0");
      const timeString = `${hoursStr}:${minutes} ${ampm}`;
      setDateTime({
        date: now.toLocaleDateString(undefined, dateOptions),
        time: timeString,
      });
    };

    updateDateTime();
    // Update time every second
    const timer = setInterval(updateDateTime, 1000);
    // Cleanup timer on component unmount
    return () => clearInterval(timer);
  }, []);

  const formattedDate = dateTime.date;
  const formattedTime = dateTime.time;
  // console.log(paymentMethod);
  return (
    <div className=" px-2 py-3 w-full" ref={ref}>
      <h1 className=" text-gray-500 font-semibold text-center text-3xl mt-2">
        Benab Pharmacy
      </h1>
      
      <div className=" w-full font-semibold text-xl  flex items-center justify-between">
        <p>Store</p>
        <p>#04876</p>
      </div>
      <div className=" w-full font-semibold text-xl  flex items-center justify-between">
        <p>Address</p>
        <p>Kumasi Ahodwo,48532 </p>
      </div>

      <div className=" w-full font-semibold text-xl  flex items-center justify-between">
        <p>Register</p>
        <p>#6</p>
      </div>
      <div className=" w-full font-semibold text-xl flex items-center justify-between">
        <p>CashierID</p>
        <p>{session?.user?._id || 'N/A'} </p>
      </div>
      <div className=" w-full font-semibold text-xl flex items-center justify-between">
        <p>Cashier</p>
        <p>{session?.user?.username || 'N/A'} </p>
      </div>
      <div className=" w-full font-semibold text-xl flex items-center justify-between">
        <p>Date</p>
        <p>
          {formattedDate},{formattedTime}
        </p>
      </div>

      <div className=" w-full font-semibold text-xl flex items-center justify-between">
        <p>Patient Name</p>
        <p>{checkOutInfo?.fullName || 'N/A'}</p>
      </div>

      <div className=" w-full font-semibold text-xl flex items-center justify-between">
        <p>Patient Email</p>
        <p>{checkOutInfo?.email || 'N/A'}</p>
      </div>
      <div className=" w-full font-semibold text-xl flex items-center justify-between">
        <p>Patient Address</p>
        <p>{checkOutInfo?.address || 'N/A'}</p>
      </div>
      <div className=" w-full font-semibold text-xl flex items-center justify-between">
        <p>Patient Phone</p>
        <p>{checkOutInfo?.phone || 'N/A'}</p>
      </div>
      <div>
        <table className="mt-3 w-full">
          <thead className=" border-b-black border-b-[2px] border-t-black border-t-[2px]">
            <tr>
              <th className=" p-3  font-semibold">Drug Name</th>
              <th className=" p-3  font-semibold">Quantity</th>
              <th className=" p-3  font-semibold">Unit Price</th>
              <th className=" p-3  font-semibold">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((product) => (
                <tr
                  className=" border-b-black border-b-[2px] text-center"
                  key={product._id}
                >
                  <td className=" p-3  font-semibold">{product.productName}</td>
                  <td className=" p-3  font-semibold">{product.quantity}</td>
                  <td className=" p-3  font-semibold">
                    GHS {product.productPrice}
                  </td>
                  <td className=" p-3  font-semibold">
                    GHS {product.quantity * product.productPrice}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-500">
                  No items to display
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className=" w-full font-semibold mt-3 text-xl flex items-center justify-between">
          <p>Drugs</p>
          <p>{cartItems ? cartItems.length : 0}</p>
        </div>

        <div className=" w-full font-semibold mt-3 text-xl flex items-center justify-between">
          <p>Subtotal</p>
          <p>
            ({cartItems ? cartItems.reduce((a, c) => a + (c.quantity || 0), 0) : 0}) : GHS
            {cartItems ? cartItems.reduce((a, c) => a + ((c.quantity || 0) * (c.productPrice || 0)), 0) : 0}
          </p>
        </div>
      </div>
      <div className=" w-full font-semibold mt-3 text-xl flex items-center justify-between">
        <p>Payment Method</p>
        <p>{paymentMethod || 'Card Payment'}</p>
      </div>
      
      {/* Only show card details if it's a card payment */}
      {paymentMethod === 'Card Payment' && (
        <div className=" w-full font-semibold mt-3 text-xl flex items-center justify-between">
          <p>Card Type</p>
          <p>Visa/Mastercard</p>
        </div>
      )}
      
      {/* Show mobile money details if it's mobile payment */}
      {paymentMethod === 'Mobile Money' && (
        <div className=" w-full font-semibold mt-3 text-xl flex items-center justify-between">
          <p>Mobile Money</p>
          <p>MTN/AirtelTigo/Vodafone</p>
        </div>
      )}

      <p className="  text-center text-2xl mt-3">
        Thank you for choosing Benab Pharmacy
      </p>
      <div className=" w-full flex items-center justify-center">
        <img
          className=" w-[400px] h-[100px] object-cover"
          src="/barcode.png"
          alt="barcode"
        />
      </div>
    </div>
  );
});
export default PrintReceipt;
