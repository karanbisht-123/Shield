import React from "react";

const ProgressBar = ({ currentStep, totalSteps }) => {
  const steps = ["Verify", "Personal", "KYC", "Identity", "Address"];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((stepName, index) => (
          <React.Fragment key={index}>
            <div
              className={`flex flex-col items-center ${
                index + 1 <= currentStep ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`rounded-full transition duration-500 ease-in-out h-8 w-8 flex items-center justify-center ${
                  index + 1 <= currentStep
                    ? "bg-blue-600 text-white"
                    : "border-2 border-gray-300"
                }`}
              >
                {index + 1 < currentStep ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </div>
              <div
                className={`mt-2 text-xs ${
                  index + 1 <= currentStep ? "font-medium" : "font-normal"
                }`}
              >
                {stepName}
              </div>
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`flex-auto border-t-2 transition mb-4 ml-1 duration-500 ease-in-out min-w-4 ${
                  index + 1 < currentStep ? "border-blue-600" : "border-gray-300"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;



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



// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { FaEnvelope, FaGlobe, FaCheckCircle } from 'react-icons/fa';

// const VerifyuserDetails = ({ nextStep }) => {
//   const [email, setEmail] = useState('');
//   const [country, setCountry] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [company, setCompany] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [countryError, setCountryError] = useState('');
//   const [firstNameError, setFirstNameError] = useState('');
//   const [lastNameError, setLastNameError] = useState('');
//   const [companyError, setCompanyError] = useState('');
//   const [promotion, setPromotion] = useState(true);
//   const [terms, setTerms] = useState(true);
//   const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
//   const [countries, setCountries] = useState([]);
//   const [isLoadingCountry, setIsLoadingCountry] = useState(true);

//   useEffect(() => {
//     // Fetch country based on IP address
//     const fetchCountryBasedOnIP = async () => {
//       setIsLoadingCountry(true);
//       try {
//         const response = await fetch('https://ipapi.co/json/');
//         const data = await response.json();
//         setCountry(data.country_name || '');
//       } catch (error) {
//         console.error('Failed to fetch country information', error);
//       } finally {
//         setIsLoadingCountry(false);
//       }
//     };

//     // Fetch list of countries
//     const fetchCountries = async () => {
//       try {
//         const response = await fetch('https://restcountries.com/v3.1/all');
//         const data = await response.json();
//         const sortedCountries = data
//           .map(country => country.name.common)
//           .sort((a, b) => a.localeCompare(b));
//         setCountries(sortedCountries);
//       } catch (error) {
//         console.error('Failed to fetch countries list', error);
//       }
//     };

//     fetchCountryBasedOnIP();
//     fetchCountries();
//   }, []);

//   const validateForm = () => {
//     let isValid = true;

//     if (!email) {
//       setEmailError('Email address is required.');
//       isValid = false;
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       setEmailError('Please enter a valid email address.');
//       isValid = false;
//     } else {
//       setEmailError('');
//     }

//     if (!firstName) {
//       setFirstNameError('First name is required.');
//       isValid = false;
//     } else {
//       setFirstNameError('');
//     }

//     if (!lastName) {
//       setLastNameError('Last name is required.');
//       isValid = false;
//     } else {
//       setLastNameError('');
//     }

//     if (!country) {
//       setCountryError('Country of residence is required.');
//       isValid = false;
//     } else {
//       setCountryError('');
//     }

//     // Company field is optional
//     setCompanyError('');

//     return isValid;
//   };

//   const handleSubmit = () => {
//     if (validateForm()) {
//       nextStep();
//     }
//   };

//   return (
//     <motion.div
//       className="xl:px-6 p-2 mx-auto rounded-lg lg:py-10  pb-20 md:pb-10"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
//         {/* <FaCheckCircle className="text-green-600" /> */}
//         Let's verify your details
//       </h2>

//       <div className="mb-4">
//         <label className="text-gray-700 mb-2 flex items-center gap-2">
//           <FaEnvelope className="text-gray-500" />
//           Email Address*
//         </label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
//             emailError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
//           }`}
//           placeholder="Enter your email"
//         />
//         {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
//       </div>

//       <div className="mb-4">
//         <label className="text-gray-700 mb-2 flex items-center gap-2">
//           <FaGlobe className="text-gray-500" />
//           Country of Residence*
//         </label>
//         {isLoadingCountry ? (
//           <div className="w-full p-3 border rounded-lg bg-gray-100">Loading...</div>
//         ) : (
//           <select
//             value={country}
//             onChange={(e) => setCountry(e.target.value)}
//             className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
//               countryError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
//             }`}
//           >
//             <option value="">Choose country</option>
//             {countries.map((c) => (
//               <option key={c} value={c}>
//                 {c}
//               </option>
//             ))}
//           </select>
//         )}
//         {countryError && <p className="text-red-500 text-sm mt-1">{countryError}</p>}
//       </div>

//       <div className="mb-4">
//         <label className="text-gray-700 mb-2">First Name*</label>
//         <input
//           type="text"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//           className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
//             firstNameError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
//           }`}
//           placeholder="Enter your first name"
//         />
//         {firstNameError && <p className="text-red-500 text-sm mt-1">{firstNameError}</p>}
//       </div>

//       <div className="mb-4">
//         <label className="text-gray-700 mb-2">Last Name*</label>
//         <input
//           type="text"
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//           className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
//             lastNameError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
//           }`}
//           placeholder="Enter your last name"
//         />
//         {lastNameError && <p className="text-red-500 text-sm mt-1">{lastNameError}</p>}
//       </div>

//       <div className="mb-4">
//         <label className="text-gray-700 mb-2">Company (Optional)</label>
//         <input
//           type="text"
//           value={company}
//           onChange={(e) => setCompany(e.target.value)}
//           className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
//             companyError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
//           }`}
//           placeholder="Enter your company (if applicable)"
//         />
//         {companyError && <p className="text-red-500 text-sm mt-1">{companyError}</p>}
//       </div>

//       <div className="mb-4">
//         <label className="inline-flex items-center">
//           <input
//             type="checkbox"
//             checked={promotion}
//             onChange={() => setPromotion(!promotion)}
//             className="form-checkbox h-5 w-5 text-blue-600"
//           />
//           <span className="ml-2 text-gray-700">Yes, I would like to be kept up to date with promotions.</span>
//         </label>
//       </div>

//       <div className="mb-6">
//         <label className="inline-flex items-center">
//           <input
//             type="checkbox"
//             checked={terms}
//             onChange={() => setTerms(!terms)}
//             className="form-checkbox h-5 w-5 text-blue-600"
//           />
//           <span className="ml-2 text-gray-700">I have read and agree to the Terms and Conditions.</span>
//         </label>
//       </div>

//       <motion.button
//         onClick={handleSubmit}
//         className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 ${
//           email && country && firstName && lastName && promotion && terms ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-400 text-gray-700 cursor-not-allowed'
//         }`}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         disabled={!(email && country && firstName && lastName && promotion && terms)}
//       >
//         <FaCheckCircle />
//         Submit Verification
//       </motion.button>
//     </motion.div>
//   );
// };

// export default VerifyuserDetails;


// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { FaEnvelope, FaGlobe, FaCheckCircle } from 'react-icons/fa';

// const VerifyEMailDetails = ({ nextStep }) => {
//   const [email, setEmail] = useState('');
//   const [country, setCountry] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [countryError, setCountryError] = useState('');
//   const [promotion, setPromotion] = useState(true);
//   const [terms, setTerms] = useState(true);
//   const [countries, setCountries] = useState([]);
//   const [isLoadingCountry, setIsLoadingCountry] = useState(true);

//   useEffect(() => {
//     // Fetch country based on IP address
//     const fetchCountryBasedOnIP = async () => {
//       setIsLoadingCountry(true);
//       try {
//         const response = await fetch('https://ipapi.co/json/');
//         const data = await response.json();
//         setCountry(data.country_name || '');
//       } catch (error) {
//         console.error('Failed to fetch country information', error);
//       } finally {
//         setIsLoadingCountry(false);
//       }
//     };

//     // Fetch list of countries
//     const fetchCountries = async () => {
//       try {
//         const response = await fetch('https://restcountries.com/v3.1/all');
//         const data = await response.json();
//         const sortedCountries = data
//           .map(country => country.name.common)
//           .sort((a, b) => a.localeCompare(b));
//         setCountries(sortedCountries);
//       } catch (error) {
//         console.error('Failed to fetch countries list', error);
//       }
//     };

//     fetchCountryBasedOnIP();
//     fetchCountries();
//   }, []);

//   const validateForm = () => {
//     let isValid = true;

//     if (!email) {
//       setEmailError('Email address is required.');
//       isValid = false;
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       setEmailError('Please enter a valid email address.');
//       isValid = false;
//     } else {
//       setEmailError('');
//     }

//     if (!country) {
//       setCountryError('Country of residence is required.');
//       isValid = false;
//     } else {
//       setCountryError('');
//     }

//     return isValid;
//   };

//   const handleSubmit = () => {
//     if (validateForm()) {
//       nextStep({ email, country, promotion, terms });
//     }
//   };

//   return (
//     <motion.div
//       className="xl:px-6 p-2 mx-auto rounded-lg lg:py-10 pb-20 md:pb-10"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
//         Let's get started
//       </h2>

//       <div className="mb-4">
//         <label className="text-gray-700 mb-2 flex items-center gap-2">
//           <FaEnvelope className="text-gray-500" />
//           Email Address*
//         </label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
//             emailError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
//           }`}
//           placeholder="Enter your email"
//         />
//         {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
//       </div>

//       <div className="mb-4">
//         <label className="text-gray-700 mb-2 flex items-center gap-2">
//           <FaGlobe className="text-gray-500" />
//           Country of Residence*
//         </label>
//         {isLoadingCountry ? (
//           <div className="w-full p-3 border rounded-lg bg-gray-100">Loading...</div>
//         ) : (
//           <select
//             value={country}
//             onChange={(e) => setCountry(e.target.value)}
//             className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
//               countryError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
//             }`}
//           >
//             <option value="">Choose country</option>
//             {countries.map((c) => (
//               <option key={c} value={c}>
//                 {c}
//               </option>
//             ))}
//           </select>
//         )}
//         {countryError && <p className="text-red-500 text-sm mt-1">{countryError}</p>}
//       </div>

//       <div className="mb-4">
//         <label className="inline-flex items-center">
//           <input
//             type="checkbox"
//             checked={promotion}
//             onChange={() => setPromotion(!promotion)}
//             className="form-checkbox h-5 w-5 text-blue-600"
//           />
//           <span className="ml-2 text-gray-700">Yes, I would like to be kept up to date with promotions.</span>
//         </label>
//       </div>

//       <div className="mb-6">
//         <label className="inline-flex items-center">
//           <input
//             type="checkbox"
//             checked={terms}
//             onChange={() => setTerms(!terms)}
//             className="form-checkbox h-5 w-5 text-blue-600"
//           />
//           <span className="ml-2 text-gray-700">I have read and agree to the Terms and Conditions.</span>
//         </label>
//       </div>

//       <motion.button
//         onClick={handleSubmit}
//         className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 ${
//           email && country && promotion && terms ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-400 text-gray-700 cursor-not-allowed'
//         }`}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         disabled={!(email && country && promotion && terms)}
//       >
//         <FaCheckCircle />
//         Continue
//       </motion.button>
//     </motion.div>
//   );
// };

// export default VerifyEMailDetails;

