import React from "react";

const Step3 = ({ formData, handleInputChange }) => {
  return (
    <>
      <h2 className="text-xl font-bold mb-4">KYC details</h2>
      <div className="mb-4">
        <label htmlFor="cryptocurrencies" className="block text-sm font-medium text-gray-700 mb-1">
          What cryptocurrencies do you wish to convert/ receive?
        </label>
        <input
          type="text"
          id="cryptocurrencies"
          name="cryptocurrencies"
          value={formData.cryptocurrencies}
          onChange={handleInputChange}
          placeholder="Please specify chain if relevant e.g Bitcoin, Ethereum, USDT(ETH)"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="fiatCurrencies" className="block text-sm font-medium text-gray-700 mb-1">
          What fiat currencies do you wish to convert/ receive? E.g USD, EUR, GBP
        </label>
        <input
          type="text"
          id="fiatCurrencies"
          name="fiatCurrencies"
          value={formData.fiatCurrencies}
          onChange={handleInputChange}
          placeholder="Enter fiat currencies"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </>
  );
};

export default Step3;