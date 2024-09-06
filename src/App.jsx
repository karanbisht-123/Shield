import React, { useState, useEffect } from "react";
import Header from "./modules/components/Header";
import HeroSection from "./modules/components/HeroSection";
import Benefits from "./modules/components/Benfints";
import WhyShield from "./modules/components/Whyshield";
import WhoWeAre from "./modules/components/WhoWeAre";
import MultiStepRegistrationForm from "./modules/auth/components/RegistrationForm";
import TransactionHistoryScreen from "./modules/components/TransactionHistoryScreen";
import OnOffRampScreen from "./modules/components/OnOffRampScreen";
const MobileSection = ({ children, onNext }) => (
  <div className="min-h-screen flex flex-col">
    <div className="flex-grow overflow-y-auto">{children}</div>
    <button
      onClick={onNext}
      className="bg-blue-500 text-white py-3 px-6 rounded-full shadow-lg fixed bottom-4 right-4"
    >
      Next
    </button>
  </div>
);

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Adjust this breakpoint as needed
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextSection = () => {
    setCurrentSection((prev) => (prev + 1) % 3); 
  };

  // const renderMobileContent = () => {
  //   switch (currentSection) {
  //     case 0:
  //       return <HeroSection />;
  //     case 1:
  //       return <Benefits />;
  //     case 2:
  //       return <WhyShield />;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <>
      <Header />
     
        <>
          <HeroSection />
          <Benefits />
          <WhyShield />
          <WhoWeAre />
     
         <MultiStepRegistrationForm/>
         <TransactionHistoryScreen/>
         <OnOffRampScreen/>
        </>

    </>
  );
}

export default App;
