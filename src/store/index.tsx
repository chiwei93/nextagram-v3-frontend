import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext({
  isLogin: false,
  checkIsLogin: () => {},
  loggedIn: () => {},
  loggedOut: () => {},
});

export const AppProvider: React.FC = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  //check login state
  const checkIsLogin = () => {
    //get token from local storage
    const token = localStorage.getItem('jwt_token');

    //check if there is token or not
    if (!token) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  };

  //for logging in
  const loggedIn = () => {
    setIsLogin(true);
  };

  //for logging out
  const loggedOut = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('userId');
    setIsLogin(false);
  };

  return (
    <AppContext.Provider
      value={{
        isLogin,
        checkIsLogin,
        loggedIn,
        loggedOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export default useGlobalContext;
