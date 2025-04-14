// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({ token: null, user: null });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Aqui poderás implementar uma verificação do token e obter os dados do usuário, se necessário
      setAuthData({ token, user: {} });
    }
  }, []);

  const login = (token, user) => {
    localStorage.setItem('token', token);
    setAuthData({ token, user });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthData({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
