import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import { useEmailContext } from '../../custmhook/EmailContext';

const EmailDetails = ({ nextStep }) => {
  const { email, setEmail, isRegistered, checkEmailInApp } = useEmailContext();
  const [emailError, setEmailError] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const sendOtp = () => {
    setTimeout(() => {
      setOtpSent(true);
      nextStep({ email }); 
    }, 1000);
  };

  // Validate the email input
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

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      if (isRegistered) {
        sendOtp(); // If registered, send OTP
      } else {
        localStorage.setItem('registeredEmail', email); 
        nextStep({ email }); // Proceed to the next step
      }
    }
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    checkEmailInApp(newEmail); // Check if email is already registered
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

export default EmailDetails;
