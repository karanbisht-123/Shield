import React, { useState } from 'react';
import { FaDollarSign, FaEuroSign, FaPoundSign, FaBitcoin, FaEthereum, FaExchangeAlt } from 'react-icons/fa';

const currencies = [
  { symbol: 'USD', icon: FaDollarSign, name: 'US Dollar' },
  { symbol: 'EUR', icon: FaEuroSign, name: 'Euro' },
  { symbol: 'GBP', icon: FaPoundSign, name: 'British Pound' },
];

const cryptos = [
  { symbol: 'BTC', icon: FaBitcoin, name: 'Bitcoin' },
  { symbol: 'ETH', icon: FaEthereum, name: 'Ethereum' },
];

const OnOffRampScreen = () => {
  const [activeTab, setActiveTab] = useState('on-ramp');
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [selectedCrypto, setSelectedCrypto] = useState(cryptos[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${activeTab === 'on-ramp' ? 'Depositing' : 'Withdrawing'} ${amount} ${selectedCurrency.symbol}`);
  };

  return (
    <div className="max-w-7xl  mx-auto px-4 py-8 bg-gray-50 min-h-screen xl:px-28">
      <h1 className="text-2xl font-bold mb-6">Funds Transfer</h1>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6 ">
        <div className="flex">
          <button
            className={`flex-1 py-3 text-center font-medium ${activeTab === 'on-ramp' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab('on-ramp')}
          >
            Deposit
          </button>
          <button
            className={`flex-1 py-3 text-center font-medium ${activeTab === 'off-ramp' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab('off-ramp')}
          >
            Withdraw
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {activeTab === 'on-ramp' ? 'Deposit' : 'Withdraw'} Amount
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter amount"
              required
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {selectedCurrency.icon && <selectedCurrency.icon className="text-gray-400" />}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Currency</label>
          <div className="grid grid-cols-3 gap-2">
            {currencies.map((currency) => (
              <button
                key={currency.symbol}
                type="button"
                onClick={() => setSelectedCurrency(currency)}
                className={`flex items-center justify-center py-2 rounded-lg ${
                  selectedCurrency.symbol === currency.symbol
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {currency.icon && <currency.icon className="mr-2" />}
                {currency.symbol}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Crypto</label>
          <div className="grid grid-cols-2 gap-2">
            {cryptos.map((crypto) => (
              <button
                key={crypto.symbol}
                type="button"
                onClick={() => setSelectedCrypto(crypto)}
                className={`flex items-center justify-center py-2 rounded-lg ${
                  selectedCrypto.symbol === crypto.symbol
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {crypto.icon && <crypto.icon className="mr-2" />}
                {crypto.symbol}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
          <span>1 {selectedCrypto.symbol} ≈ 30,000 {selectedCurrency.symbol}</span>
          <span className="flex items-center">
            <FaExchangeAlt className="mr-1" /> Fee: 1.5%
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          {activeTab === 'on-ramp' ? 'Deposit Funds' : 'Withdraw Funds'}
        </button>
      </form>
    </div>
  );
};

export default OnOffRampScreen;