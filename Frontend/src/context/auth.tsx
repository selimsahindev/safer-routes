import React, { createContext, useEffect, useState } from 'react';
import cookie from 'cookie';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

interface Props {
  children: React.ReactNode;
}

const checkIsAuthenticated = () => {
  const token = cookie.parse(document.cookie).token;

  // TODO: check if token is valid

  if (token) {
    return true;
  } else {
    return false;
  }
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const isAuthenticated = checkIsAuthenticated();
    setIsAuthenticated(isAuthenticated);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext);

export { useAuth };
