import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const OTPVerificationScreen = ({ onVerify, email }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const verifyOTP = () => {
    setIsVerifying(true);
    setError('');
    navigate("/deposite");
    // Simulating OTP verification
    setTimeout(() => {
      const enteredOTP = otp.join('');
      if (enteredOTP === '123456') {
        onVerify(true);
      } else {
        setError('Invalid OTP. Please try again.');
        setIsVerifying(false);
      }
    }, 2000);
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto bg-white  p-2 py-6 lg:p-8 "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className=" mb-8">
        {/* <motion.div
          className="inline-block p-3 rounded-full bg-blue-100 mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, delay: 0.2 }}
        >
          <FaLock className="text-blue-600 text-3xl" />
        </motion.div> */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Email</h2>
        <p className="text-gray-600">
          We've sent a code to {email}. Enter it below to confirm your email address.
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-center space-x-2 lg:space-x-8">
          {otp.map((data, index) => (
            <motion.input
              key={index}
              type="text"
              maxLength="1"
              ref={(ref) => (inputRefs.current[index] = ref)}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 lg:w-14 lg:h-14 border-2 rounded bg-gray-100 text-center text-xl font-semibold text-gray-800 focus:border-blue-500 focus:outline-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            />
          ))}
        </div>
      </div>

      {error && (
        <motion.p
          className="text-red-500 text-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.p>
      )}

      <motion.button
        onClick={verifyOTP}
        disabled={otp.some((digit) => !digit) || isVerifying}
        className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 ${
          otp.every((digit) => digit) && !isVerifying
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isVerifying ? (
          <motion.div
            className="w-6 h-6 border-t-2 border-white rounded-full animate-spin"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        ) : (
          <>
            <FaCheck />
            Verify OTP
          </>
        )}
      </motion.button>

      <div className="mt-6">
        <p className="text-gray-600">Didn't receive the code?</p>
        <button className="text-blue-600 font-semibold hover:underline mt-1">
          Resend OTP
        </button>
      </div>
    </motion.div>
  );
};

export default OTPVerificationScreen;