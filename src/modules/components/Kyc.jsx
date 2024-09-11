import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaGlobe, FaBuilding, FaUserTie, FaUniversity } from 'react-icons/fa';
import { useEmailContext } from '../custmhook/EmailContext';

const KycDetails = () => {
  const { isRegistered } = useEmailContext();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isRegistered) {
  //     navigate('/auth/verify');
  //   }
  // }, [isRegistered, navigate]);

  const userData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    country: "United States",
    company: "Acme Inc.",
    type: "business",
    bankName: "Global Bank",
    accountNumber: "1234567890",
    accountType: "Checking"
  };

  const { firstName, lastName, email, country, company, type, bankName, accountNumber, accountType } = userData;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      className="max-w-6xl mx-auto mt-10 p-4 xl:p-8  rounded-xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">KYC Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Type */}
        <motion.div className="col-span-1 md:col-span-2" variants={itemVariants}>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 flex items-center shadow-sm">
            <FaUserTie className="text-2xl mr-4 text-blue-600" />
            <div>
              <p className="text-sm text-blue-600 font-semibold">Account Type</p>
              <p className="text-lg font-medium">{type === 'business' ? 'Business' : 'Individual'}</p>
            </div>
          </div>
        </motion.div>

        {/* Full Name */}
        <motion.div variants={itemVariants}>
          <div className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <FaUser className="text-2xl mb-2 text-indigo-600" />
            <p className="text-sm text-gray-600 font-semibold">Full Name</p>
            <p className="text-lg font-medium">{firstName} {lastName}</p>
          </div>
        </motion.div>

        {/* Email Address */}
        <motion.div variants={itemVariants}>
          <div className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <FaEnvelope className="text-2xl mb-2 text-indigo-600" />
            <p className="text-sm text-gray-600 font-semibold">Email Address</p>
            <p className="text-lg font-medium break-all">{email}</p>
          </div>
        </motion.div>

        {/* Country */}
        <motion.div variants={itemVariants}>
          <div className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <FaGlobe className="text-2xl mb-2 text-indigo-600" />
            <p className="text-sm text-gray-600 font-semibold">Country</p>
            <p className="text-lg font-medium">{country}</p>
          </div>
        </motion.div>

        {/* Company (only for Business) */}
        {type === 'business' && (
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <FaBuilding className="text-2xl mb-2 text-indigo-600" />
              <p className="text-sm text-gray-600 font-semibold">Company</p>
              <p className="text-lg font-medium">{company}</p>
            </div>
          </motion.div>
        )}

        {/* Bank Information */}
       

        {/* Bank Photos Placeholder */}
        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 mt-6">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Bank Proof</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Placeholder content */}
            {Array(3).fill().map((_, index) => (
              <div key={index} className="bg-gray-200 h-48 rounded-lg flex items-center justify-center shadow-md">
                <p className="text-gray-500">Bank Image/Proof {index + 1}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default KycDetails;
