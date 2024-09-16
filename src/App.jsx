import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./modules/components/Header";
import HeroSection from "./modules/components/HeroSection";
import Benefits from "./modules/components/Benfints";
import WhyShield from "./modules/components/Whyshield";
import WhoWeAre from "./modules/components/WhoWeAre";
import TransactionHistoryScreen from "./modules/components/TransactionHistoryScreen";
import OnOffRampScreen from "./modules/components/OnOffRampScreen";
import Deposit from "./modules/updateauth/components/Deposit";
import WalletScreen from "./modules/components/WalletScreen";
import ScrollToTop from "./modules/components/ScrollToTop";
import AuthForm from "./modules/components/AuthForm";
import KycDetails from "./modules/components/Kyc";
import KycForm from "./modules/kycauth/componts/KycForm";
import OrderList from "./modules/components/OrderList";
const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

        <Route path="/auth/register" element={<KycForm />} />

        <Route path="/auth/Login" element={<KycForm />} />

        <Route path="/auth/verify" element={<KycForm />} />
        <Route path="/transactions" element={<TransactionHistoryScreen />} />
        <Route path="/on-off-ramp" element={<OnOffRampScreen />} />
        <Route path="/account-details" element={<KycDetails />} />
        <Route path="/wallet" element={<WalletScreen />} />
        <Route path="/user/auth" element={<AuthForm />} />
        <Route path="/deposite" element={<Deposit />} />
        <Route path="/creat-order" element={<OrderList />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
