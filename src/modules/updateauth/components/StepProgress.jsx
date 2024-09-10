
import React from "react";
import { useEffect , useState} from "react";
import { FaCheckCircle, FaUserCheck, FaDollarSign } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEmailContext } from '../../custmhook/EmailContext';
const StepProgress = ({ currentStep, setCurrentStep }) => {
  // const steps = [
  //   {
  //     label: "Verify Details",
  //     description:
  //       "Let's make sure you're real by verifying your details. If you've transacted with us before, use the same email and mobile number to checkout faster.",
  //     icon: <FaCheckCircle size={30} />,
  //   },
  //   {
  //     label: "Identity Verification",
  //     description:
  //       "For new customers, some identification documents may be required. The process should only take a couple of minutes and you’ll need to upload a photo of either a valid driver\'s license, passport, or national ID.",
  //     icon: <FaUserCheck size={30} />,
  //   },
  //   {
  //     label: "Deposit",
  //     description:
  //       "Follow the instructions to complete the transaction and receive funds in your account.",
  //     icon: <FaDollarSign size={30} />,
  //   },
  // ];
  const { isRegistered } = useEmailContext();
  const [steps, setSteps] = useState([]);


  useEffect(() => {
    // Update steps based on email registration status
    if (isRegistered) {
      setSteps([
        {
          label: 'Verify Details',
          description:
            "Let's verify your details. If you've transacted with us before, use the same email to checkout faster.",
          icon: <FaCheckCircle size={30} />,
        },
        {
          label: 'Verify OTP',
          description:
            'Please enter the one-time password (OTP) to complete the transaction and receive your funds. Follow the instructions provided to finalize the process',
          icon: <FaDollarSign size={30} />,
        },
      ]);
    } else {
      setSteps([
        {
          label: 'Verify Details',
          description:
            "Let's verify your details. Use the same email and mobile number to checkout faster.",
          icon: <FaCheckCircle size={30} />,
        },
        {
          label: 'Personal Details',
          description:
            "For new customers, some identification documents may be required. Upload a valid driver's license, passport, or national ID.",
          icon: <FaUserCheck size={30} />,
        },
        {
          label: 'Identity Verification',
          description:
            "For new customers, some identification documents may be required. Upload a valid driver's license, passport, or national ID.",
          icon: <FaUserCheck size={30} />,
        },
      ]);
    }
  }, [isRegistered]); // Dependency array includes isRegistered to update steps when it changes

  
  const handleStepClick = (index) => {
    setCurrentStep(index + 1); // Set the current step when clicked
  };

  return (
    <div className="relative flex flex-col md:flex-row md:w-1/4 bg-gradient-to-br from-[#001F90] to-[#2087C2] lg:py-20">
      {/* Desktop Sidebar */}
      <div className="hidden md:block text-white bg-gradient-to-br from-[#001F90] to-[#2087C2] w-full md:rounded-lg md:sticky md:top-0">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-1 bg-gray-300 rounded-full" />
          </div>
          <div className="flex flex-col items-center relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`flex px-3 py-1.5 gap-3 mt-4 ${
                  currentStep === index + 1
                    ? "text-blue-600 bg-white w-full cursor-pointer"
                    : "text-gray-400 cursor-pointer"
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleStepClick(index)} // Clickable steps
              >
                <motion.div
                  className={`flex items-center min-w-16 justify-center h-16 rounded-full ${
                    currentStep === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-400"
                  } mb-4`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {step.icon}
                </motion.div>
                <div>
                  <div className="text-xl font-semibold">{step.label}</div>
                  <p className="text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile View */}
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
                    {step.label}
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

export default StepProgress;
