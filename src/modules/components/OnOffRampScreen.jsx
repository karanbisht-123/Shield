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
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true); // Show the success modal
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Funds Transfer</h1>

          <div className="bg-gray-100 rounded-lg shadow-sm mb-6">
            <div className="flex">
              <button
                className={`flex-1 py-3 text-center font-semibold ${activeTab === 'on-ramp' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                onClick={() => setActiveTab('on-ramp')}
              >
                Deposit
              </button>
              <button
                className={`flex-1 py-3 text-center font-semibold ${activeTab === 'off-ramp' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                onClick={() => setActiveTab('off-ramp')}
              >
                Withdraw
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {activeTab === 'on-ramp' ? 'Deposit' : 'Withdraw'} Amount
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter amount"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {selectedCurrency.icon && <selectedCurrency.icon className="text-gray-400" />}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Currency</label>
              <div className="grid grid-cols-3 gap-4">
                {currencies.map((currency) => (
                  <button
                    key={currency.symbol}
                    type="button"
                    onClick={() => setSelectedCurrency(currency)}
                    className={`flex items-center justify-center py-3 rounded-lg transition-colors ${
                      selectedCurrency.symbol === currency.symbol
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {currency.icon && <currency.icon className="mr-2" />}
                    {currency.symbol}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Crypto</label>
              <div className="grid grid-cols-2 gap-4">
                {cryptos.map((crypto) => (
                  <button
                    key={crypto.symbol}
                    type="button"
                    onClick={() => setSelectedCrypto(crypto)}
                    className={`flex items-center justify-center py-3 rounded-lg transition-colors ${
                      selectedCrypto.symbol === crypto.symbol
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {crypto.icon && <crypto.icon className="mr-2" />}
                    {crypto.symbol}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>1 {selectedCrypto.symbol} ≈ 30,000 {selectedCurrency.symbol}</span>
              <span className="flex items-center text-gray-600">
                <FaExchangeAlt className="mr-1" /> Fee: 1.5%
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              {activeTab === 'on-ramp' ? 'Deposit Funds' : 'Withdraw Funds'}
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Success!</h2>
            <p>Your {activeTab === 'on-ramp' ? 'deposit' : 'withdrawal'} of {amount} {selectedCurrency.symbol} has been processed.</p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnOffRampScreen;
