// components/VerifyDetails.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGlobe, FaCheckCircle } from 'react-icons/fa';

const VerifyDetails = ({ nextStep }) => {
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [emailError, setEmailError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [promotion, setPromotion] = useState(false);
  const [terms, setTerms] = useState(false);

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

    if (!country) {
      setCountryError('Country of residence is required.');
      isValid = false;
    } else {
      setCountryError('');
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      nextStep();
    }
  };

  return (
    <motion.div
      className=" xl:p-6 p-2  mx-auto rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        {/* <FaCheckCircle className="text-green-600" /> */}
        Let's verify your details
      </h2>
      
      <div className="mb-4">
        <label className=" text-gray-700 mb-2 flex items-center gap-2">
          <FaEnvelope className="text-gray-500" />
          Email Address*
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
            emailError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
          placeholder="Enter your email"
        />
        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
      </div>

      <div className="mb-4">
        <label className=" text-gray-700 mb-2 flex items-center gap-2">
          <FaGlobe className="text-gray-500" />
          Country of Residence*
        </label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
            countryError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
        >
          <option value="">Choose country</option>
          <option value="United States">United States</option>
          <option value="Canada">Canada</option>
          {/* Add other countries */}
        </select>
        {countryError && <p className="text-red-500 text-sm mt-1">{countryError}</p>}
      </div>

      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={promotion}
            onChange={() => setPromotion(!promotion)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-700">Yes, I would like to be kept up to date with promotions.</span>
        </label>
      </div>

      <div className="mb-6">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={terms}
            onChange={() => setTerms(!terms)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-700">I have read and agree to the Terms and Conditions.</span>
        </label>
      </div>

      <motion.button
        onClick={handleSubmit}
        className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 ${
          email && country && promotion && terms ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-400 text-gray-700 cursor-not-allowed'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={!(email && country && promotion && terms)}
      >
        <FaCheckCircle />
        Submit Verification
      </motion.button>
    </motion.div>
  );
};

export default VerifyDetails;
