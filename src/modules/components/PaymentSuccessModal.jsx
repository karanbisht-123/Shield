import React from 'react'
import { useOrder } from '../custmhook/OrderContext';
import { FaCheckCircle, FaTimes, FaCopy } from 'react-icons/fa';
const PaymentSuccessModal = (modalstaus) => {


    // const setpaynetmodal = () => {
    //     modalstaus((prevStatus) => !prevStatus);
    //   };
 const { order } = useOrder(); 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 transition-opacity duration-300">
    <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl transform transition-all duration-300 scale-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-green-100 rounded-full p-2 mr-3">
            <FaCheckCircle className="text-green-500 text-2xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Payment Successful</h3>
        </div>
        <button
          onClick={() => setIsSuccessModalOpen(false)}
          className="text-gray-400 hover:text-gray-600 transition duration-150"
        >
          <FaTimes className="text-xl" />
        </button>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-600 mb-2">Transaction ID</p>
        <div className="flex items-center justify-between bg-white border border-gray-200 rounded px-3 py-2">
          <span className="text-gray-800 font-medium">TX-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
          <button className="text-blue-500 hover:text-blue-600">
            <FaCopy />
          </button>
        </div>
      </div>
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Amount Paid</span>
          <span className="text-gray-800 font-semibold">{order?.spendAmount} {order?.spendCurrency.toUpperCase()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Received Amount</span>
          <span className="text-gray-800 font-semibold">{order?.receiveAmount} {order?.receiveCurrency.toUpperCase()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Date & Time</span>
          <span className="text-gray-800">{new Date().toLocaleString()}</span>
        </div>
      </div>
      <p className="text-green-600 text-center mb-6">Your payment has been successfully processed. Thank you for using our service.</p>
      <div className="flex space-x-4">
        <button
        //   onClick={() => setIsSuccessModalOpen(false)}
          className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
        >
          Done
        </button>
        <button
          onClick={() => {/* Add download receipt logic */}}
          className="flex-1 bg-white text-green-500 border border-green-500 py-3 px-4 rounded-lg font-semibold hover:bg-green-50 transition duration-300"
        >
          Download Receipt
        </button>
      </div>
    </div>
  </div>
  )
}

export default PaymentSuccessModal