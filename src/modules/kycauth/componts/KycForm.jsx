import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { openModal } from '../../lib/slice/ModalSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheck, FaUser, FaIdCard, FaArrowRight, FaTimes } from 'react-icons/fa';
import { setCurrentStep } from '../../lib/slice/KycSlice';
import EmailStep from './EmailStep';
import PersonalInfoStep from './PersonalInfoStep';
import DocumentUploadStep from './DocumentUploadStep';
import UserRegister from '../../updateauth/components/UserRegiste';
import OTPVerificationScreen from '../../updateauth/components/OTPVerificationScreen ';
import Modal from '../../helper/Modal';

// Sidebar Component
const Sidebar = ({ currentStep, isVerificationMode }) => {
  const steps = isVerificationMode
    ? [
        { icon: FaCheck, title: 'Verify Details', description: "Let's verify your details. Use the same email and mobile number to checkout faster." },
        { icon: FaIdCard, title: 'OTP Verification', description: 'Enter the OTP sent to your mobile number.' },
      ]
    : [
        { icon: FaCheck, title: 'Verify Details', description: "Let's verify your details. Use the same email and mobile number to checkout faster." },
        { icon: FaUser, title: 'Personal Details', description: 'For new customers, some identification documents may be required.' },
        { icon: FaIdCard, title: 'Identity Verification', description: "Upload a valid driver's license, passport, or national ID." },
      ];

  return (
    <div className="w-full lg:w-1/3  lg:bg-gradient-to-b from-blue-600 to-blue-400 p-6 shadow-2xl">
      <div className="space-y-8 lg:block hidden">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className={`flex items-center space-x-4 p-4 rounded-xl transition-all ${index + 1 === currentStep ? 'bg-white bg-opacity-20' : ''}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className={`rounded-full p-3 ${index + 1 <= currentStep ? 'bg-white' : 'bg-blue-500'}`}>
              <step.icon className={`text-2xl ${index + 1 <= currentStep ? 'text-blue-600' : 'text-white'}`} />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">{step.title}</h3>
              <p className="text-blue-100 text-sm mt-1">{step.description}</p>
            </div>
          </motion.div>
        ))}



      </div>

      <div className="md:hidden lg:p-6 p-2 py-6 bg-white">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <div
                  className={`flex flex-col items-center ${
                    index + 1 <= currentStep ? "text-blue-600" : "text-black"
                  } cursor-pointer`}
                  onClick={() => handleStepClick(index)}
                >
                  <div
                    className={`rounded-full transition duration-500 ease-in-out h-8 w-8 flex items-center justify-center ${
                      index + 1 <= currentStep
                        ? "bg-blue-600 text-black"
                        : "border-2 border-gray-300"
                    }`}
                  >
                    {index + 1 < currentStep ? (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    ) : (
                      <span className="text-xs">{index + 1}</span>
                    )}
                  </div>
                  <div
                    className={`mt-2 text-xs ${
                      index + 1 <= currentStep ? "font-medium" : "font-normal"
                    }`}
                  >
                    {step.title}

                   
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-auto border-t-2 transition mb-4 ml-1 duration-500 ease-in-out ${
                      index + 1 < currentStep
                        ? "border-blue-600"
                        : "border-gray-300"
                    }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main KYC Form Component
const KycForm = () => {
  const dispatch = useDispatch();
  const { currentStep, ...formData } = useSelector((state) => state.kyc);
  const location = useLocation();
  const navigate = useNavigate();  // For redirection
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const route = location.pathname;
  console.log(route, '------- hii i am route')
  const isVerificationMode = route === '/auth/verify';


  const handleSubmit = async () => {
    setIsProcessing(true); // Show "Processing..." and disable button
    setIsSubmitting(true);
  
    try {
      localStorage.setItem('kycFormData', JSON.stringify(formData));
      console.log('Form data stored successfully in local storage');
  
      // Simulate processing delay
      setTimeout(() => {
        if (isVerificationMode && currentStep === 2) {
          // Redirect after OTP verification
          navigate('/deposite');  
        } else {
          dispatch(
            openModal({
              link1: '/',
              link2: '/auth/verify',
              title: 'Your KYC is Done',
              content: 'Your KYC verification has been successfully completed.',
              confirmButtonText: 'Home',
              cancelButtonText: 'verify Email',
              confirmButtonColor: 'bg-green-600 hover:bg-green-800',
              cancelButtonColor: 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-100 hover:text-blue-700',
              // confirmButtonIcon: <FaCheck />,
              // cancelButtonIcon: <FaTimes />,
              // onConfirm: () => navigate('/'), 
              // onCancel: () => navigate('/auth/verify'),  
            })
          );
        }
        setIsProcessing(false); 
        setIsSubmitting(false);
        // Optionally reset the current step here if needed
        dispatch(setCurrentStep(1)); // Reset to the first step or adjust as needed
      }, 2000); 
    } catch (error) {
      console.error('Error storing form data:', error);
      setIsProcessing(false);
      setIsSubmitting(false);
    }
  };
  
  const renderStep = () => {
    if (isVerificationMode) {
      console.log("Verification Mode");
      switch (currentStep) {
        case 1:
          console.log("Rendering EmailStep");
          return <EmailStep />;
        case 2:
          console.log("Rendering OTPVerificationScreen");
          return <OTPVerificationScreen />;
        default:
          console.log("Unknown step in verification mode");
          return null;
      }
    } else {
      console.log("Registration Mode");
      switch (currentStep) {
        case 1:
          console.log("Rendering UserRegister");
          return <UserRegister />;
        case 2:
          console.log("Rendering PersonalInfoStep");
          return <PersonalInfoStep />;
        case 3:
          console.log("Rendering DocumentUploadStep");
          return <DocumentUploadStep />;
        default:
          console.log("Unknown step in registration mode");
          return null;
      }
    }
  };
  
  const backgroundColors = ['bg-blue-50', 'bg-green-50', 'bg-purple-50'];
  const totalSteps = isVerificationMode ? 2 : 3;

  return (
    <>
      <Modal />

      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
        <Sidebar currentStep={currentStep} isVerificationMode={isVerificationMode} />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className={`flex-1 p-6 lg:p-10 ${backgroundColors[currentStep - 1]} lg:rounded-r-3xl shadow-2xl`}
          >
            <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg">
              {renderStep()}
            </div>
            <div className="mt-8 flex justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (currentStep === totalSteps) {
                    handleSubmit();
                  } else {
                    dispatch(setCurrentStep(currentStep + 1));
                  }
                }}
                className={`px-6 py-3 bg-blue-600 w-full text-white rounded-full hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                {isProcessing ? (
                  <span className="flex items-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0h-2a6 6 0 00-12 0H4z"></path>
                    </svg>
                    <span>Processing...</span>
                  </span>
                ) : (
                  <span className='w-full'>{currentStep === totalSteps ? 'Submit' : 'Next'}</span>
                )}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default KycForm;
