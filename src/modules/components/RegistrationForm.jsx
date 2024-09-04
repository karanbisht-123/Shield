import React from 'react';
import { FaShieldAlt, FaChevronDown } from 'react-icons/fa';

const RegistrationForm = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Column */}
      <div className="hidden md:flex md:w-1/2 bg-indigo-900 text-white p-12 flex-col justify-between">
        <div>
          <div className="flex items-center mb-8">
            <FaShieldAlt className="text-4xl mr-2" />
            <h1 className="text-3xl font-bold">SHIELD</h1>
          </div>
          <h2 className="text-3xl font-bold mb-4">Few click away on KYC.</h2>
          <p className="mb-4">Start your KYC in minutes,<br />save time and money</p>
        </div>
        <img src="/api/placeholder/300/400" alt="KYC Illustration" className="max-w-sm mx-auto" />
      </div>

      {/* Right Column */}
      <div className="w-full md:w-1/2 bg-white p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-2xl font-bold mb-6">Let's verify your details</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" id="email" name="email" placeholder="Enter email address" 
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country of residence*</label>
              <div className="relative">
                <select id="country" name="country" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                  <option value="">Select country</option>
                  {/* Add country options here */}
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="mb-6">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                <span className="ml-2 text-sm text-gray-600">Yes, I would like to be kept up to date with promotions and marketing. (You can opt out at any time)</span>
              </label>
            </div>
            <div className="mb-6">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                <span className="ml-2 text-sm text-gray-600">I have read and agree to the terms and Conditions and Privacy and Cookies Policy</span>
              </label>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
              SAVE & CONTINUE
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            Already have an account? <a href="#" className="text-blue-500 hover:underline">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;