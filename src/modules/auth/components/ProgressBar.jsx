import React from "react";

const ProgressBar = ({ currentStep, totalSteps }) => {
  const steps = ["Verify", "Personal", "KYC", "Identity", "Address"];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((stepName, index) => (
          <React.Fragment key={index}>
            <div
              className={`flex flex-col items-center ${
                index + 1 <= currentStep ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`rounded-full transition duration-500 ease-in-out h-8 w-8 flex items-center justify-center ${
                  index + 1 <= currentStep
                    ? "bg-blue-600 text-white"
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
                {stepName}
              </div>
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`flex-auto border-t-2 transition mb-4 ml-1 duration-500 ease-in-out min-w-4 ${
                  index + 1 < currentStep ? "border-blue-600" : "border-gray-300"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;