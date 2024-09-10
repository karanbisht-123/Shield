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
import { FaCheckCircle, FaTimes, FaCopy, FaSpinner } from 'react-icons/fa';
import CryptoWalletUI from '../../components/CryptoWalletUi';
import { useNavigate } from "react-router-dom";
const Deposit = () => {
  const { order } = useOrder();
  const [errors, setErrors] = useState({});
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const navigate = useNavigate()
  useEffect(() => {
    if (order) {
      setPaymentDetails(order.paymentDetails);
    }
  }, [order]);

  // if (!order) {
  //   return (
  //     <div className="max-w-lg mx-auto my-10 bg-white shadow-lg rounded-lg p-6">
  //       <p className="text-center text-gray-500">No active orders.</p>
  //     </div>
  //   );
  // }

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
    <>
    <header className=" hidden lg:flex items-center justify-between p-4 shadow-md bg-gradient-to-br from-[#001F90] to-[#2087C2] text-white max-w-6xl mx-auto rounded-lg mt-10">
      <nav>
        <div 
          className="cursor-pointer p-2 hover:bg-gray-700 transition-colors rounded-md" 
          onClick={() => navigate('/account-details')}
        >
          Account
        </div>
      </nav>
    </header>
  


        <CryptoWalletUI />

  
  </>
  
  );
};

export default Deposit;
