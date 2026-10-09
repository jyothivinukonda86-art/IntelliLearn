import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check saved credentials in localStorage on initial mount
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');

    if (token && email && role) {
      setUser({ token, email, role });
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    setError(null);
    try {
      const data = await authService.login(credentials);
      // data contains: { token, email, role }
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email);
      localStorage.setItem('role', data.role);
      setUser({
        token: data.token,
        email: data.email,
        role: data.role,
      });
      return data;
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        (typeof err.response?.data === 'string' ? err.response?.data : null) ||
        'Login failed. Please check your credentials.';
      setError(msg);
      throw new Error(msg);
    }
  };

  const register = async (userData) => {
    setError(null);
    try {
      const msg = await authService.register(userData);
      return msg;
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        (typeof err.response?.data === 'string' ? err.response?.data : null) ||
        'Registration failed. Please try again.';
      setError(msg);
      throw new Error(msg);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    setUser(null);
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user?.token,
    isAdmin: user?.role === 'ADMIN',
    isStudent: user?.role === 'STUDENT',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
