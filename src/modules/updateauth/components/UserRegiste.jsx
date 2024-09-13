import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaGlobe } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { checkEmailExists } from "../../lib/slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import { setEmail, setPersonalInfo } from "../../lib/slice/KycSlice";
import debounce from 'lodash.debounce';

const UserRegister = ({ errors }) => {
  console.log
  const [promotion, setPromotion] = useState(true);
  const [terms, setTerms] = useState(true);
  const [countries, setCountries] = useState([]);
  const [isLoadingCountry, setIsLoadingCountry] = useState(true);
  const [emailExistsMessage, setEmailExistsMessage] = useState("");
  const { email, country } = useSelector((state) => state.kyc);
  const emailExists = useSelector((state) => state.auth.emailExists);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Debounce the email existence check
  const debouncedCheckEmailExists = useCallback(
    debounce((email) => {
      if (/\S+@\S+\.\S+/.test(email)) {
        dispatch(checkEmailExists(email));
      }
    }, 500),
    [dispatch]
  );

  useEffect(() => {
    // Fetch country based on IP address
    const fetchCountryBasedOnIP = async () => {
      setIsLoadingCountry(true);
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        dispatch(setPersonalInfo({ country: data.country_name || "" }));
      } catch (error) {
        console.error("Failed to fetch country information", error);
      } finally {
        setIsLoadingCountry(false);
      }
    };

    // Fetch list of countries
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const sortedCountries = data
          .map((country) => country.name.common)
          .sort((a, b) => a.localeCompare(b));
        setCountries(sortedCountries);
      } catch (error) {
        console.error("Failed to fetch countries list", error);
      }
    };

    fetchCountryBasedOnIP();
    fetchCountries();
  }, [dispatch]);

  useEffect(() => {
    if (email) {
      debouncedCheckEmailExists(email);
    }
  }, [email, debouncedCheckEmailExists]);

  useEffect(() => {
    if (emailExists) {
      setEmailExistsMessage("It looks like you're already registered. Please verify your email.");
    } else {
      setEmailExistsMessage("");
    }
  }, [emailExists]);

  const handleEmailChange = (e) => {
    dispatch(setEmail(e.target.value));
  };

  const handleCountryChange = (e) => {
    dispatch(setPersonalInfo({ country: e.target.value }));
  };

  const handleRedirectToVerify = () => {
    navigate("/auth/verify");
  };

  return (
    <motion.div
      className="xl:px-6 p-2 mx-auto rounded-lg lg:py-10 pb-20 md:pb-10"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        Let's verify your details
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
            errors?.email
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="Enter your email"
        />
    {errors && errors.email && typeof errors.email === 'string' && errors.email.trim() !== '' && (
  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
)}

        {emailExistsMessage && (
          <div className="text-red-500 text-sm mt-1">
            {emailExistsMessage}
            <button
              onClick={handleRedirectToVerify}
              className="ml-2 text-blue-500 underline"
            >
              Verify Now
            </button>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="text-gray-700 mb-2 flex items-center gap-2">
          <FaGlobe className="text-gray-500" />
          Country of Residence*
        </label>
        {isLoadingCountry ? (
          <div className="w-full p-3 border rounded-lg bg-gray-100">
            Loading...
          </div>
        ) : (
          <select
            value={country}
            onChange={handleCountryChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2
          
            
            `
          }
          >
            <option value="">Choose country</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        )}
        {/* {errors?.country && (
          <p className="text-red-500 text-sm mt-1">{errors.country}</p>
        )} */}
      </div>

      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={promotion}
            onChange={() => setPromotion(!promotion)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-700">
            Yes, I would like to be kept up to date with promotions.
          </span>
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
          <span className="ml-2 text-gray-700">
            I have read and agree to the Terms and Conditions.
          </span>
        </label>
      </div>
    </motion.div>
  );
};

export default UserRegister;