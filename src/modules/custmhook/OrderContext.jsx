import React, { createContext, useState, useContext } from 'react';

// Create the context
const OrderContext = createContext();

// Provider component to wrap your app
export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState(null); // Holds order status

  console.log(order, 'hii i am order i want go there')
  const createOrder = (orderData) => {
    setOrder(orderData);
  };

  return (
    <OrderContext.Provider value={{ order, createOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook to use the OrderContext in other components
export const useOrder = () => {
  return useContext(OrderContext);
};
