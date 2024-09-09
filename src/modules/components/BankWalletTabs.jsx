import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWallet, FaUniversity, FaCopy, FaExternalLinkAlt, FaEthereum, FaBitcoin, FaDollarSign, FaEuroSign } from 'react-icons/fa';

const DetailItem = ({ label, value, icon: Icon, link }) => (
  <div className="mb-4 bg-white p-4 rounded-lg shadow-sm">
    <p className="text-sm text-gray-500 mb-1 flex items-center">
      {Icon && <Icon className="mr-2" />}
      {label}
    </p>
    <div className="flex items-center justify-between">
      <span className="text-gray-800 font-medium break-all">{value}</span>
      <div className="flex space-x-2 ml-2">
        <button 
          onClick={() => navigator.clipboard.writeText(value)}
          className="text-indigo-500 hover:text-indigo-600 transition-colors p-1"
          aria-label="Copy to clipboard"
        >
          <FaCopy />
        </button>
        {link && (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-indigo-500 hover:text-indigo-600 transition-colors p-1"
            aria-label="Open external link"
          >
            <FaExternalLinkAlt />
          </a>
        )}
      </div>
    </div>
  </div>
);

const TabContent = ({ title, details }) => (
  <div className="mt-6">
    <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
    {details.map((detail, index) => (
      <DetailItem key={index} {...detail} />
    ))}
  </div>
);

const BankWalletTabs = () => {
  const [activeTab, setActiveTab] = useState('wallet');

  const walletDetails = [
    // { label: "Ethereum Address", value: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", icon: FaEthereum, link: "https://etherscan.io/address/0x742d35Cc6634C0532925a3b844Bc454e4438f44e" },
    // { label: "ETH Balance", value: "1,234.56 ETH", icon: FaEthereum },
    { label: "Bitcoin Address", value: "3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5", icon: FaBitcoin, link: "https://www.blockchain.com/btc/address/3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5" },
    { label: "BTC Balance", value: "0.5473 BTC", icon: FaBitcoin },
    // { label: "USD Balance", value: "$45,678.90", icon: FaDollarSign },
    { label: "Network", value: "Ethereum Mainnet" },
    { label: "Last Transaction", value: "2 hours ago" },
  ];

  const bankDetails = [
    { label: "Account Holder", value: "John Doe" },
    { label: "Account Number", value: "1234567890" },
    { label: "IBAN", value: "GB29NWBK60161331926819" },
    { label: "Swift Code", value: "NWBKGB2L" },
    { label: "Bank Name", value: "International Bank of Finance" },
    { label: "Account Type", value: "Checking" },
    { label: "Currency", value: "EUR", icon: FaEuroSign },
    { label: "Available Balance", value: "€34,567.89", icon: FaEuroSign },
    { label: "Standing Orders", value: "2 Active" },
  ];

  return (
    <div className="max-w-7xl mx-auto bg-gray-100 rounded-xl  overflow-hidden pb-10 xl:my-10">
      <div className="p-4 sm:p-6 md:p-8  xl:max-w-4xl mx-auto" >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Accont Details</h2>
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {['wallet', 'bank'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-3 px-4 text-center transition-colors whitespace-nowrap ${
                activeTab === tab 
                  ? 'text-indigo-600 border-b-2 font-medium border-indigo-600' 
                  : 'text-gray-500 hover:text-indigo-600'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'wallet' ? <FaWallet className="inline-block mr-2" /> : <FaUniversity className="inline-block mr-2" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          {activeTab === 'wallet' && (
            <TabContent
              title="Crypto Wallet Details"
              details={walletDetails}
            />
          )}
          {activeTab === 'bank' && (
            <TabContent
              title="Bank Account Details"
              details={bankDetails}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BankWalletTabs;