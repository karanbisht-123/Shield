import React from "react";
import { FaHome, FaExchangeAlt, FaWallet, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [activeTab, setActiveTab] = React.useState("Home");
  const navigate = useNavigate(); // Use navigate for redirection

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="bg-white text-gray-800 hidden md:flex border-b border-gray-100">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo Container */}
          <div className="logo_container flex items-center space-x-2">
            <span className="text-2xl font-bold">SHIELD</span>
          </div>

          {/* Navigation Section */}
          <nav className="navigation_section">
            <ul className="flex space-x-8">
              <li>
                <button
                  onClick={() => navigate("/")}
                  className="hover:text-gray-400 transition duration-300"
                >
                  Home
                </button>
              </li>
              {/* <li>
                <button
                  onClick={() => navigate("/transactions")}
                  className="hover:text-gray-400 transition duration-300"
                >
                  Transactions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/on-off-ramp")}
                  className="hover:text-gray-400 transition duration-300"
                >
                  On off Ramp
                </button>
              </li> */}
            </ul>
          </nav>

          {/* Header Button Container */}
          <div className="Header_button_container flex gap-4">
            {/* <button
              onClick={() => navigate("/user/auth")}
              className="border border-[#2087C2] px-3 py-1.5 rounded-lg"
            >
              Sign Up
            </button> */}
          </div>
        </div>
      </header>

      {/* Bottom Navigation Bar for Mobile */}
      <footer className="z-50 fixed bottom-0 left-0 right-0 bg-white text-gray-800 shadow-md border-t border-gray-200 md:hidden">
        <div className="flex justify-around items-center py-2">
          <button
            className={`flex flex-col items-center ${
              activeTab === "Home" ? "text-blue-500" : "text-gray-600"
            } transition-colors`}
            onClick={() => {
              setActiveTab("Home");
              navigate("/");
            }}
          >
            <FaHome className="text-2xl" />
            <span className="text-xs">Home</span>
          </button>
          {/* <button
            className={`flex flex-col items-center ${
              activeTab === "Trade" ? "text-blue-500" : "text-gray-600"
            } transition-colors`}
            onClick={() => {
              setActiveTab("Trade");
              navigate("/on-off-ramp");
            }}
          >
            <FaExchangeAlt className="text-2xl" />
            <span className="text-xs">On off ramp</span>
          </button>
          <button
            className={`flex flex-col items-center ${
              activeTab === "Wallet" ? "text-blue-500" : "text-gray-600"
            } transition-colors`}
            onClick={() => {
              setActiveTab("Wallet");
              navigate("/transactions");
            }}
          >
            <FaWallet className="text-2xl" />
            <span className="text-xs">Transactions</span>
          </button>
          <button
            className={`flex flex-col items-center ${
              activeTab === "Account" ? "text-blue-500" : "text-gray-600"
            } transition-colors`}
            onClick={() => {
              setActiveTab("Account");
              navigate("/user/auth");
            }}
          >
            <FaUser className="text-2xl" />
            <span className="text-xs">Account</span>
          </button> */}
        </div>
      </footer>
    </>
  );
};

export default Header;
