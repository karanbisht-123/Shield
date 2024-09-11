import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CryptoSwap from './CryptoSwap';
import { Navigate, useNavigate } from 'react-router-dom';
const HeroSection = () => {
  const [activeSection, setActiveSection] = useState("buy");
  const [currentText, setCurrentText] = useState("");
   const navigate =useNavigate()
  const textSequence = [
    "Welcome to Shield",
    "Your Best Money Transfer Partner",
    "Convert Cash to Crypto Easily",
    "Experience Fluid Finances"
  ];

  // useEffect(() => {
  //   let index = 0;
  //   const intervalId = setInterval(() => {
  //     setCurrentText(textSequence[index]);
  //     index = (index + 1) % textSequence.length;
  //   }, 3000);

  //   return () => clearInterval(intervalId);
  // }, []);

  useEffect(() => {
    let index = 1; // Start from the second item
    setCurrentText(textSequence[0]); // Immediately show the first text

    const intervalId = setInterval(() => {
      setCurrentText(textSequence[index]);
      index = (index + 1) % textSequence.length;
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className='flex flex-col lg:flex-row items-center justify-between py-12 px-4 lg:px-12 '>
      <div className="w-full pl-12 lg:w-1/2 mb-8 lg:mb-0 hidden lg:block">
        <motion.div 
          className="max-w-lg mx-auto lg:mx-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-3xl lg:text-7xl font-semibold mb-40 text-blue-700 h-20"
            key={currentText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentText}
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Convert your payments between cash and crypto with ease. Open up a world of financial possibilities today.
          </motion.p>
          <motion.button 
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            onClick={()=>navigate ('/auth/register')}
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
      <motion.div 
        className="w-full lg:w-1/2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <CryptoSwap 
          taskType="routeToVerification" 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;