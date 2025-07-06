// src/pages/Confirmation.jsx
import { useLocation, useNavigate } from "react-router-dom";

export default function ConfirmationPage() {
  const location = useLocation();
  const { name, address, phoneNumber, pincode } = location.state || {};
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto mt-12 p-6 rounded-lg shadow-lg bg-green-100 text-center">
      <h2 className="text-2xl font-bold text-green-800 mb-4">🎉 Order Confirmed!</h2>
      <p className="mb-2 text-green-700">Thank you, <strong>{name || "Customer"}</strong>!</p>
      <p className="mb-2">Your order will be delivered to:</p>
      <p className="italic">{address}</p>
      <p>Pincode: {pincode}</p>
      <p>Phone: {phoneNumber}</p>
      <button onClick={()=>navigate("/")}>Go To Home</button>
    </div>
  );
}