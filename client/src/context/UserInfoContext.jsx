import React, { createContext, useState, useEffect } from 'react';

export const UserInfoContext = createContext();

const UserInfoProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem('username'));

  //checks if user is logged in and updated isLoggedIn
  useEffect(() => {
    if (localStorage.getItem('username') && localStorage.getItem('token')) {
      setIsLoggedIn(true);
    } else {
      //logs out user if there is missing values in localStorage
      setIsLoggedIn(false);
      setUsername('');
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    }
  }, []);

  const contextValues = { isLoggedIn, setIsLoggedIn, username, setUsername };

  return (
    <UserInfoContext.Provider value={contextValues}>
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoProvider;
