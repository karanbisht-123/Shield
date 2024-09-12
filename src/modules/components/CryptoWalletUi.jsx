import React, { useState , useEffect } from "react";
import { useOrder } from "../custmhook/OrderContext";
import {
  FaBitcoin,
  FaChevronDown,
  FaUniversity,
  FaWallet,
  FaExchangeAlt,
} from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import CryptoSwap from "./CryptoSwap";

const CryptoWalletUI = () => {
  const [amount, setAmount] = useState("0.00128615");
  const [receiveAmount, setReceiveAmount] = useState("100");
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [selectedFiat, setSelectedFiat] = useState("USD");
  const [selectedBlockchain, setSelectedBlockchain] = useState("Bitcoin");
 const [orderType, setOrdeType] = useState("buy")
 const [activeSection, setActiveSection] = useState("buy");

  const { order } = useOrder();

  useEffect(() => {
    if (order) {
        setOrdeType(order.type);
    }
  }, [order]);
  console.log(order, 'hii i am order')
  // Simulated wallet and bank details
  const walletDetails = {
    address: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
    balance: "0.05231456 BTC",
  };

  const bankDetails = {
    AccountName: "John Doe",
    AccountNumber: "**** **** **** 1234",
    BankName: "Example Bank",
    RoutingNumber: "66272781919",
    SwiftCode: "CHASUS33",
    BankAddress: "123 Financial Street New York NY 1004",
  };

  // Determine what to show based on order.type
  console.log(orderType,' hii i am orderType')
  const showDetails = activeSection === "buy" ? "bank" : "wallet";

  return (
  
    <div className="">
      <div className="flex flex-col lg:flex-row lg:space-x-6 mt-6 lg:mt-0">
        <CryptoSwap taskType="logOrder" activeSection={activeSection}  setActiveSection={setActiveSection} />
      </div>
    </div>
  );
};

export default CryptoWalletUI;
