import React, { useState } from 'react';
import { FaBitcoin, FaEthereum, FaDollarSign, FaPlusCircle, FaWallet, FaExchangeAlt, FaRegTrashAlt } from 'react-icons/fa';

const initialWallets = [
  { name: 'Bitcoin Wallet', symbol: 'BTC', balance: '1.234 BTC', icon: FaBitcoin },
  { name: 'Ethereum Wallet', symbol: 'ETH', balance: '5.678 ETH', icon: FaEthereum },
  { name: 'USD Wallet', symbol: 'USD', balance: '$1,000.00', icon: FaDollarSign },
];

const WalletScreen = () => {
  const [wallets, setWallets] = useState(initialWallets);
  const [selectedWallet, setSelectedWallet] = useState(initialWallets[0]);
  const [showCreateWallet, setShowCreateWallet] = useState(false);
  const [walletName, setWalletName] = useState('');

  const handleCreateWallet = () => {
    if (wallets.length >= 6) {
      alert('You can only create up to 6 wallets.');
      return;
    }

    if (walletName.trim() === '') {
      alert('Wallet name is required.');
      return;
    }

    const newWallet = {
      name: walletName,
      symbol: walletName.slice(0, 3).toUpperCase(), // Simple symbol creation logic
      balance: '0.0000', // Initial balance
      icon: FaWallet,
    };

    setWallets([...wallets, newWallet]);
    setWalletName('');
    setShowCreateWallet(false);
  };

  const handleDeleteWallet = (symbol) => {
    setWallets(wallets.filter(wallet => wallet.symbol !== symbol));
    if (selectedWallet.symbol === symbol) {
      setSelectedWallet(wallets[0] || {});
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Crypto Wallet</h1>
          <button
            onClick={() => setShowCreateWallet(true)}
            className="flex items-center text-blue-500 hover:text-blue-600"
          >
            <FaPlusCircle className="text-xl mr-2" />
            Create New Wallet
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {wallets.map((wallet) => (
            <div
              key={wallet.symbol}
              onClick={() => setSelectedWallet(wallet)}
              className={`cursor-pointer bg-gray-50 p-4 rounded-lg shadow-md flex items-center justify-between transition-transform transform ${
                selectedWallet.symbol === wallet.symbol ? 'scale-105 bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center">
                <wallet.icon className="text-3xl mr-4 text-gray-700" />
                <div>
                  <h3 className="text-lg font-semibold">{wallet.name}</h3>
                  <p className="text-sm text-gray-600">{wallet.balance}</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteWallet(wallet.symbol);
                }}
                className="text-red-500 hover:text-red-600"
              >
                <FaRegTrashAlt className="text-xl" />
              </button>
            </div>
          ))}
        </div>

        {selectedWallet && (
          <div className="bg-gray-50 p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-2">Selected Wallet</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {selectedWallet.icon && <selectedWallet.icon className="text-3xl mr-4" />}
                <div>
                  <h3 className="text-lg font-semibold">{selectedWallet.name}</h3>
                  <p className="text-sm text-gray-600">{selectedWallet.balance}</p>
                </div>
              </div>
              <button className="text-blue-500 hover:text-blue-600">
                <FaExchangeAlt className="text-xl" />
              </button>
            </div>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Transaction History</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-gray-700">Deposit</span>
              <span className="font-semibold text-green-600">+ 0.50 BTC</span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-gray-700">Withdrawal</span>
              <span className="font-semibold text-red-600">- 0.20 BTC</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Deposit</span>
              <span className="font-semibold text-green-600">+ 1.00 BTC</span>
            </div>
          </div>
        </div>
      </div>

      {showCreateWallet && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Create New Wallet</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleCreateWallet(); }}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Wallet Name</label>
                <input
                  type="text"
                  value={walletName}
                  onChange={(e) => setWalletName(e.target.value)}
                  placeholder="Enter wallet name"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowCreateWallet(false)}
                  className="mr-4 text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Create Wallet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletScreen;
