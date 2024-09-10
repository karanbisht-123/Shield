import React, { createContext, useState, useContext } from 'react';

// Create a context
const EmailContext = createContext();

// Create a provider component
export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  // Simulate an email check function
  const checkEmailInApp = (emailToCheck) => {
    // Simulate checking if the email exists in some database or localStorage
    const registeredEmails = ['test@example.com', 'user@example.com'];
    
    // Check if the email is in registeredEmails or in localStorage
    const isEmailRegistered = registeredEmails.includes(emailToCheck) || 
      localStorage.getItem('registeredEmail') === emailToCheck;
    
    setIsRegistered(isEmailRegistered);
  };

  return (
    <EmailContext.Provider value={{ email, setEmail, isRegistered, checkEmailInApp }}>
      {children}
    </EmailContext.Provider>
  );
};

// Hook to use the email context in components
export const useEmailContext = () => useContext(EmailContext);
