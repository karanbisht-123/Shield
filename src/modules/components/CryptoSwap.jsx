import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaInfoCircle, FaExchangeAlt } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useOrder } from '../custmhook/OrderContext';
const CryptoSwap = () => {
  const { createOrder } = useOrder();
  const [activeSection, setActiveSection] = useState('buy');
  const [spendAmount, setSpendAmount] = useState('100');
  const [receiveAmount, setReceiveAmount] = useState('0');
  const [spendCurrency, setSpendCurrency] = useState('usd');
  const [receiveCurrency, setReceiveCurrency] = useState('bitcoin');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cryptoList, setCryptoList] = useState([]);
  const [showSpendDropdown, setShowSpendDropdown] = useState(false);
  const [showReceiveDropdown, setShowReceiveDropdown] = useState(false);
  const navigate = useNavigate();

  const networkFeePercentage = 0.001;
  const exchangeFeePercentage = 0.005;

  const fiatCurrencies = ['usd', 'eur', 'gbp', 'jpy'];

  useEffect(() => {
    fetchCryptoList();
    fetchExchangeRate();
  }, [spendCurrency, receiveCurrency]);

  useEffect(() => {
    calculateReceiveAmount();
  }, [spendAmount, exchangeRate, activeSection]);

  const fetchCryptoList = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
      setCryptoList(response.data);
    } catch (err) {
      console.error('Error fetching crypto list:', err);
    }
  };

  const fetchExchangeRate = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${receiveCurrency}&vs_currencies=${spendCurrency}`);
      setExchangeRate(response.data[receiveCurrency][spendCurrency]);
    } catch (err) {
      setError('Failed to fetch exchange rate. Please try again.');
      console.error('Error fetching exchange rate:', err);
    }
    setLoading(false);
  };

  const calculateReceiveAmount = () => {
    if (exchangeRate && spendAmount) {
      const amount = parseFloat(spendAmount);
      const networkFee = amount * networkFeePercentage;
      const exchangeFee = amount * exchangeFeePercentage;
      const amountAfterFees = amount - networkFee - exchangeFee;
      const received = activeSection === 'buy' 
        ? amountAfterFees / exchangeRate 
        : amountAfterFees * exchangeRate;
      setReceiveAmount(received.toFixed(8));
    }
  };

  const handleSpendAmountChange = (e) => {
    setSpendAmount(e.target.value);
  };


 

  const generateRandomBankDetails = () => {
    const randomBankAccount = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    return {
      bankAccount: randomBankAccount,
      bankName: 'Acme Bank',
      bankIFSC: 'ACME000' + Math.floor(1000 + Math.random() * 9000).toString(),
      accountHolderName: 'John Doe',
      branchName: 'Downtown Branch'
    };
  };
  
  const generateRandomCryptoWallet = () => {
    const randomAddress = '0x' + Math.random().toString(16).substr(2, 40).toUpperCase();
    return {
      cryptoWallet: randomAddress,
      walletProvider: 'CryptoVault',
      walletName: 'JohnsWallet'
    };
  };
  
  const handleCreateOrder = () => {
    const paymentDetails = activeSection === 'buy' 
      ? generateRandomBankDetails() 
      : generateRandomCryptoWallet();
    
    const orderData = {
      type: activeSection, // 'buy' or 'sell'
      spendAmount,
      receiveAmount,
      spendCurrency,
      receiveCurrency,
      paymentDetails // Include the dummy bank or crypto wallet details
    };
    
    createOrder(orderData);
    
    navigate("/verification");
  };
  
  
  
  const toggleCurrencies = () => {
    const tempCurrency = spendCurrency;
    const tempAmount = spendAmount;
    setSpendCurrency(receiveCurrency);
    setReceiveCurrency(tempCurrency);
    setSpendAmount(receiveAmount);
    setReceiveAmount(tempAmount);
  };

  const networkFee = parseFloat(spendAmount) * networkFeePercentage;
  const exchangeFee = parseFloat(spendAmount) * exchangeFeePercentage;
  const total = parseFloat(spendAmount) + networkFee + exchangeFee;

  return (
    <div className="w-full mt-8 md:mt-0 max-w-lg mx-auto bg-gradient-to-br from-[#001F90] to-[#2087C2] text-white p-6 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Crypto Swap</h1>
      
      <div className="flex justify-center mb-6 bg-white bg-opacity-20 rounded-lg p-1">
        <button 
          className={`px-4 py-2 w-1/2 rounded-lg font-semibold transition-colors ${
            activeSection === 'buy' ? 'bg-white text-blue-600' : 'text-white hover:bg-white hover:bg-opacity-10'
          }`}
          onClick={() => setActiveSection('buy')}
        >
          Buy coins
        </button>
        <button 
          className={`px-4 py-2 w-1/2 rounded-lg font-semibold transition-colors ${
            activeSection === 'sell' ? 'bg-white text-blue-600' : 'text-white hover:bg-white hover:bg-opacity-10'
          }`}
          onClick={() => setActiveSection('sell')}
        >
          Sell coins
        </button>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          {activeSection === 'buy' ? 'Spend' : 'Sell'}
        </label>
        <div className="relative">
          <input
            type="number"
            value={spendAmount}
            onChange={handleSpendAmountChange}
            className="w-full bg-white bg-opacity-20 p-3 rounded-lg text-white placeholder-gray-300"
            placeholder="0.00"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button 
              className="flex items-center text-white"
              onClick={() => setShowSpendDropdown(!showSpendDropdown)}
            >
              {spendCurrency.toUpperCase()}
              <FaChevronDown className="ml-1 w-4 h-4" />
            </button>
            {showSpendDropdown && (
              <div className="absolute right-0 mt-12 w-56 rounded-md shadow-lg bg-white">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  {(activeSection === 'buy' ? fiatCurrencies : cryptoList).map((currency) => (
                    <button
                      key={currency.id || currency}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                      role="menuitem"
                      onClick={() => {
                        setSpendCurrency(currency.id || currency);
                        setShowSpendDropdown(false);
                      }}
                    >
                      {(currency.symbol || currency).toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          {activeSection === 'buy' ? 'Receive' : 'For'}
        </label>
        <div className="relative">
          <input
            type="text"
            value={receiveAmount}
            readOnly
            className="w-full bg-white bg-opacity-20 p-3 rounded-lg text-white"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button 
              className="flex items-center text-white"
              onClick={() => setShowReceiveDropdown(!showReceiveDropdown)}
            >
              {receiveCurrency.toUpperCase()}
              <FaChevronDown className="ml-1 w-4 h-4" />
            </button>
            {showReceiveDropdown && (
              <div className="absolute right-0 mt-12 w-56 rounded-md shadow-lg bg-white">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  {(activeSection === 'buy' ? cryptoList : fiatCurrencies).map((currency) => (
                    <button
                      key={currency.id || currency}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                      role="menuitem"
                      onClick={() => {
                        setReceiveCurrency(currency.id || currency);
                        setShowReceiveDropdown(false);
                      }}
                    >
                      
                      {(currency.symbol || currency).toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {error && <p className="text-red-300 text-xs mt-1">{error}</p>}
      </div>

      <button 
        className="w-full bg-white text-blue-600 p-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors mb-6 flex justify-center items-center"
        onClick={toggleCurrencies}
      >
        <FaExchangeAlt className="mr-2" /> Switch Currencies
      </button>
      
      <div className="mb-6 bg-white bg-opacity-20 rounded-lg p-4">
        <h2 className="text-lg font-medium mb-4">Transaction Details</h2>
        <div className="space-y-2">
          {[
            { label: `${activeSection === 'buy' ? 'Spend' : 'Sell'} Amount`, value: `${spendAmount} ${spendCurrency.toUpperCase()}` },
            { label: `${activeSection === 'buy' ? 'Receive' : 'For'} Amount`, value: `${receiveAmount} ${receiveCurrency.toUpperCase()}` },
            { label: 'Network Fee', value: `${networkFee.toFixed(2)} ${spendCurrency.toUpperCase()}` },
            { label: 'Exchange Fee', value: `${exchangeFee.toFixed(2)} ${spendCurrency.toUpperCase()}` },
            { label: 'Total', value: `${total.toFixed(2)} ${spendCurrency.toUpperCase()}` }
          ].map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <p className="text-gray-300">{item.label}:</p>
              <div className="flex items-center">
                <p className="font-medium">{item.value}</p>
                <FaInfoCircle className="ml-2 text-gray-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button 
        className="w-full bg-white text-blue-600 p-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
        onClick={handleCreateOrder}
        disabled={loading}
      >
        {loading ? 'LOADING...' : `CREATE ${activeSection.toUpperCase()} ORDER`}
      </button>
    </div>
  );
};

export default CryptoSwap;