import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaCheck, FaTimes } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const PasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [isCreationMode, setIsCreationMode] = useState(false);
  const location = useLocation();
  useEffect(() => {
    // Determine if we're in creation mode based on the route
    setIsCreationMode(location.pathname === "/auth/verify");
  }, [location.pathname]);

  const passwordCriteria = [
    { label: "At least 8 characters", regex: /.{8,}/ },
    { label: "Contains a lowercase letter", regex: /[a-z]/ },
    { label: "Contains an uppercase letter", regex: /[A-Z]/ },
    { label: "Contains a number", regex: /\d/ },
    { label: "Contains a special character", regex: /[!@#$%^&*(),.?":{}|<>]/ },
  ];

  const checkPasswordStrength = (pass) => {
    let strength = 0;
    passwordCriteria.forEach((criterion) => {
      if (criterion.regex.test(pass)) {
        strength++;
      }
    });
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (isCreationMode) {
      checkPasswordStrength(newPassword);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    if (isCreationMode) {
      setPasswordsMatch(password === confirmPassword && password !== "");
    }
  }, [password, confirmPassword, isCreationMode]);

  const getStrengthColor = () => {
    if (passwordStrength < 2) return "bg-red-500";
    if (passwordStrength < 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isCreationMode) {
      if (passwordsMatch && passwordStrength >= 3) {
        console.log("Password created successfully");

      } else {
        console.log("Password does not meet requirements");
      }
    } else {
      console.log("Verifying password");
   
    }
  };



  return (
    <motion.div
      className=" flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white p-2 lg:p-8 rounded-lg  w-full max-w-5xl"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {isCreationMode ? "Create Your Password" : "Enter Your Password"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={isCreationMode ? "Enter your password" : "Password"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {isCreationMode && (
            <>
              <div className="mb-4 relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 focus:outline-none"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {/* <motion.div
                className="h-2 bg-gray-200 rounded-full mb-4"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className={`h-full rounded-full ${getStrengthColor()}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(passwordStrength / 5) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div> */}
              {/* <p className="text-sm text-gray-600 mb-4">
                Password strength: {passwordStrength < 2 ? 'Weak' : passwordStrength < 4 ? 'Medium' : 'Strong'}
              </p> */}
              <ul className="space-y-2 mb-6">
                {passwordCriteria.map((criterion, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center text-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {criterion.regex.test(password) ? (
                      <FaCheck className="text-green-500 mr-2" />
                    ) : (
                      <FaTimes className="text-red-500 mr-2" />
                    )}
                    {criterion.label}
                  </motion.li>
                ))}
                <motion.li
                  className="flex items-center text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {passwordsMatch ? (
                    <FaCheck className="text-green-500 mr-2" />
                  ) : (
                    <FaTimes className="text-red-500 mr-2" />
                  )}
                  Passwords match
                </motion.li>
              </ul>
            </>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
};

export default PasswordScreen;
