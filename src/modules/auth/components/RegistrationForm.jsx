import React, { useState } from "react";
import { FaShieldAlt } from "react-icons/fa";
import ProgressBar from "./ProgressBar";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";

const MultiStepRegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    country: "",
    firstName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    cryptocurrencies: "",
    fiatCurrencies: "",
    countryIdentityName: "",
    identityNumber: "",
    identityCard: null,
    passportPhoto: null,
    passportNumber: "",
    region: "",
    postalCode: "",
  });

  const handleInputChange = (e) => {
    
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 formData={formData} handleInputChange={handleInputChange} />;
      case 2:
        return <Step2 formData={formData} handleInputChange={handleInputChange} />;
      case 3:
        return <Step3 formData={formData} handleInputChange={handleInputChange} />;
      case 4:
        return <Step4 formData={formData} handleInputChange={handleInputChange} handleFileChange={handleFileChange} />;
      case 5:
        return <Step5 formData={formData} handleInputChange={handleInputChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen lg:bg-gray-100 flex flex-col xl:px-28">
    {/* <header className="bg-white relative shadow-md">
  <div className="absolute inset-x-0 top-0 h-6 bg-white -mt-6 rounded-b-lg shadow-sm"></div>
  <div className="max-w-full mx-auto py-3 px-4 flex items-center justify-between relative z-10">

    <div className="flex items-center">
      -
    </div>

    <div className="flex items-center">
      <FaShieldAlt className="text-blue-500 text-2xl mr-2" />
      <h1 className="text-lg font-bold text-blue-500">SHIELD</h1>
    </div>
  </div>
</header> */}


      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white lg:rounded-lg overflow-hidden">
          <div className="p-2 lg:p-4">
            <div>
              
            </div>
          <ProgressBar currentStep={step} totalSteps={5} />

          
            <form className="mt-6">
              {renderStep()}
              <div className="flex justify-center mt-8">
                {/* {step > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
                  >
                    Previous
                  </button>
                )} */}
                {step < 5 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-blue-600 transition duration-300 min-w-72"
                  >
                    Next
                  </button>
                ) : (
                  <button
                        type="button"
                    // type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 min-w-72"
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MultiStepRegistrationForm;