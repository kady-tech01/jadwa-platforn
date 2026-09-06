import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // جلب بيانات الملف الشخصي عند تحميل التطبيق
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const res = await api.get('auth/profile/');
          setUser(res.data);
        } catch (error) {
          console.error("خطأ في جلب الملف الشخصي:", error);
          logout();
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  // تسجيل الدخول
  const login = async (username, password) => {
    const res = await api.post('auth/login/', { username, password });
    localStorage.setItem('access_token', res.data.access);
    localStorage.setItem('refresh_token', res.data.refresh);
    
    // جلب بيانات المستخدم بعد تسجيل الدخول
    const profileRes = await api.get('auth/profile/');
    setUser(profileRes.data);
    return profileRes.data;
  };

  // إنشاء حساب جديد
  const register = async (userData) => {
    await api.post('auth/register/', userData);
    return login(userData.username, userData.password);
  };

  // تسجيل الخروج
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};