import React, { useState } from 'react';
import {  FaChevronDown  } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
const CryptoSwap = () => {
  const [spendAmount, setSpendAmount] = useState('100');
  const [receiveAmount, setReceiveAmount] = useState('0.00000656');

  return (
    <div className="w-full max-w-md mx-auto  text-white py-4  lg:border lg:p-6  shadow-sm rounded-lg">
      <div className="flex justify-center mb-4   ">
        <button className="px-4 py-2 w-1/2 bg-cyan-500 rounded-l-lg text-white font-semibold hover:bg-cyan-600 transition-colors">
          Buy coins
        </button>
        <button className="px-4 py-2 w-1/2  bg-black border-white rounded-r-lg text-white font-semibold hover:bg-white hover:text-indigo-900 transition-colors">
          Sell coins
        </button>
      </div>
      
      <div className="mb-4 text-black">
        <label className="block text-sm font-medium mb-1">Spend</label>
        <div className="relative  border borer-gray-100 rounded-lg">
          <input
            type="number"
            value={spendAmount}
            onChange={(e) => setSpendAmount(e.target.value)}
            className="w-full  shadow-sm p-3 rounded-md text-black "
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 ">
            <button className="flex items-center text-black ">
              {/* <img src="/api/placeholder/20/20" alt="INR flag" className="w-5 h-5 rounded-full mr-1" /> */}
              INR
              <FaChevronDown  className="ml-1 w-4 h-4 text-black " />
            </button>
          </div>
        </div>
      </div>
      
      <div className="mb-4 text-black">
        <label className="block text-sm font-medium mb-1">Receive</label>
        <div className="relative border borer-gray-100 rounded-lg">
          <input
            type="text"
            value={receiveAmount}
            readOnly
            className="w-full shadow-sm text-black p-3 rounded-md"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button className="flex items-center text-black">
              {/* <img src="/api/placeholder/20/20" alt="BTC logo" className="w-5 h-5 rounded-full mr-1" /> */}
              BTC
              <FaChevronDown  className="ml-1 w-4 h-4 text-black " />
            </button>
          </div>
        </div>
        <p className="text-red-500 text-xs mt-1">Please enter an amount greater or equal 0.0001</p>
      </div>
      
      <div className="mt-6 bg-white text-black rounded-lg ">
  <h2 className="text-lg font-medium mb-4">Transaction Details</h2>
  <div className="border-b border-gray-100">
    <div className="grid grid-cols-1 gap-1">
      {[
        { label: 'Spend Amount', value: `${spendAmount} INR` },
        { label: 'Receive Amount', value: `${receiveAmount} BTC` },
        { label: 'Network Fee', value: '33 INR' },
        { label: 'Exchange Fee', value: '33 INR' },
        { label: 'Total', value: '323 INR' }
      ].map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center border-b border-gray-100 pb-2"
        >
          <p className="flex-grow text-gray-600">{item.label}:</p>
          <p className="font-medium">{item.value}</p>
          <span className="ml-2 text-gray-600">
            <FaInfoCircle />
          </span>
        </div>
      ))}
    </div>
  </div>
</div>


      <button className="w-full bg-cyan-500 text-white p-3 rounded-md font-semibold hover:bg-cyan-700 transition-colors mt-6">
        CREATE ORDER
      </button>
    </div>
  );
};

export default CryptoSwap;
