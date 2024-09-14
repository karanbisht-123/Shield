import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { openModal } from "../../lib/slice/ModalSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheck, FaUser, FaIdCard, FaEnvelope, FaLock } from "react-icons/fa";
import { setCurrentStep, submitKycData , setCurrentRoute} from "../../lib/slice/KycSlice";
import { SiCryptpad } from "react-icons/si";

// Import components
import EmailStep from "./EmailStep";
import PersonalInfoStep from "./PersonalInfoStep";
import DocumentUploadStep from "./DocumentUploadStep";
import UserRegister from "../../updateauth/components/UserRegiste";
import OTPVerificationScreen from "../../updateauth/components/OTPVerificationScreen";
import Modal from "../../helper/Modal";
import CryptoSwap from "../../components/CryptoSwap";
import PasswordCreationScreen from "./PasswordCreationScreen";


const Sidebar = ({ currentStep, mode }) => {
  const steps = {
    verification: [
      {
        icon: FaIdCard,
        title: "Verify with OTP",
        description:
          "Enter the OTP sent to your mobile number for verification.",
      },
      {
        icon: FaLock,
        title: "Create Your Password",
        description:
          "Set a strong password to secure your account. Make sure it's unique and not used elsewhere.",
      },
    ],
    login: [
      {
        icon: FaEnvelope,
        title: "Enter Email Address",
        description: "Provide your registered email to continue.",
      },
      {
        icon: FaLock,
        title: "Enter Password",
        description: "Input your password to access your account securely.",
      },
    ],
    kyc: [
      {
        icon: FaCheck,
        title: "Verify Your Information",
        description:
          "We'll need to confirm your details for security. Use your email and mobile number.",
      },
      {
        icon: SiCryptpad,
        title: "Create Order",
        description: "Let's set up your order details before proceeding.",
      },
      {
        icon: FaUser,
        title: "Provide Personal Details",
        description:
          "Please provide your personal information. Some ID documents may be needed for new customers.",
      },
      {
        icon: FaIdCard,
        title: "Submit Identity Documents",
        description:
          "Upload a valid ID, such as a driver's license, passport, or national ID.",
      },
    ],
  };

  const currentSteps = steps[mode];

  return (
    <div className="w-full lg:w-1/3 lg:bg-gradient-to-b from-blue-600 to-blue-400 lg:p-6 p-3 pt-6 shadow-2xl">
      {/* Desktop view */}
      <div className="space-y-8 lg:block hidden">
        {currentSteps.map((step, index) => (
          <motion.div
            key={index}
            className={`flex items-center space-x-4 p-4 rounded-xl transition-all ${
              index + 1 === currentStep ? "bg-white bg-opacity-20" : ""
            }`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div
              className={`rounded-full p-3 ${
                index + 1 <= currentStep ? "bg-white" : "bg-blue-500"
              }`}
            >
              <step.icon
                className={`text-2xl ${
                  index + 1 <= currentStep ? "text-blue-600" : "text-white"
                }`}
              />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">{step.title}</h3>
              <p className="text-blue-100 text-sm mt-1">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile view */}
      <div className="md:hidden lg:p-6 w-full  ">
        <div className="">
          <div className="flex items-center justify-between">
            {currentSteps.map((step, index) => (
              <React.Fragment key={index}>
                <div
                  className={`flex flex-col items-center ${
                    index + 1 <= currentStep ? "text-white" : "text-black"
                  } cursor-pointer`}
                >
                  <div
                    className={`rounded-full transition duration-500 ease-in-out h-8 w-8 flex items-center justify-center ${
                      index + 1 <= currentStep
                        ? "bg-green-600 text-White"
                        : "border-2 border-gray-300"
                    }`}
                  >
                    {index + 1 < currentStep ? (
                      <FaCheck className="w-4 h-4" />
                    ) : (
                      <span className="text-xs">{index + 1}</span>
                    )}
                  </div>
                  <div
                    className={`mt-4 text-xs ${
                      index + 1 <= currentStep ? "font-medium" : "font-normal"
                    }`}
                  >
                    {/* {step.title} */}
                  </div>
                </div>
                {index < currentSteps.length - 1 && (
                  <div
                    className={`flex-auto border-t-2 transition mb-4 ml-1 duration-500 ease-in-out ${
                      index + 1 < currentStep
                        ? "border-grenn-600"
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
  const { currentStep, errors, isValid, ...formData } = useSelector((state) => state.kyc);

  console.log( errors, 'hii i am eroors for seconde step ')
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const route = location.pathname;
  const mode =
    route === "/auth/verify"
      ? "verification"
      : route === "/auth/login"
      ? "login"
      : "kyc";



      useEffect(() => {
        const currentRoute = location.pathname.includes('/register') ? 'kyc' : 'other';
        dispatch(setCurrentRoute(currentRoute));
      }, [location, dispatch]);
    
  // Handle form submission
  const handleSubmit = async () => {
  
    setIsProcessing(true);
    setIsSubmitting(true);

    try {
      dispatch(submitKycData());

      setTimeout(() => {
        switch (mode) {
          case "verification":
            if (currentStep === 2) {
              dispatch(
                openModal({
                  link1: "/",
                  link2: "/auth/login",
                  title: "Email Verified Successfully",
                  content:
                    "Congratulations! Your Email verification is complete. You can now proceed with your account activities.",
                  confirmButtonText: "Go to Home",
                  cancelButtonText: "Login",
                  confirmButtonColor: "bg-green-600 hover:bg-green-800",
                  cancelButtonColor:
                    "bg-white text-gray-900 border border-gray-200 hover:bg-gray-100 hover:text-blue-700",
                })
              );
            }
            break;
          case "login":
            navigate("/deposite");
            break;
          case "kyc":
            dispatch(
              openModal({
                link1: "/",
                link2: "/auth/verify",
                title: "Your KYC is Done",
                content:
                  "Your KYC verification has been successfully completed.",
                confirmButtonText: "Home",
                cancelButtonText: "Verify Email",
                confirmButtonColor: "bg-green-600 hover:bg-green-800",
                cancelButtonColor:
                  "bg-white text-gray-900 border border-gray-200 hover:bg-gray-100 hover:text-blue-700",
              })
            );
            break;
          default:
            break;
        }
        setIsProcessing(false);
        setIsSubmitting(false);
        dispatch(setCurrentStep(1)); // Reset to the first step
      }, 2000);
    } catch (error) {
      console.error("Error submitting form data:", error);
      setIsProcessing(false);
      setIsSubmitting(false);
    }
  };

  // Render the appropriate step based on the current mode and step
  const renderStep = () => {
    switch (mode) {
      case "verification":
        switch (currentStep) {
          case 1:
            return <OTPVerificationScreen  />;
          case 2:
            return <PasswordCreationScreen  />;
          default:
            return null;
        }
      case "login":
        switch (currentStep) {
          case 1:
            return <EmailStep />;
          case 2:
            return <PasswordCreationScreen  />;
          default:
            return null;
        }
      case "kyc":
        switch (currentStep) {
          case 1:
            return <UserRegister errors={errors} />;
          case 2:
            return <CryptoSwap taskType="step_2" />;
          case 3:
            return <PersonalInfoStep errors={errors} />;
          case 4:
            return <DocumentUploadStep errors={errors} />;
          default:
            return null;
        }
      default:
        return null;
    }
  };

  const backgroundColors = [
    "bg-blue-50",
    "bg-green-50",
    "bg-purple-50",
    "bg-indigo-50",
  ];
  const totalSteps = mode === "kyc" ? 4 : 2;

  return (
    <>
      <Modal />
      <div className="flex flex-col lg:flex-row min-h-screen xl:bg-gray-100 pb-12">
        <Sidebar currentStep={currentStep} mode={mode} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            className={`flex-1 xl:p-6 p-3 lg:p-10 bg-white lg:bg-[${
              backgroundColors[currentStep - 1]
            }] lg:rounded-r-3xl lg:shadow-2xl`}
          >
            <div className="bg-white lg:p-8 rounded-2xl xl:shadow-lg">
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
                className={`px-6 py-3 bg-blue-600 w-full text-white rounded-full hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2 ${
                  isSubmitting  ? "opacity-50 cursor-not-allowed" : ""
                }`}
                // disabled={isSubmitting || !isValid}
              >
                {isProcessing ? (
                  <span className="flex items-center space-x-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 0116 0h-2a6 6 0 00-12 0H4z"
                      ></path>
                    </svg>
                    <span>Processing...</span>
                  </span>
                ) : (
                  <span className="w-full">
                    {currentStep === totalSteps ? "Submit" : "Next"}
                  </span>
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