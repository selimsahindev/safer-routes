import React, { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getToken, setToken, removeToken } from '@/utils/AuthUtils';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const checkIsAuthenticated = () => {
  const token = getToken();
  return !!token;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const login = (token: string) => {
    setToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
    router.push('/login');
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

export const useAuth = () => React.useContext(AuthContext);
