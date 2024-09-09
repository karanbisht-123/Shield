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
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
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
import VerifyEMailDetails from "./modules/updateauth/components/VerifyEmailDetails";
import WalletScreen from "./modules/components/WalletScreen";
import ScrollToTop from "./modules/components/ScrollToTop";
import AuthForm from "./modules/components/AuthForm";
import VerifyUserDetails from "./modules/updateauth/components/VerifyuserDetails";
import OTPVerificationScreen from "./modules/updateauth/components/OTPVerificationScreen ";
import CryptoSwap from "./modules/components/CryptoSwap";
import BankWalletTabs from "./modules/components/BankWalletTabs";
const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isEmailRegistered, setIsEmailRegistered] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Mobile breakpoints
    };

    const checkEmailRegistration = () => {
      const email = localStorage.getItem('registeredEmail');
      if (email) {
        setIsEmailRegistered(true);
        // setCurrentStep(2);  // Skip to OTP verification if email exists
      } else {
        setIsEmailRegistered(false);
      }
    };

    checkMobile();
    checkEmailRegistration();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextStep = () => {
    // For 2 steps, go to the OTP verification and email verification only
    if (isEmailRegistered) {
      setCurrentStep((prev) => (prev < 2 ? prev + 1 : 1));
    } else {
      // For 3 steps, include VerifyUserDetails and IdentityVerification
      setCurrentStep((prev) => (prev < 3 ? prev + 1 : 1));
    }
  };

  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <Benefits />
              <WhyShield />
              <WhoWeAre />
            </>
          }
        />
        <Route path="/registration" element={<MultiStepRegistrationForm />} />
        <Route
          path="/verification"
          element={
            <div className="max-w-7xl xl:flex mx-auto px-6 min-h-screen">
              <StepProgress
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                totalSteps={isEmailRegistered ? 2 : 3} 
              />
              {currentStep === 1 && <VerifyEMailDetails nextStep={nextStep} />}
              {isEmailRegistered ? (
                <>
                  {currentStep === 2 && <OTPVerificationScreen nextStep={nextStep} />}
                </>
              ) : (
                <>
                  {currentStep === 2 && <VerifyUserDetails nextStep={nextStep} />}
                  {currentStep === 3 && <IdentityVerification nextStep={nextStep} />}
                </>
              )}
            </div>
          }
        />
        <Route path="/transactions" element={<TransactionHistoryScreen />} />
        <Route path="/on-off-ramp" element={<OnOffRampScreen />} />
        <Route path="/bank-details" element={<BankWalletTabs />} />
        <Route path="/wallet" element={<WalletScreen />} />
        <Route path="/user/auth" element={<AuthForm />} />
        <Route path='/deposite' element ={<Deposit/>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;