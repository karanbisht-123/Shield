import React, { useState, useEffect } from "react";
import { useOrder } from "../../custmhook/OrderContext";
import { FaCheckCircle, FaTimes, FaCopy, FaSpinner } from "react-icons/fa";
import CryptoWalletUI from "../../components/CryptoWalletUi";
import { useNavigate } from "react-router-dom";
const Deposit = () => {
  const { order } = useOrder();
  const [errors, setErrors] = useState({});
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (order) {
      setPaymentDetails(order.paymentDetails);
    }
  }, [order]);

  const handleSubmit = () => {
    const newErrors = {};

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccessModalOpen(true);
      }, 4000);
    } else {
      setErrors(newErrors);
    }
  };

  const userEmail = 'shield@gmail.com'
  return (
    <>
      <div className="bg-white">
      <header className="hidden lg:flex items-center justify-between bg-gradient-to-r from-[#f0f4f8] to-[#e2e8f0] text-gray-900 max-w-5xl mx-auto rounded-xl mt-10 p-4 shadow-md">
      <nav className="flex items-center justify-between w-full">
        <button
          className="p-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md ransition-colors flex items-center"
          onClick={() => navigate("/account-details")}
        >
          <span className="mr-2"></span> Account Details
        </button>
        <button
          className="p-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md  transition-colors flex items-center"
          onClick={() => window.location.href = `mailto:${userEmail}?subject=Support Request from ${encodeURIComponent(userName)}`}
        >
          <span className="mr-2">📧</span> Support ({userEmail})
        </button>
      </nav>
    </header>
      </div>
      <CryptoWalletUI />
    </>
  );
  
};

export default Deposit;
