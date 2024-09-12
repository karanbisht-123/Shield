import React, { useEffect, useState } from "react";
import { FaChevronDown, FaInfoCircle, FaExchangeAlt, FaBullseye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from "framer-motion";
import { FaLock } from "react-icons/fa6";
import {
  setSpendAmount,
  setReceiveAmount,
  setSpendCurrency,
  setReceiveCurrency,
  setActiveSection,
  toggleCurrencies,
  fetchCryptoList,
  fetchExchangeRate,
} from '../lib/slice/CryptoSlice';
import { useOrder } from "../custmhook/OrderContext";
import { addOrder } from "../lib/slice/OrderSlice";

const CryptoSwap = ({ taskType }) => {
  console.log(taskType, 'hii i am tsktype ========')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createOrder } = useOrder();

  const {
    spendAmount,
    receiveAmount,
    spendCurrency,
    receiveCurrency,
    exchangeRate,
    loading,
    error,
    cryptoList,
    activeSection,
  } = useSelector(state => state.cryptoFiat);

  const [showSpendDropdown, setShowSpendDropdown] = useState(false);
  const [showReceiveDropdown, setShowReceiveDropdown] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("failed");
  const [modalStatus, setModalStatus] = useState(false);
  const networkFeePercentage = 0.001;
  const exchangeFeePercentage = 0.005;

  const fiatCurrencies = ["usd", "eur", "gbp", "jpy"];

  useEffect(() => {
    dispatch(fetchCryptoList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchExchangeRate({ receiveCurrency, spendCurrency }));
  }, [dispatch, spendCurrency, receiveCurrency]);

  useEffect(() => {
    calculateReceiveAmount();
  }, [spendAmount, exchangeRate, activeSection]);

  const calculateReceiveAmount = () => {
    if (exchangeRate && spendAmount) {
      const amount = parseFloat(spendAmount);
      const networkFee = amount * networkFeePercentage;
      const exchangeFee = amount * exchangeFeePercentage;
      const amountAfterFees = amount - networkFee - exchangeFee;
      const received =
        activeSection === "cryptoToFiat"
          ? amountAfterFees / exchangeRate
          : amountAfterFees * exchangeRate;
      dispatch(setReceiveAmount(received.toFixed(8)));
    }
  };

  const handleAmountChange = (e, field) => {
    const amount = e.target.value;
    if (field === 'spend') {
      dispatch(setSpendAmount(amount));
      if (exchangeRate) {
        const received = activeSection === "cryptoToFiat"
          ? (amount / exchangeRate) * (1 - networkFeePercentage - exchangeFeePercentage)
          : amount * exchangeRate * (1 - networkFeePercentage - exchangeFeePercentage);
        dispatch(setReceiveAmount(received.toFixed(8)));
      }
    } else {
      dispatch(setReceiveAmount(amount));
      if (exchangeRate) {
        const spent = activeSection === "cryptoToFiat"
          ? amount * exchangeRate / (1 - networkFeePercentage - exchangeFeePercentage)
          : (amount / exchangeRate) / (1 - networkFeePercentage - exchangeFeePercentage);
        dispatch(setSpendAmount(spent.toFixed(2)));
      }
    }
  };

  const handleCurrencyChange = (currency, type) => {
    if (type === 'spend') {
      dispatch(setSpendCurrency(currency));
    } else {
      dispatch(setReceiveCurrency(currency));
    }
    setShowSpendDropdown(false);
    setShowReceiveDropdown(false);
  };

  const generateRandomBankDetails = () => {
    // ... (keep the existing implementation)
  };

  const generateRandomCryptoWallet = () => {
    // ... (keep the existing implementation)
  };


  const handleCreateOrder = () => {
    const paymentDetails =
      activeSection === "cryptoToFiat"
        ? generateRandomBankDetails()
        : generateRandomCryptoWallet();

    const orderData = {
      id: new Date().toISOString(), 
      type: activeSection,
      spendAmount,
      receiveAmount,
      spendCurrency,
      receiveCurrency,
      paymentDetails,
    };

    // Dispatch action to add order
    dispatch(addOrder(orderData));

    if (taskType === "routeToVerification") {
      navigate("/auth/login");
    } else if (taskType === "logOrder") {

      navigate("/creat-order");
      console.log("Order Created:", orderData);
    }
  };

  const networkFee = parseFloat(spendAmount) * networkFeePercentage;
  const exchangeFee = parseFloat(spendAmount) * exchangeFeePercentage;
  const total = parseFloat(spendAmount) + networkFee + exchangeFee;

  const containerClass = taskType === 'logOrder'
  ? 'w-full xl:mt-4 md:mt-0 max-w-5xl mx-auto bg-gradient-to-br from-[#001F90] to-[#2087C2] text-white p-5 xl:rounded-2xl shadow-2xl'
  : 'w-full xl:mt-4 md:mt-0 max-w-lg mx-auto bg-gradient-to-br from-[#001F90] to-[#2087C2] text-white p-5 xl:rounded-2xl shadow-2xl';

  const registerButton = taskType === 'logOrder' ? 'hidden':'px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm mt-4'
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={containerClass}
    >
      <div className="flex justify-center mb-4 bg-white bg-opacity-20 rounded-lg p-1 relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-1/2 h-full bg-white rounded-lg"
          animate={{ x: activeSection === "cryptoToFiat" ? "0%" : "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        <button
          className={`px-6 py-3 w-1/2 rounded-lg font-semibold transition-colors relative z-10 ${
            activeSection === "cryptoToFiat" ? "text-blue-600" : "text-white"
          }`}
          onClick={() => dispatch(setActiveSection("cryptoToFiat"))}
        >
          Crypto to Fiat
        </button>
        <button
          className={`px-6 py-2 w-1/2 rounded-lg font-semibold transition-colors relative z-10 ${
            activeSection === "fiatToCrypto" ? "text-blue-600" : "text-white"
          }`}
          onClick={() => dispatch(setActiveSection("fiatToCrypto"))}
        >
          Fiat to Crypto
        </button>
      </div>

      <div className="mb-4 relative">
        <label className="block text-sm font-medium mb-2">
          {activeSection === "fiatToCrypto" ? "Spend (Fiat)" : "Sell (Crypto)"}
        </label>
        <div className="relative">
          <input
            type="number"
            value={spendAmount}
            onChange={(e) => handleAmountChange(e, 'spend')}
            className="w-full bg-white bg-opacity-20 p-4 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="0.00"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button
              className="flex items-center text-white"
              onClick={() => setShowSpendDropdown(!showSpendDropdown)}
            >
              {spendCurrency.toUpperCase()}
              <FaChevronDown className="ml-1 w-4 h-4" />
            </button>
            <AnimatePresence>
              {showSpendDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-12 w-56 rounded-md shadow-lg bg-white"
                >
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {(activeSection === "fiatToCrypto" ? fiatCurrencies : cryptoList).map(
                      (currency) => (
                        <button
                          key={currency.id || currency}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                          role="menuitem"
                          onClick={() => handleCurrencyChange(currency.id || currency, 'spend')}
                        >
                          {(currency.symbol || currency).toUpperCase()}
                        </button>
                      )
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          {activeSection === "fiatToCrypto" ? "Receive (Crypto)" : "For (Fiat)"}
        </label>
        <div className="relative">
          <input
            type="number"
            value={receiveAmount}
            onChange={(e) => handleAmountChange(e, 'receive')}
            className="w-full bg-white bg-opacity-20 p-4 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="0.00"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button
              className="flex items-center text-white"
              onClick={() => setShowReceiveDropdown(!showReceiveDropdown)}
            >
              {receiveCurrency.toUpperCase()}
              <FaChevronDown className="ml-1 w-4 h-4" />
            </button>
            <AnimatePresence>
              {showReceiveDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-12 w-56 rounded-md shadow-lg bg-white"
                >
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {(activeSection === "fiatToCrypto" ? cryptoList : fiatCurrencies).map(
                      (currency) => (
                        <button
                          key={currency.id || currency}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                          role="menuitem"
                          onClick={() => handleCurrencyChange(currency.id || currency, 'receive')}
                        >
                          {(currency.symbol || currency).toUpperCase()}
                        </button>
                      )
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        {error && <p className="text-red-300 text-xs mt-1">{error}</p>}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-4 bg-white bg-opacity-20 rounded-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Transaction Details</h2>
        <div className="space-y-3">
          {[
            {
              label: `${activeSection === "fiatToCrypto" ? "Spend" : "Sell"} Amount`,
              value: `${spendAmount} ${spendCurrency.toUpperCase()}`,
            },
            {
              label: `${activeSection === "fiatToCrypto" ? "Receive" : "For"} Amount`,
              value: `${receiveAmount} ${receiveCurrency.toUpperCase()}`,
            },
            {
              label: "Network Fee",
              value: `${networkFee.toFixed(2)} ${spendCurrency.toUpperCase()}`,
            },
            {
              label: "Exchange Fee",
              value: `${exchangeFee.toFixed(2)} ${spendCurrency.toUpperCase()}`,
            },
            {
              label: "Total",
              value: `${total.toFixed(2)} ${spendCurrency.toUpperCase()}`,
            },
          ].map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <p className="text-gray-300">{item.label}:</p>
              <div className="flex items-center">
                <p className="font-medium">{item.value}</p>
                <FaInfoCircle className="ml-2 text-gray-300" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.button
  whileHover={{ scale: 1 }}
  whileTap={{ scale: 0.90 }}
  className={`w-full bg-white text-blue-600 p-4 rounded-lg font-semibold hover:bg-opacity-90 transition-colors shadow-lg ${
    (taskType === "step_2" || loading) ? "cursor-not-allowed opacity-50" : ""
  }`}
  onClick={handleCreateOrder}
  disabled={loading || taskType === "step_2"} 
>
  {loading ? (
    "LOADING..."
  ) : taskType === "step_2" ? (
    <span className="flex items-center justify-center">
      <FaLock className="mr-2" /> LOCKED
    </span>
  ) : (
    `CONTINUE`
  )}
</motion.button>

{
  taskType ===  "step_2" ? (


    <div className="mt-2 text-lg">
     <h2>Please Complete Your KYC to Unlock the Create Order Feature</h2>

    </div>
  ):( <div className={registerButton}>
    <div className="flex items-center space-x-3">
      {/* <Info className="h-5 w-5 text-yellow-500" /> */}
      <p className="text-sm text-gray-700">
        Not registered yet? Please{' '}
        <a 
          href="/auth/register" 
          className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-300"
        >
          register here
        </a>{' '}
        
      </p>
    </div>
  </div>)
}
     

       <AnimatePresence>
        {modalStatus && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white p-8 rounded-lg text-gray-800"
            >
         

<h2 className="text-2xl font-bold mb-4">
{paymentStatus ? "Payment Successful" : "Payment Failed"}
</h2>
<p className="mb-6">
{paymentStatus
  ? "Your order has been successfully created."
  : "There was an error processing your payment. Please try again."}
</p>
<motion.button
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
className="w-full bg-blue-600 text-white px-6 py-3 rounded font-semibold"
onClick={() => setModalStatus(false)}
>
Close
</motion.button>
</motion.div>
</motion.div>
)}
</AnimatePresence>
</motion.div>
);
};

export default CryptoSwap;







// import React, { useEffect, useState } from "react";
// import { FaChevronDown, FaInfoCircle, FaExchangeAlt, FaBullseye } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
// import { motion, AnimatePresence } from "framer-motion";
// import { FaLock } from "react-icons/fa6";
// import OrderList from "./OrderList";
// import {
//   setSpendAmount,
//   setReceiveAmount,
//   setSpendCurrency,
//   setReceiveCurrency,
//   setActiveSection,
//   toggleCurrencies,
//   fetchCryptoList,
//   fetchExchangeRate,
// } from '../lib/slice/CryptoSlice';
// import { useOrder } from "../custmhook/OrderContext";
// import { addOrder } from "../lib/slice/OrderSlice";

// const CryptoSwap = ({ taskType }) => {
//   console.log(taskType, 'hii i am tsktype ========')
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { createOrder } = useOrder();

//   const {
//     spendAmount,
//     receiveAmount,
//     spendCurrency,
//     receiveCurrency,
//     exchangeRate,
//     loading,
//     error,
//     cryptoList,
//     activeSection,
//   } = useSelector(state => state.cryptoFiat);

//   const [showSpendDropdown, setShowSpendDropdown] = useState(false);
//   const [showReceiveDropdown, setShowReceiveDropdown] = useState(false);
//   const [paymentStatus, setPaymentStatus] = useState("failed");
//   const [modalStatus, setModalStatus] = useState(false);
//   const [orderCration, setOrderCreation] = useState(false)
//   const networkFeePercentage = 0.001;
//   const exchangeFeePercentage = 0.005;

//   const fiatCurrencies = ["usd", "eur", "gbp", "jpy"];

//   useEffect(() => {
//     dispatch(fetchCryptoList());
//   }, [dispatch]);

//   useEffect(() => {
//     dispatch(fetchExchangeRate({ receiveCurrency, spendCurrency }));
//   }, [dispatch, spendCurrency, receiveCurrency]);

//   useEffect(() => {
//     calculateReceiveAmount();
//   }, [spendAmount, exchangeRate, activeSection]);

//   const calculateReceiveAmount = () => {
//     if (exchangeRate && spendAmount) {
//       const amount = parseFloat(spendAmount);
//       const networkFee = amount * networkFeePercentage;
//       const exchangeFee = amount * exchangeFeePercentage;
//       const amountAfterFees = amount - networkFee - exchangeFee;
//       const received =
//         activeSection === "cryptoToFiat"
//           ? amountAfterFees / exchangeRate
//           : amountAfterFees * exchangeRate;
//       dispatch(setReceiveAmount(received.toFixed(8)));
//     }
//   };

//   const handleAmountChange = (e, field) => {
//     const amount = e.target.value;
//     if (field === 'spend') {
//       dispatch(setSpendAmount(amount));
//       if (exchangeRate) {
//         const received = activeSection === "cryptoToFiat"
//           ? (amount / exchangeRate) * (1 - networkFeePercentage - exchangeFeePercentage)
//           : amount * exchangeRate * (1 - networkFeePercentage - exchangeFeePercentage);
//         dispatch(setReceiveAmount(received.toFixed(8)));
//       }
//     } else {
//       dispatch(setReceiveAmount(amount));
//       if (exchangeRate) {
//         const spent = activeSection === "cryptoToFiat"
//           ? amount * exchangeRate / (1 - networkFeePercentage - exchangeFeePercentage)
//           : (amount / exchangeRate) / (1 - networkFeePercentage - exchangeFeePercentage);
//         dispatch(setSpendAmount(spent.toFixed(2)));
//       }
//     }
//   };

//   const handleCurrencyChange = (currency, type) => {
//     if (type === 'spend') {
//       dispatch(setSpendCurrency(currency));
//     } else {
//       dispatch(setReceiveCurrency(currency));
//     }
//     setShowSpendDropdown(false);
//     setShowReceiveDropdown(false);
//   };

//   const generateRandomBankDetails = () => {
//     // ... (keep the existing implementation)
//   };

//   const generateRandomCryptoWallet = () => {
//     // ... (keep the existing implementation)
//   };


//   const handleCreateOrder = () => {
//     const paymentDetails =
//       activeSection === "cryptoToFiat"
//         ? generateRandomBankDetails()
//         : generateRandomCryptoWallet();

//     const orderData = {
//       id: new Date().toISOString(), 
//       type: activeSection,
//       spendAmount,
//       receiveAmount,
//       spendCurrency,
//       receiveCurrency,
//       paymentDetails,
//     };

//     // Dispatch action to add order
//     dispatch(addOrder(orderData));

//     if (taskType === "routeToVerification") {
//       navigate("/auth/login");
//     } else if (taskType === "logOrder") {

//       setOrderCreation(true)
//       console.log("Order Created:", orderData);
//     }
//   };

//   const networkFee = parseFloat(spendAmount) * networkFeePercentage;
//   const exchangeFee = parseFloat(spendAmount) * exchangeFeePercentage;
//   const total = parseFloat(spendAmount) + networkFee + exchangeFee;

//   const containerClass = taskType === 'logOrder'
//   ? 'w-full xl:mt-4 md:mt-0 max-w-5xl mx-auto bg-gradient-to-br from-[#001F90] to-[#2087C2] text-white p-5 xl:rounded-2xl shadow-2xl'
//   : 'w-full xl:mt-4 md:mt-0 max-w-lg mx-auto bg-gradient-to-br from-[#001F90] to-[#2087C2] text-white p-5 xl:rounded-2xl shadow-2xl';

//   const registerButton = taskType === 'logOrder' ? 'hidden':'px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm mt-4'
//   return (

//     orderCration ? (
//       <OrderList/>
//     ) : (
// <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.5 }}
//       className={containerClass}
//     >
//       <div className="flex justify-center mb-4 bg-white bg-opacity-20 rounded-lg p-1 relative overflow-hidden">
//         <motion.div
//           className="absolute top-0 left-0 w-1/2 h-full bg-white rounded-lg"
//           animate={{ x: activeSection === "cryptoToFiat" ? "0%" : "100%" }}
//           transition={{ type: "spring", stiffness: 300, damping: 30 }}
//         />
//         <button
//           className={`px-6 py-3 w-1/2 rounded-lg font-semibold transition-colors relative z-10 ${
//             activeSection === "cryptoToFiat" ? "text-blue-600" : "text-white"
//           }`}
//           onClick={() => dispatch(setActiveSection("cryptoToFiat"))}
//         >
//           Crypto to Fiat
//         </button>
//         <button
//           className={`px-6 py-2 w-1/2 rounded-lg font-semibold transition-colors relative z-10 ${
//             activeSection === "fiatToCrypto" ? "text-blue-600" : "text-white"
//           }`}
//           onClick={() => dispatch(setActiveSection("fiatToCrypto"))}
//         >
//           Fiat to Crypto
//         </button>
//       </div>

//       <div className="mb-4 relative">
//         <label className="block text-sm font-medium mb-2">
//           {activeSection === "fiatToCrypto" ? "Spend (Fiat)" : "Sell (Crypto)"}
//         </label>
//         <div className="relative">
//           <input
//             type="number"
//             value={spendAmount}
//             onChange={(e) => handleAmountChange(e, 'spend')}
//             className="w-full bg-white bg-opacity-20 p-4 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="0.00"
//           />
//           <div className="absolute inset-y-0 right-0 flex items-center pr-3">
//             <button
//               className="flex items-center text-white"
//               onClick={() => setShowSpendDropdown(!showSpendDropdown)}
//             >
//               {spendCurrency.toUpperCase()}
//               <FaChevronDown className="ml-1 w-4 h-4" />
//             </button>
//             <AnimatePresence>
//               {showSpendDropdown && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.2 }}
//                   className="absolute right-0 mt-12 w-56 rounded-md shadow-lg bg-white"
//                 >
//                   <div
//                     className="py-1"
//                     role="menu"
//                     aria-orientation="vertical"
//                     aria-labelledby="options-menu"
//                   >
//                     {(activeSection === "fiatToCrypto" ? fiatCurrencies : cryptoList).map(
//                       (currency) => (
//                         <button
//                           key={currency.id || currency}
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
//                           role="menuitem"
//                           onClick={() => handleCurrencyChange(currency.id || currency, 'spend')}
//                         >
//                           {(currency.symbol || currency).toUpperCase()}
//                         </button>
//                       )
//                     )}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-2">
//           {activeSection === "fiatToCrypto" ? "Receive (Crypto)" : "For (Fiat)"}
//         </label>
//         <div className="relative">
//           <input
//             type="number"
//             value={receiveAmount}
//             onChange={(e) => handleAmountChange(e, 'receive')}
//             className="w-full bg-white bg-opacity-20 p-4 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="0.00"
//           />
//           <div className="absolute inset-y-0 right-0 flex items-center pr-3">
//             <button
//               className="flex items-center text-white"
//               onClick={() => setShowReceiveDropdown(!showReceiveDropdown)}
//             >
//               {receiveCurrency.toUpperCase()}
//               <FaChevronDown className="ml-1 w-4 h-4" />
//             </button>
//             <AnimatePresence>
//               {showReceiveDropdown && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.2 }}
//                   className="absolute right-0 mt-12 w-56 rounded-md shadow-lg bg-white"
//                 >
//                   <div
//                     className="py-1"
//                     role="menu"
//                     aria-orientation="vertical"
//                     aria-labelledby="options-menu"
//                   >
//                     {(activeSection === "fiatToCrypto" ? cryptoList : fiatCurrencies).map(
//                       (currency) => (
//                         <button
//                           key={currency.id || currency}
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
//                           role="menuitem"
//                           onClick={() => handleCurrencyChange(currency.id || currency, 'receive')}
//                         >
//                           {(currency.symbol || currency).toUpperCase()}
//                         </button>
//                       )
//                     )}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//         {error && <p className="text-red-300 text-xs mt-1">{error}</p>}
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2, duration: 0.5 }}
//         className="mb-4 bg-white bg-opacity-20 rounded-lg p-6"
//       >
//         <h2 className="text-xl font-semibold mb-4">Transaction Details</h2>
//         <div className="space-y-3">
//           {[
//             {
//               label: `${activeSection === "fiatToCrypto" ? "Spend" : "Sell"} Amount`,
//               value: `${spendAmount} ${spendCurrency.toUpperCase()}`,
//             },
//             {
//               label: `${activeSection === "fiatToCrypto" ? "Receive" : "For"} Amount`,
//               value: `${receiveAmount} ${receiveCurrency.toUpperCase()}`,
//             },
//             {
//               label: "Network Fee",
//               value: `${networkFee.toFixed(2)} ${spendCurrency.toUpperCase()}`,
//             },
//             {
//               label: "Exchange Fee",
//               value: `${exchangeFee.toFixed(2)} ${spendCurrency.toUpperCase()}`,
//             },
//             {
//               label: "Total",
//               value: `${total.toFixed(2)} ${spendCurrency.toUpperCase()}`,
//             },
//           ].map((item, index) => (
//             <div key={index} className="flex justify-between items-center">
//               <p className="text-gray-300">{item.label}:</p>
//               <div className="flex items-center">
//                 <p className="font-medium">{item.value}</p>
//                 <FaInfoCircle className="ml-2 text-gray-300" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </motion.div>
//       <motion.button
//   whileHover={{ scale: 1 }}
//   whileTap={{ scale: 0.90 }}
//   className={`w-full bg-white text-blue-600 p-4 rounded-lg font-semibold hover:bg-opacity-90 transition-colors shadow-lg ${
//     (taskType === "step_2" || loading) ? "cursor-not-allowed opacity-50" : ""
//   }`}
//   onClick={handleCreateOrder}
//   disabled={loading || taskType === "step_2"} 
// >
//   {loading ? (
//     "LOADING..."
//   ) : taskType === "step_2" ? (
//     <span className="flex items-center justify-center">
//       <FaLock className="mr-2" /> LOCKED
//     </span>
//   ) : (
//     `CONTINUE`
//   )}
// </motion.button>

// {
//   taskType ===  "step_2" ? (


//     <div className="mt-2 text-lg">
//      <h2>Please Complete Your KYC to Unlock the Create Order Feature</h2>

//     </div>
//   ):( <div className={registerButton}>
//     <div className="flex items-center space-x-3">
//       {/* <Info className="h-5 w-5 text-yellow-500" /> */}
//       <p className="text-sm text-gray-700">
//         Not registered yet? Please{' '}
//         <a 
//           href="/auth/register" 
//           className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-300"
//         >
//           register here
//         </a>{' '}
        
//       </p>
//     </div>
//   </div>)
// }
     

//        <AnimatePresence>
//         {modalStatus && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 20 }}
//               className="bg-white p-8 rounded-lg text-gray-800"
//             >
         

// <h2 className="text-2xl font-bold mb-4">
// {paymentStatus ? "Payment Successful" : "Payment Failed"}
// </h2>
// <p className="mb-6">
// {paymentStatus
//   ? "Your order has been successfully created."
//   : "There was an error processing your payment. Please try again."}
// </p>
// <motion.button
// whileHover={{ scale: 1.05 }}
// whileTap={{ scale: 0.95 }}
// className="w-full bg-blue-600 text-white px-6 py-3 rounded font-semibold"
// onClick={() => setModalStatus(false)}
// >
// Close
// </motion.button>
// </motion.div>
// </motion.div>
// )}
// </AnimatePresence>
// </motion.div>
//     )
    
// );
// };

// export default CryptoSwap;