import React from "react";
import { FaHome, FaExchangeAlt, FaWallet, FaUser } from "react-icons/fa";

const Header = () => {
  const [activeTab, setActiveTab] = React.useState("Home");

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="bg-white text-gray-800  hidden md:flex border-b border-gray-100">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo Container */}
          <div className="logo_container flex items-center space-x-2">
            <span className="text-2xl font-bold">SHIELD</span>
          </div>

          {/* Navigation Section */}
          <nav className="navigation_section">
            <ul className="flex space-x-8">
              <li>
                <a
                  href="/"
                  className="hover:text-gray-400 transition duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/transactions"
                  className="hover:text-gray-400 transition duration-300"
                >
                  Transactions
                </a>
              </li>
              {/* <li>
                <a
                  href="#"
                  className="hover:text-gray-400 transition duration-300"
                >
                  Trade
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-400 transition duration-300"
                >
                  Wallet
                </a>
              </li> */}
              <li>
                <a
                  href="/on-off-ramp"
                  className="hover:text-gray-400 transition duration-300"
                >
                  On off Ramp
                </a>
              </li>
            </ul>
          </nav>

          {/* Header Button Container */}
          <div className="Header_button_container flex gap-4">
            {/* <button className="border border-[#2087C2] px-3 py-1.5 rounded-lg">
              Connect Wallet
            </button> */}
            <a href="/user/auth" className="border border-[#2087C2] px-3 py-1.5 rounded-lg">
              Sign Up
            </a>
          </div>
        </div>
      </header>

      {/* Bottom Navigation Bar for Mobile */}
      <footer className=" z-50 fixed bottom-0 left-0 right-0 bg-white text-gray-800 shadow-md border-t border-gray-200 md:hidden">
        <div className="flex justify-around items-center py-2">
          <a
            href="/"
            className={`flex flex-col items-center ${
              activeTab === "Home" ? "text-blue-500" : "text-gray-600"
            } transition-colors`}
            onClick={() => setActiveTab("Home")}
          >
            <FaHome className="text-2xl" />
            <span className="text-xs">Home</span>
          </a>
          <a
            href="/on-off-ramp"
            className={`flex flex-col items-center ${
              activeTab === "Trade" ? "text-blue-500" : "text-gray-600"
            } transition-colors`}
            onClick={() => setActiveTab("Trade")}
          >
            <FaExchangeAlt className="text-2xl" />
            <span className="text-xs">on of ramp</span>
          </a>
          <a
            href="/transactions"
            className={`flex flex-col items-center ${
              activeTab === "Wallet" ? "text-blue-500" : "text-gray-600"
            } transition-colors`}
            onClick={() => setActiveTab("Wallet")}
          >
            <FaWallet className="text-2xl" />
            <span className="text-xs">Transactions</span>
          </a>
          <a
            href="/user/auth"
            className={`flex flex-col items-center ${
              activeTab === "Account" ? "text-blue-500" : "text-gray-600"
            } transition-colors`}
            onClick={() => setActiveTab("Account")}
          >
            <FaUser className="text-2xl" />
            <span className="text-xs">Account</span>
          </a>
        </div>
      </footer>
    </>
  );
};

export default Header;
