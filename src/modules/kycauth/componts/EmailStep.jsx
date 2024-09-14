import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEmail } from "../../lib/slice/KycSlice";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";
import { checkEmailExists } from "../../lib/slice/AuthSlice";
import { useNavigate } from "react-router-dom"; // assuming react-router

const EmailStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // for redirection if needed

  const { email } = useSelector((state) => state.kyc);
  const emailExists = useSelector((state) => state.auth.emailExists);

  const [emailError, setEmailError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);

  // Handle email change with debounce
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    dispatch(setEmail(newEmail));
    setEmailError("");
    setOtpSent(false);

    // Clear the previous debounce timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set a new debounce timer for email check
    const timer = setTimeout(() => {
      if (validateEmail(newEmail)) {
        dispatch(checkEmailExists(newEmail));
      }
    }, 1000); // 1000ms debounce

    setDebounceTimer(timer);
  };

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return; // Do nothing, just prevent submit if email is invalid
    }

    if (emailExists) {
      // Simulate sending OTP (replace with actual OTP sending logic)
      setOtpSent(true);
    }
  };

  return (
    <motion.div
      className="xl:px-6 p-2 mx-auto rounded-lg lg:py-10 pb-20 md:pb-10 xl:min-w-[450px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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
            emailError
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="Enter your email"
        />
        {emailError && (
          <p className="text-red-500 text-sm mt-1">{emailError}</p>
        )}
        {otpSent && (
          <p className="text-green-500 text-sm mt-4">
            OTP has been sent to {email}. Please check your inbox for
            verification.
          </p>
        )}
        {!emailExists && email && !otpSent && validateEmail(email) && (
          <p className="text-red-500 text-sm mt-4">
            This email is not registered with us. Please{" "}
            <button
              className="text-blue-500 underline"
              onClick={() => navigate("/auth/register")}
            >
              register
            </button>{" "}
            first.
          </p>
        )}
      </div>

    </motion.div>
  );
};

export default EmailStep;
