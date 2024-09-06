import React from "react";
import { FaChevronDown } from "react-icons/fa";

const Step1 = ({ formData, handleInputChange }) => {
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Let's verify your details</h2>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter email address"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
          Country of residence*
        </label>
        <div className="relative">
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          >
            <option value="">Select country</option>
            <option value="India">India</option>
            <option value="Usa">Usa</option>
            <option value="Pakistan">Pakistan</option>
            
          </select>
          <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
          <span className="ml-2 text-sm text-gray-600">
            Yes, I would like to be kept up to date with promotions and marketing.
          </span>
        </label>
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
          <span className="ml-2 text-sm text-gray-600">
            I have read and agree to the terms and Conditions and Privacy and Cookies Policy
          </span>
        </label>
      </div>
    </>
  );
};

export default Step1;