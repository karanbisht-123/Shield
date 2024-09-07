// import React, { useState, useEffect } from "react";
// import Header from "./modules/components/Header";
// import HeroSection from "./modules/components/HeroSection";
// import Benefits from "./modules/components/Benfints";
// import WhyShield from "./modules/components/Whyshield";
// import WhoWeAre from "./modules/components/WhoWeAre";
// import MultiStepRegistrationForm from "./modules/auth/components/RegistrationForm";
// import TransactionHistoryScreen from "./modules/components/TransactionHistoryScreen";
// import OnOffRampScreen from "./modules/components/OnOffRampScreen";
// import StepProgress from "./modules/updateauth/components/StepProgress";
// import Deposit from "./modules/updateauth/components/Deposit";
// import IdentityVerification from "./modules/updateauth/components/IdentityVerification";
// import VerifyDetails from "./modules/updateauth/components/VerifyDetails";
// import WalletScreen from "./modules/components/WalletScreen";

// const MobileSection = ({ children, onNext }) => (
//   <div className="min-h-screen flex flex-col">
//     <div className="flex-grow overflow-y-auto">{children}</div>
//     <button
//       onClick={onNext}
//       className="bg-blue-500 text-white py-3 px-6 rounded-full shadow-lg fixed bottom-4 right-4"
//     >
//       Next
//     </button>
//   </div>
// );

// function App() {
//   const [currentSection, setCurrentSection] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768); // Adjust this breakpoint as needed
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const nextSection = () => {
//     setCurrentSection((prev) => (prev + 1) % 3); 
//   };

//   // const renderMobileContent = () => {
//   //   switch (currentSection) {
//   //     case 0:
//   //       return <HeroSection />;
//   //     case 1:
//   //       return <Benefits />;
//   //     case 2:
//   //       return <WhyShield />;
//   //     default:
//   //       return null;
//   //   }
//   // };

//   const [currentStep, setCurrentStep] = useState(1);

//   const nextStep = () => {
//     setCurrentStep(currentStep + 1);
//   };
//   return (
//     <>
//       <Header />
     
//         <>
//           <HeroSection />
//           <Benefits />
//           <WhyShield />
//           <WhoWeAre />
//          <TransactionHistoryScreen/>
//          <OnOffRampScreen/>
// <WalletScreen/>
//          <div className="max-w-7xl xl:flex mx-auto p-6 min-h-screen">
//       {/* Step Progress */}
//       <StepProgress currentStep={currentStep} />

//       {/* Step Components */}
//       {currentStep === 1 && <VerifyDetails nextStep={nextStep} />}
//       {currentStep === 2 && <IdentityVerification nextStep={nextStep} />}
//       {currentStep === 3 && <Deposit />}
//     </div>
//         </>

//     </>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import Header from "./modules/components/Header";
import HeroSection from "./modules/components/HeroSection";
import Benefits from "./modules/components/Benfints";
import WhyShield from "./modules/components/Whyshield";
import WhoWeAre from "./modules/components/WhoWeAre";
import MultiStepRegistrationForm from "./modules/auth/components/RegistrationForm";
import TransactionHistoryScreen from "./modules/components/TransactionHistoryScreen";
import OnOffRampScreen from "./modules/components/OnOffRampScreen";
import StepProgress from "./modules/updateauth/components/StepProgress";
import Deposit from "./modules/updateauth/components/Deposit";
import IdentityVerification from "./modules/updateauth/components/IdentityVerification";
import VerifyDetails from "./modules/updateauth/components/VerifyDetails";
import WalletScreen from "./modules/components/WalletScreen";

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Mobile breakpoints
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextStep = () => {
    setCurrentStep((prev) => (prev < 3 ? prev + 1 : 1)); // Loop back to the first step
  };

  return (
    <>
      <Header />
      <HeroSection />
      <Benefits />
      <WhyShield />
      <WhoWeAre />
      <div className="max-w-7xl xl:flex mx-auto p-6 min-h-screen py-10">
        {/* Step Progress */}
        <StepProgress currentStep={currentStep} setCurrentStep={setCurrentStep} />

        {/* Step Components */}
        {currentStep === 1 && <VerifyDetails nextStep={nextStep} />}
        {currentStep === 2 && <IdentityVerification nextStep={nextStep} />}
        {currentStep === 3 && <Deposit nextStep={nextStep} />}
      </div>

      <TransactionHistoryScreen />
      <OnOffRampScreen />
      {/* <WalletScreen /> */}

   
      {/* Mobile Next Button */}
      {isMobile && (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={nextStep}
            className="bg-blue-500 text-white py-3 px-6 rounded-full shadow-lg"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default App;
