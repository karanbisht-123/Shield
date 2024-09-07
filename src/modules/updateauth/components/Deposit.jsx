// // components/Deposit.jsx
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FaCreditCard, FaBuilding, FaInfoCircle } from 'react-icons/fa';
// import { useOrder } from '../../custmhook/OrderContext';

// const Deposit = () => {

//   const { order } = useOrder(); 

//   if (!order) {
//     return <p>No active orders.</p>;
//   }

//   const [paymentMethod, setPaymentMethod] = useState('Credit Card');
//   const [amount, setAmount] = useState('');
//   const [nameOnCard, setNameOnCard] = useState('');
//   const [cardNumber, setCardNumber] = useState('');
//   const [expirationDate, setExpirationDate] = useState('');
//   const [cvv, setCvv] = useState('');
//   const [selectedBank, setSelectedBank] = useState('Bank A');
//   const [accountNumber, setAccountNumber] = useState('');
//   const [routingNumber, setRoutingNumber] = useState('');
//   const [bankName, setBankName] = useState('');
//   const [errors, setErrors] = useState({});

//   const handlePaymentMethodChange = (e) => {
//     setPaymentMethod(e.target.value);
//   };

//   const handleBankChange = (e) => {
//     setSelectedBank(e.target.value);
//   };

//   const handleSubmit = () => {
//     const newErrors = {};

//     if (!amount) newErrors.amount = 'Amount is required';
//     if (paymentMethod === 'Credit Card') {
//       if (!nameOnCard) newErrors.nameOnCard = 'Name on card is required';
//       if (!cardNumber) newErrors.cardNumber = 'Card number is required';
//       if (!expirationDate) newErrors.expirationDate = 'Expiration date is required';
//       if (!cvv) newErrors.cvv = 'CVV is required';
//     } else if (paymentMethod === 'Bank Transfer') {
//       if (!bankName) newErrors.bankName = 'Bank name is required';
//       if (!accountNumber) newErrors.accountNumber = 'Account number is required';
//       if (!routingNumber) newErrors.routingNumber = 'Routing number is required';
//     }

//     if (Object.keys(newErrors).length === 0) {
//       // Add form submission logic here
//       console.log('Form submitted with:', {
//         amount,
//         paymentMethod,
//         nameOnCard,
//         cardNumber,
//         expirationDate,
//         cvv,
//         selectedBank,
//         bankName,
//         accountNumber,
//         routingNumber,
//       });
//     } else {
//       setErrors(newErrors);
//     }
//   };

//   return (
//     <motion.div
//       className="lg:px-6 p-2 bg-white rounded-lg max-w-lg mx-auto  lg:py-10 pb-20 md:pb-10"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//        <div>
//       <h2>Current Order Status</h2>
//       <p>{`You are ${order.type}ing ${order.receiveAmount} ${order.receiveCurrency.toUpperCase()} for ${order.spendAmount} ${order.spendCurrency.toUpperCase()}`}</p>
//     </div>
//       <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
//         Deposit Funds
//       </h2>

//       <label className="block mb-2 text-gray-700">Deposit Amount*</label>
//       <input
//         type="number"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         className={`w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.amount ? 'border-red-500' : ''}`}
//         placeholder="Enter amount"
//       />
//       {errors.amount && <p className="text-red-500 mb-4">{errors.amount}</p>}

//       <label className="block mb-2 text-gray-700">Choose Payment Method</label>
//       <select
//         value={paymentMethod}
//         onChange={handlePaymentMethodChange}
//         className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         <option value="Credit Card">Credit Card</option>
//         <option value="Bank Transfer">Bank Transfer</option>
//         {/* Add other payment methods */}
//       </select>

//       {paymentMethod === 'Credit Card' && (
//         <>
//           <label className="block mb-2 text-gray-700">Name on Card</label>
//           <input
//             type="text"
//             value={nameOnCard}
//             onChange={(e) => setNameOnCard(e.target.value)}
//             className={`w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.nameOnCard ? 'border-red-500' : ''}`}
//             placeholder="Enter name on card"
//           />
//           {errors.nameOnCard && <p className="text-red-500 mb-4">{errors.nameOnCard}</p>}

//           <label className="block mb-2 text-gray-700">Card Number</label>
//           <input
//             type="text"
//             value={cardNumber}
//             onChange={(e) => setCardNumber(e.target.value)}
//             className={`w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cardNumber ? 'border-red-500' : ''}`}
//             placeholder="Enter card number"
//           />
//           {errors.cardNumber && <p className="text-red-500 mb-4">{errors.cardNumber}</p>}

//           <div className="flex gap-4 mb-4">
//             <div className="flex-1">
//               <label className="block mb-2 text-gray-700">Expiration Date</label>
//               <input
//                 type="text"
//                 value={expirationDate}
//                 onChange={(e) => setExpirationDate(e.target.value)}
//                 className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.expirationDate ? 'border-red-500' : ''}`}
//                 placeholder="MM/YY"
//               />
//               {errors.expirationDate && <p className="text-red-500 mb-4">{errors.expirationDate}</p>}
//             </div>

//             <div className="flex-1">
//               <label className="block mb-2 text-gray-700">CVV</label>
//               <input
//                 type="text"
//                 value={cvv}
//                 onChange={(e) => setCvv(e.target.value)}
//                 className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cvv ? 'border-red-500' : ''}`}
//                 placeholder="CVV"
//               />
//               {errors.cvv && <p className="text-red-500 mb-4">{errors.cvv}</p>}
//             </div>
//           </div>
//         </>
//       )}

//       {paymentMethod === 'Bank Transfer' && (
//         <>
//           <label className="block mb-2 text-gray-700">Select Bank*</label>
//           <select
//             value={selectedBank}
//             onChange={handleBankChange}
//             className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="Bank A">Bank A</option>
//             <option value="Bank B">Bank B</option>
//             {/* Add other banks */}
//           </select>

//           <label className="block mb-2 text-gray-700">Bank Name*</label>
//           <input
//             type="text"
//             value={bankName}
//             onChange={(e) => setBankName(e.target.value)}
//             className={`w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.bankName ? 'border-red-500' : ''}`}
//             placeholder="Enter bank name"
//           />
//           {errors.bankName && <p className="text-red-500 mb-4">{errors.bankName}</p>}

//           <label className="block mb-2 text-gray-700">Account Number*</label>
//           <input
//             type="text"
//             value={accountNumber}
//             onChange={(e) => setAccountNumber(e.target.value)}
//             className={`w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.accountNumber ? 'border-red-500' : ''}`}
//             placeholder="Enter account number"
//           />
//           {errors.accountNumber && <p className="text-red-500 mb-4">{errors.accountNumber}</p>}

//           <label className="block mb-2 text-gray-700">Routing Number*</label>
//           <input
//             type="text"
//             value={routingNumber}
//             onChange={(e) => setRoutingNumber(e.target.value)}
//             className={`w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.routingNumber ? 'border-red-500' : ''}`}
//             placeholder="Enter routing number"
//           />
//           {errors.routingNumber && <p className="text-red-500 mb-4">{errors.routingNumber}</p>}
//         </>
//       )}

//       <button
//         onClick={handleSubmit}
//         className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
//       >
//         Submit
//       </button>
//     </motion.div>
//   );
// };

// export default Deposit;


// components/Deposit.jsx

import React, { useState, useEffect } from 'react';
import { useOrder } from '../../custmhook/OrderContext';
import { FaCheckCircle, FaTimes, FaCopy ,FaSpinner} from 'react-icons/fa';

const Deposit = () => {
  const { order } = useOrder();
  const [errors, setErrors] = useState({});
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    if (order) {
      setPaymentDetails(order.paymentDetails);
    }
  }, [order]);

  if (!order) {
    return (
      <div className="max-w-lg mx-auto my-10 bg-white shadow-lg rounded-lg p-6">
        <p className="text-center text-gray-500">No active orders.</p>
      </div>
    );
  }

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

  return (
    <div className="max-w-5xl lg:min-w-[500px] mx-auto my-10 ">
      <div className="bg-white rounded-lg overflow-hidden  ">
        <div className="xl:p-6 p-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Deposit Funds</h2>
          <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <h3 className="text-lg font-bold text-blue-700 mb-2">Current Order Status</h3>
            <p className="text-blue-600">{`You are ${order.type}ing ${order.receiveAmount} ${order.receiveCurrency.toUpperCase()} for ${order.spendAmount} ${order.spendCurrency.toUpperCase()}`}</p>
          </div>

          <div className="space-y-6">
            {order.type === 'buy' && paymentDetails && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Bank Transfer Details</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <p className="text-gray-600 font-medium">Bank Name:</p>
                  <p className="text-gray-800">{paymentDetails.bankName}</p>
                  <p className="text-gray-600 font-medium">Account Holder:</p>
                  <p className="text-gray-800">{paymentDetails.accountHolderName}</p>
                  <p className="text-gray-600 font-medium">Bank Account:</p>
                  <p className="text-gray-800">{paymentDetails.bankAccount}</p>
                  <p className="text-gray-600 font-medium">IFSC Code:</p>
                  <p className="text-gray-800">{paymentDetails.bankIFSC}</p>
                  <p className="text-gray-600 font-medium">Branch Name:</p>
                  <p className="text-gray-800">{paymentDetails.branchName}</p>
                </div>
              </div>
            )}
            {order.type === 'sell' && paymentDetails && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Crypto Wallet Details</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <p className="text-gray-600 font-medium">Wallet Address:</p>
                  <p className="text-gray-800 break-all">{paymentDetails.cryptoWallet}</p>
                  <p className="text-gray-600 font-medium">Wallet Provider:</p>
                  <p className="text-gray-800">{paymentDetails.walletProvider}</p>
                  <p className="text-gray-600 font-medium">Wallet Name:</p>
                  <p className="text-gray-800">{paymentDetails.walletName}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full ${isLoading ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'} text-white py-3 px-4 rounded-lg font-semibold transition duration-300 flex items-center justify-center`}
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Processing...
              </>
            ) : (
              'Confirm Deposit'
            )}
          </button>
        </div>
      </div>

      {isSuccessModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 transition-opacity duration-300">
    <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl transform transition-all duration-300 scale-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-green-100 rounded-full p-2 mr-3">
            <FaCheckCircle className="text-green-500 text-2xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">
            Payment Successful
          </h3>
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
          <span className="text-gray-800 font-semibold">{order.spendAmount} {order.spendCurrency.toUpperCase()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Received Amount</span>
          <span className="text-gray-800 font-semibold">{order.receiveAmount} {order.receiveCurrency.toUpperCase()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Date & Time</span>
          <span className="text-gray-800">{new Date().toLocaleString()}</span>
        </div>
      </div>
      <p className="text-green-600 text-center mb-6">
        Your payment has been successfully processed. Thank you for using our service.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => setIsSuccessModalOpen(false)}
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
)}
    </div>
  );
};

export default Deposit;