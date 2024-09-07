import React, { useState } from 'react';
import { FaSearch, FaBitcoin, FaEthereum, FaExchangeAlt } from 'react-icons/fa';
import { SiCardano, SiDogecoin, SiLitecoin } from 'react-icons/si';

const transactions = [
  { id: 1, date: '2024-09-05', type: 'Buy', asset: 'BTC', amount: 0.5, value: 15000, status: 'Completed' },
  { id: 2, date: '2024-09-04', type: 'Sell', asset: 'ETH', amount: 2, value: 6000, status: 'Pending' },
  { id: 3, date: '2024-09-03', type: 'Swap', fromAsset: 'BTC', toAsset: 'ETH', fromAmount: 0.1, toAmount: 1.5, value: 3000, status: 'Completed' },
  { id: 4, date: '2024-09-02', type: 'Buy', asset: 'ADA', amount: 1000, value: 500, status: 'Completed' },
  { id: 5, date: '2024-09-01', type: 'Swap', fromAsset: 'ETH', toAsset: 'DOGE', fromAmount: 0.5, toAmount: 1000, value: 1500, status: 'Completed' },
  { id: 6, date: '2024-08-31', type: 'Sell', asset: 'LTC', amount: 5, value: 750, status: 'Failed' },
];

const getAssetIcon = (asset) => {
  switch (asset) {
    case 'BTC':
      return <FaBitcoin className="text-orange-500" />;
    case 'ETH':
      return <FaEthereum className="text-blue-500" />;
    case 'ADA':
      return <SiCardano className="text-blue-700" />;
    case 'DOGE':
      return <SiDogecoin className="text-yellow-500" />;
    case 'LTC':
      return <SiLitecoin className="text-gray-500" />;
    default:
      return null;
  }
};

const TransactionHistoryScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter(transaction =>
    transaction.asset?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.fromAsset?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.toAsset?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTransaction = (transaction) => {
    if (transaction.type === 'Swap') {
      return (
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-3">
              <FaExchangeAlt className="text-purple-500" />
            </div>
            <div>
              <p className="font-semibold">Swap</p>
              <p className="text-sm text-gray-500">{transaction.date}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-purple-600">
              {transaction.fromAmount} {transaction.fromAsset} → {transaction.toAmount} {transaction.toAsset}
            </p>
            <p className="text-sm text-gray-500">${transaction.value.toLocaleString()}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-3">
              {getAssetIcon(transaction.asset)}
            </div>
            <div>
              <p className="font-semibold">{transaction.type} {transaction.asset}</p>
              <p className="text-sm text-gray-500">{transaction.date}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`font-semibold ${transaction.type === 'Buy' ? 'text-green-600' : 'text-red-600'}`}>
              {transaction.type === 'Buy' ? '+' : '-'}{transaction.amount} {transaction.asset}
            </p>
            <p className="text-sm text-gray-500">${transaction.value.toLocaleString()}</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen  xl:px-28 pb-20 md:pb-10">
      <h1 className="text-2xl font-bold mb-6">Transaction History</h1>
      
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search transactions"
          className="w-full pl-10 pr-4 py-2 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      <div className="space-y-4">
        {filteredTransactions.map((transaction) => (
          <div key={transaction.id} className="bg-white rounded-lg p-4 shadow-sm">
            {renderTransaction(transaction)}
            <div className="mt-2">
              <span className={`px-2 py-1 rounded-full text-xs ${
                transaction.status === 'Completed' ? 'bg-green-100 text-green-800' :
                transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {transaction.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistoryScreen;