// import React, { useState } from "react";
// import { useOrder } from "../custmhook/OrderContext";
// import {
//   FaBitcoin,
//   FaChevronDown,
//   FaUniversity,
//   FaWallet,
//   FaExchangeAlt,
// } from "react-icons/fa";
// import { FaInfoCircle } from "react-icons/fa";
// import CryptoSwap from "./CryptoSwap";



// const CryptoWalletUI = () => {
//   const [mode, setMode] = useState("sell");
//   const [amount, setAmount] = useState("0.00128615");
//   const [receiveAmount, setReceiveAmount] = useState("100");
//   const [selectedCrypto, setSelectedCrypto] = useState("BTC");
//   const [selectedFiat, setSelectedFiat] = useState("USD");
//   const [selectedBlockchain, setSelectedBlockchain] = useState("Bitcoin");
//   const [showDetails, setShowDetails] = useState("wallet"); 


 
//   const { order } = useOrder(); 

//   order.type


//   const walletDetails = {
//     address: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
//     balance: "0.05231456 BTC",
//   };

//   const bankDetails = {
//     AccountName: "John Doe",
//     AccountNumber: "**** **** **** 1234",
//     BankName: "Example Bank",
//     RoutingNumber: "66272781919",
//     SwiftCode: "CHASUS33",
//     BankAddreess: "123 Financial Street New York NY 1004",
//   };

//   return (
  
//     <div className="pb-20 xl:pb-6 xl:my-12 max-w-6xl mx-auto bg-gradient-to-br from-[#001F90] to-[#2087C2] xl:rounded-xl shadow-lg xl:p-6 p-2 text-white">
//       {/* <div className="flex mb-6 bg-white bg-opacity-20 rounded-lg">
//         <button
//           className={`flex-1 py-2 rounded-l-lg  ${
//             mode === "buy"
//               ? "bg-white text-blue-600"
//               : "text-white hover:bg-white hover:bg-opacity-10"
//           }`}
//           onClick={() => {
//             setMode("buy");
//             setShowDetails("bank");
//           }}
//         >
//           Buy coins
//         </button>
//         <button
//           className={`flex-1 py-2 rounded-r-lg  ${
//             mode === "sell"
//               ? "bg-white text-blue-600"
//               : "text-white hover:bg-white hover:bg-opacity-10"
//           }`}
//           onClick={() => {
//             setMode("sell");
//             setShowDetails("wallet");
//           }}
//         >
//           Sell coins
//         </button>
//       </div> */}


     
//       <div className="flex flex-col lg:flex-row lg:space-x-6 mt-6 lg:mt-0">
//         {/* <div className="w-full lf:w-1/2 space-y-4">
//           <div className=" bg-white bg-opacity-20 rounded-lg p-3">
//             <div className="text-sm text-gray-300 mb-1">
//               {mode === "sell" ? "Sell" : "Buy"}
//             </div>
//             <div className="flex justify-between items-center">
//               <input
//                 type="text"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 className="bg-transparent text-xl w-2/3 focus:outline-none"
//               />
//               <div className="flex items-center bg-blue-700 rounded-full px-3 py-1">
//                 <FaBitcoin className="text-yellow-500 mr-2" />
//                 <span>{selectedCrypto}</span>
//                 <FaChevronDown className="ml-2" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white bg-opacity-20 rounded-lg p-3">
//             <div className="text-sm text-gray-300 mb-1">Receive</div>
//             <div className="flex justify-between items-center">
//               <input
//                 type="text"
//                 value={receiveAmount}
//                 onChange={(e) => setReceiveAmount(e.target.value)}
//                 className="bg-transparent text-xl w-2/3 focus:outline-none"
//               />
//               <div className="flex items-center bg-blue-700 rounded-full px-3 py-1">
            
//                 <span>{selectedFiat}</span>
//                 <FaChevronDown className="ml-2" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white bg-opacity-20 rounded-lg p-3">
//             <div className="text-sm text-gray-300 mb-1">
//               Selected blockchain
//             </div>
//             <div className="flex justify-between items-center">
//               <span>{selectedBlockchain}</span>
//               <FaChevronDown />
//             </div>
//           </div>

//           <div className="bg-white bg-opacity-20 rounded-lg p-3">
//             <div className="text-sm text-gray-300 mb-1">Payment method</div>
//             <div className="bg-blue-600 opacity-80  w-52 lg:w-1/3 rounded-lg p-2 lg:py-4 flex items-center">
//               <FaUniversity className="mr-2"  size={40}/>
//               <div>
//                 <div>Bank Transfer</div>
//                 <div className="text-xs text-gray-300">Gateway Fee 0%</div>
//               </div>
//             </div>
//           </div>

//           <button className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-lg font-semibold">
//             Create Order
//           </button>
//         </div> */}

//         <CryptoSwap taskType="logOrder" />
       
//         <div className="w-full lf:w-1/2  mt-10 xl:mt-0 space-y-4 bg-white bg-opacity-20 rounded-lg p-4">
//           <h2 className="text-xl font-semibold mb-4 flex items-center">
//             {showDetails === "wallet" ? (
//               <>
//                 <FaWallet className="mr-2" /> Wallet Details
//               </>
//             ) : (
//               <>
//                 <FaUniversity className="mr-2" /> Bank Details
//               </>
//             )}
//           </h2>
//           {showDetails === "wallet" ? (
//             <div>
//               <p className="mb-2 overflow-x-auto">
//                 <span className="font-semibold ">Address:</span>{" "}
//                 {walletDetails.address}
//               </p>
//               <p>
//                 <span className="font-semibold">Balance:</span>{" "}
//                 {walletDetails.balance}
//               </p>
//             </div>
//           ) : (
//             <div>
//               <p className="mb-2">
//                 <span className="font-semibold">Account Name:</span>{" "}
//                 {bankDetails.AccountName}
//               </p>
//               <p className="mb-2">
//                 <span className="font-semibold">Account Number:</span>{" "}
//                 {bankDetails.AccountNumber}
//               </p>
//               <p className="mb-2">
//                 <span className="font-semibold">Bank Name:</span>{" "}
//                 {bankDetails.BankName}
//               </p>
//               <p className="mb-2">
//                 <span className="font-semibold">Routing Number:</span>{" "}
//                 {bankDetails.RoutingNumber}
//               </p>
//               <p className="mb-2">
//                 <span className="font-semibold">Swift Code:</span>{" "}
//                 {bankDetails.SwiftCode}
//               </p>
//               <p className="mb-2">
//                 <span className="font-semibold">Bank Addreess:</span>{" "}
//                 {bankDetails.BankAddreess}
//               </p>
//             </div>
//           )}

//           <div className="flex flex-col text-start text-balance gap-2 items-start lg:flex-row lg:items-center">
//             <FaInfoCircle className=" text-gray-300" size={25} />
//             <p className="text-balance text-start text-white">
//               Please ensure all details are correct before initiating a
//               transaction
//             </p>
//           </div>
//           <button
//             className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold flex items-center justify-center"
//             onClick={() =>
//               setShowDetails(showDetails === "wallet" ? "bank" : "wallet")
//             }
//           >
//             <FaExchangeAlt className="mr-2" /> Switch to{" "}
//             {showDetails === "wallet" ? "Bank" : "Wallet"} Details
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CryptoWalletUI;



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
  
    <div className="pb-20 xl:pb-6 xl:my-12 max-w-6xl mx-auto bg-gradient-to-br from-[#001F90] to-[#2087C2] xl:rounded-xl shadow-lg xl:p-6 p-2 text-white">
      <div className="flex flex-col lg:flex-row lg:space-x-6 mt-6 lg:mt-0">
        <CryptoSwap taskType="logOrder" activeSection={activeSection}  setActiveSection={setActiveSection} />
        <div className="w-full lg:w-1/2 mt-8  space-y-4 bg-white bg-opacity-20 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            {showDetails === "wallet" ? (
              <>
                <FaWallet className="mr-2" /> Wallet Details
              </>
            ) : (
              <>
                <FaUniversity className="mr-2" /> Bank Details
              </>
            )}
          </h2>
          
          {showDetails === "wallet" ? (
            <div>
              <p className="mb-2 overflow-x-auto">
                <span className="font-semibold">Address:</span> {walletDetails.address}
              </p>
              <p>
                <span className="font-semibold">Balance:</span> {walletDetails.balance}
              </p>
            </div>
          ) : (
            <div>
              <p className="mb-2">
                <span className="font-semibold">Account Name:</span> {bankDetails.AccountName}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Account Number:</span> {bankDetails.AccountNumber}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Bank Name:</span> {bankDetails.BankName}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Routing Number:</span> {bankDetails.RoutingNumber}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Swift Code:</span> {bankDetails.SwiftCode}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Bank Address:</span> {bankDetails.BankAddress}
              </p>
            </div>
          )}

          <div className="flex flex-col text-start text-balance gap-2 items-start lg:flex-row lg:items-center">
            <FaInfoCircle className="text-gray-300" size={25} />
            <p className="text-balance text-start text-white">
              Please ensure all details are correct before initiating a transaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoWalletUI;
