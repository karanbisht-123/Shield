import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaGlobe } from 'react-icons/fa';

const VerifyUserDetails = ({ onSubmit, initialData }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [country, setCountry] = useState('');
  const [countryError, setCountryError] = useState('');
  const [promotion, setPromotion] = useState(true);
  const [terms, setTerms] = useState(true);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Fetch list of countries
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const sortedCountries = data
          .map((country) => country.name.common)
          .sort((a, b) => a.localeCompare(b));
        setCountries(sortedCountries);
      } catch (error) {
        console.error('Failed to fetch countries list', error);
      }
    };

    fetchCountries();
  }, []);

  const validateForm = () => {
    let isValid = true;

    if (!firstName) {
      setFirstNameError('First name is required.');
      isValid = false;
    } else {
      setFirstNameError('');
    }

    if (!lastName) {
      setLastNameError('Last name is required.');
      isValid = false;
    } else {
      setLastNameError('');
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
      onSubmit({ ...initialData, firstName, lastName, company, country, promotion, terms });
    }
  };

  return (
    <motion.div
      className="xl:px-6 p-2 mx-auto rounded-lg lg:py-10 pb-20 md:pb-10 xl:min-w-[450px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        Let's complete your profile
      </h2>

      <div className="mb-4">
        <label className="text-gray-700 mb-2">First Name*</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
            firstNameError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
          placeholder="Enter your first name"
        />
        {firstNameError && <p className="text-red-500 text-sm mt-1">{firstNameError}</p>}
      </div>

      <div className="mb-4">
        <label className="text-gray-700 mb-2">Last Name*</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
            lastNameError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
          placeholder="Enter your last name"
        />
        {lastNameError && <p className="text-red-500 text-sm mt-1">{lastNameError}</p>}
      </div>

      <div className="mb-4">
        <label className="text-gray-700 mb-2 flex items-center gap-2">
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
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {countryError && <p className="text-red-500 text-sm mt-1">{countryError}</p>}
      </div>

      <div className="mb-4">
        <label className="text-gray-700 mb-2">Company</label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
          placeholder="Enter your company (optional)"
        />
      </div>

      <div className="mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={promotion}
            onChange={() => setPromotion(!promotion)}
            className="form-checkbox h-4 w-4 text-blue-600"
          />
          <span className="text-gray-700">I agree to receive promotional offers and updates</span>
        </label>
      </div>

      <div className="mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={terms}
            onChange={() => setTerms(!terms)}
            className="form-checkbox h-4 w-4 text-blue-600"
          />
          <span className="text-gray-700">
            I have read and agree to the <a href="/terms" className="text-blue-500 underline">Terms and Conditions</a>
          </span>
        </label>
      </div>

      <motion.button
        onClick={handleSubmit}
        className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 ${
          firstName && lastName && country
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-400 text-gray-700 cursor-not-allowed'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={!firstName || !lastName || !country}
      >
        <FaCheckCircle />
        Continue
      </motion.button>
    </motion.div>
  );
};

export default VerifyUserDetails;
