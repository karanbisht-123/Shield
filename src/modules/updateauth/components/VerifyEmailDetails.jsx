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



import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaCheckCircle } from 'react-icons/fa';

const VerifyEmailDetails = ({ nextStep }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  // Check if the user is already registered by checking localStorage
  const checkIfRegistered = (enteredEmail) => {
    const registeredEmail = localStorage.getItem('registeredEmail');
    if (registeredEmail && registeredEmail === enteredEmail) {
      setIsRegistered(true);
    } else {
      setIsRegistered(false);
    }
  };

  const sendOtp = () => {
    // Simulate sending OTP (replace this with your API call)
    setTimeout(() => {
      setOtpSent(true);
      nextStep({ email });
    }, 1000);
  };

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError('Email address is required.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if (isRegistered) {
        sendOtp();
      } else {
        localStorage.setItem('registeredEmail', email);
        nextStep({ email });
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    checkIfRegistered(e.target.value);
  };

  return (
    <motion.div
      className="xl:px-6 p-2 mx-auto rounded-lg lg:py-10 pb-20 md:pb-10 xl:min-w-[450px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        Let's get started
      </h2>

      <div className="mb-4">
        <label className="text-gray-700 mb-2 flex items-center gap-2">
          <FaEnvelope className="text-gray-500" />
          Email Address*
        </label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
            emailError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
          placeholder="Enter your email"
        />
        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
        {isRegistered && !otpSent && (
          <p className="text-blue-500 text-sm mt-1">This email is already registered. An OTP will be sent for verification.</p>
        )}
      </div>

      <motion.button
        onClick={handleSubmit}
        className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 ${
          email ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-400 text-gray-700 cursor-not-allowed'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={!email}
      >
        <FaCheckCircle />
        {isRegistered && !otpSent ? 'Send OTP' : 'Continue'}
      </motion.button>

      {otpSent && (
        <p className="text-green-500 text-sm mt-4">
          OTP has been sent to {email}. Please check your inbox for verification.
        </p>
      )}
    </motion.div>
  );
};

export default VerifyEmailDetails;
