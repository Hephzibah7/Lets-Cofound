// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // // Function to set userId in context state
  // const login = (userId) => {
  //   setUserId(userId);
  //   setIsLoggedIn(true);
  // };

  // Other context values and functions

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

