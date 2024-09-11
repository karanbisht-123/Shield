import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaWallet, FaCreditCard, FaArrowRight, FaArrowLeft, FaCopy, FaCheck } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const OrderList = () => {
  const orders = useSelector((state) => state?.order?.orders);
  const [showModal, setShowModal] = useState(false);
  const [processing, setProcessing] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You might want to add a toast notification here
  };

  const handlePayment = () => {
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setShowModal(true);
    }, 2000);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Simulate redirect to transaction screen
    console.log("Redirecting to transaction screen...");
  };

  const PaymentDetails = ({ order }) => {
    const isCryptoToFiat = order?.type === 'cryptoToFiat';
    const isFiatToCrypto = order?.type === 'fiatToCrypto';

    const DetailCard = ({ title, icon: Icon, children, bgColor }) => (
      <motion.div
        className={`${bgColor} p-4 sm:p-6 rounded-lg shadow-md`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h3 className="font-semibold text-lg mb-4 flex items-center">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
          <span>{title}</span>
        </h3>
        {children}
      </motion.div>
    );

    const WalletAddress = ({ address }) => (
      <div className="flex items-center space-x-2 bg-white rounded p-2 break-all">
        <p className="text-xs sm:text-sm flex-grow">{address}</p>
        <button
          onClick={() => copyToClipboard(address)}
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          <FaCopy className="w-4 h-4" />
        </button>
      </div>
    );

    return (
      <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
        {isCryptoToFiat && (
          <>
            <DetailCard title="Bank Details (Buyer)" icon={FaCreditCard} bgColor="bg-blue-50">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                <p><strong>Account Name:</strong> John Doe</p>
                <p><strong>Account Number:</strong> 1234 5678 9012 3456</p>
                <p><strong>Bank Name:</strong> Bank of America</p>
                <p><strong>Routing Number:</strong> 110000000</p>
                <p><strong>Swift Code:</strong> BOFAUS3N</p>
                <p><strong>Bank Address:</strong> 123 Main Street, New York, NY, USA</p>
              </div>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-blue-600">Please verify all details before transaction.</p>
            </DetailCard>
            <DetailCard title="Wallet Details (Seller)" icon={FaWallet} bgColor="bg-green-50">
              <WalletAddress address="0x1234abcd5678efgh9012ijkl3456mnop7890qrst" />
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-green-600">Confirm wallet address before sending funds.</p>
            </DetailCard>
          </>
        )}
        {isFiatToCrypto && (
          <>
            <DetailCard title="Wallet Details (Buyer)" icon={FaWallet} bgColor="bg-green-50">
              <WalletAddress address="0x5678abcd9012efgh3456ijkl7890mnop1234qrst" />
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-green-600">Confirm wallet address before sending funds.</p>
            </DetailCard>
            <DetailCard title="Bank Details (Seller)" icon={FaCreditCard} bgColor="bg-blue-50">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                <p><strong>Account Name:</strong> Jane Doe</p>
                <p><strong>Account Number:</strong> 9876 5432 1098 7654</p>
                <p><strong>Bank Name:</strong> Citibank</p>
                <p><strong>Routing Number:</strong> 210000000</p>
                <p><strong>Swift Code:</strong> CITIUS33</p>
                <p><strong>Bank Address:</strong> 456 Financial Road, Los Angeles, CA, USA</p>
              </div>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-blue-600">Please verify all details before transaction.</p>
            </DetailCard>
          </>
        )}
      </div>
    );
  };

  const SuccessModal = () => (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-lg p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <FaCheck className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Payment Successful!</h3>
              <p className="mt-2 text-sm text-gray-500">
                Your transaction has been processed successfully.
              </p>
              <div className="mt-4">
                <a
                   href='/transactions'
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
                >
                  View Transaction
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 bg-gray-100 min-h-screen">
      {/* <motion.h2 
        className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Order List
      </motion.h2> */}
      <motion.ul 
        className="space-y-6 sm:space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {orders?.map((order, index) => (
          <motion.li 
            key={order?.id} 
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
                <span className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-0">{order?.type}</span>
                <div className="flex items-center space-x-2 text-xs sm:text-sm">
                  <span className="font-medium text-gray-500">{order?.spendAmount} {order?.spendCurrency}</span>
                  {order?.type === 'cryptoToFiat' ? 
                    <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" /> : 
                    <FaArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  }
                  <span className="font-medium text-gray-500">{order?.receiveAmount} {order?.receiveCurrency}</span>
                </div>
              </div>
              <PaymentDetails order={order} />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`mt-4 w-full py-2 px-4 rounded-md text-white font-medium ${
                  processing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
                onClick={handlePayment}
                disabled={processing}
              >
                {processing ? 'Processing...' : 'Pay Now'}
              </motion.button>
            </div>
          </motion.li>
        ))}
      </motion.ul>
      <SuccessModal />
    </div>
  );
};

export default OrderList;