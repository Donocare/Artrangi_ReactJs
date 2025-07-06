// src/components/PaymentPage.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fireDB } from "../../firebase/FirebaseConfig";
import axios from "axios";
import { collection, addDoc } from "firebase/firestore";
import { load } from "@cashfreepayments/cashfree-js";

export default function PaymentPage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();
  const cashfreeRef = useRef(null);


  // if(paymentMethod === "COD"){
  //   navigate(()=>"/confirmation")
  // }
  // ✅ Initialize SDK once
  useEffect(() => {
    const initializeSDK = async () => {
      cashfreeRef.current = await load({ mode: "sandbox" }); // use "production" in live
    };
    initializeSDK();
  }, []);

  // ✅ Get Payment Session ID from backend
  const getSessionId = async () => {
    try {
      const res = await axios.get("http://localhost:3000/payment");
      if (res.data && res.data.payment_session_id) {
        setOrderId(res.data.order_id);
        return res.data.payment_session_id;
      } else {
        alert("❗ Cashfree session ID not received.");
        return null;
      }
    } catch (error) {
      console.error("Error getting session ID:", error);
      alert("❌ Failed to initiate payment.");
      navigate("/cart")
    }
  };

  const verifypayment= async()=>{
    try {
      let res = await axios.post("http://localhost:8000/verify",{
        order_id:orderId
      })
      if(res && res.data){
        alert("Payment Successful")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();

    if (!name || !address || !phoneNumber || !pincode || !paymentMethod) {
      alert("🚫 Please fill in all the required fields.");
      return;
    }

    if (paymentMethod === "Cashfree") {
      try {
        const sessionId = await getSessionId();
        if (!sessionId || !cashfreeRef.current) return;
  
        const checkoutOptions = {
          paymentSessionId: sessionId,
          redirectTarget: "_modal",
        };
  
        cashfreeRef.current
          .checkout(checkoutOptions)
          .then(() => {
            console.log("✅ Cashfree payment initiated");

            verifypayment(orderId);
          })
          .catch((error) => {
            console.error("❌ Checkout failed:", error);
            alert("Failed to redirect to Cashfree.");
          })
      } catch (error) {
        console.error("Cashfree Error:", error);
      }
    } else {
      // Redirect to confirmation page for COD
      navigate("/confirmation", { state: { name, address, phoneNumber, pincode } });
    }

    // if(paymentMethod === "COD"){
    //   navigate("/confirmation");
    // }
  
  };


  return (
    <div className="max-w-md mx-auto mt-12 p-6 rounded-lg shadow-lg bg-gradient-to-br from-blue-100 to-indigo-200">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">💳 Delivery & Payment</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
        className="mb-4 w-full p-3 rounded-lg border border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder-gray-500"
      />

      <textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Shipping Address"
        rows="3"
        className="mb-4 w-full p-3 rounded-lg border border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder-gray-500 resize-none"
      />

      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Mobile Number"
        className="mb-4 w-full p-3 rounded-lg border border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder-gray-500"
      />

      <input
        type="text"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        placeholder="Pincode"
        className="mb-4 w-full p-3 rounded-lg border border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder-gray-500"
      />

      <label className="block text-indigo-600 font-semibold mb-2">Choose Payment Method</label>
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="w-full p-3 rounded-lg border border-indigo-400 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
      >
        <option value="COD">Cash on Delivery</option>
        <option value="Cashfree">Cashfree</option>
      </select>

      <button
        onClick={handleClick}
        // disabled={isProcessing}
        className={"mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-bold transition duration-300 ease-in-out $"
          
        }
      >
        Proceed to Pay
        {/* {isProcessing ? "Processing..." : "Proceed to Pay"} */}
      </button>
    </div>
  );
}