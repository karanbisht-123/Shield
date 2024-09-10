import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaGlobe, FaBuilding, FaUserTie } from 'react-icons/fa';
import { useEmailContext } from '../custmhook/EmailContext';

const KycDetails = () => {
  const { isRegistered } = useEmailContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isRegistered) {
      navigate('/verification');
    }
  }, [isRegistered, navigate]);

  if (!isRegistered) {
    return null; 
  }

  const userData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    country: "United States",
    company: "Acme Inc.",
    type: "business"
  };

  const { firstName, lastName, email, country, company, type } = userData;

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
      className="max-w-6xl  mx-auto mt-10 p-4 xl:p-8 lg:bg-gradient-to-br from-white to-gray-100 lg:rounded-xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">KYC Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div className="col-span-1 md:col-span-2" variants={itemVariants}>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 flex items-center">
            <FaUserTie className="text-2xl mr-4 text-blue-600" />
            <div>
              <p className="text-sm text-blue-600 font-semibold">Account Type</p>
              <p className="text-lg font-medium">{type === 'business' ? 'Business' : 'Individual'}</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="bg-white rounded-lg p-4 lg:shadow-sm lg:hover:shadow-md lg:transition-shadow duration-300">
            <FaUser className="text-2xl mb-2 text-indigo-600" />
            <p className="text-sm text-gray-600 font-semibold">Full Name</p>
            <p className="text-lg font-medium">{firstName} {lastName}</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="bg-white rounded-lg p-4 lg:shadow-sm lg:hover:shadow-md lg:transition-shadow duration-300">
            <FaEnvelope className="text-2xl mb-2 text-indigo-600" />
            <p className="text-sm text-gray-600 font-semibold">Email Address</p>
            <p className="text-lg font-medium break-all">{email}</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="bg-white rounded-lg p-4 lg:shadow-sm lg:hover:shadow-md lg:transition-shadow duration-300">
            <FaGlobe className="text-2xl mb-2 text-indigo-600" />
            <p className="text-sm text-gray-600 font-semibold">Country</p>
            <p className="text-lg font-medium">{country}</p>
          </div>
        </motion.div>

        {type === 'business' && (
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-lg p-4 lg:shadow-sm lg:hover:shadow-md lg:transition-shadow duration-300">
              <FaBuilding className="text-2xl mb-2 text-indigo-600" />
              <p className="text-sm text-gray-600 font-semibold">Company</p>
              <p className="text-lg font-medium">{company}</p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default KycDetails;