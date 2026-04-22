"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import baseurl from '../base/base';

const AdminContext = createContext(null);

const api = axios.create({
  baseURL: baseurl,
  timeout: 15000,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res => res.data,
  err => Promise.reject(new Error(err.response?.data?.message || err.message || 'Request failed'))
);

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const stored = localStorage.getItem('adminUser');
    if (token && stored) {
      try { setAdmin(JSON.parse(stored)); } catch {}
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    console.log("is geee,",email,password)
    
    const data = await api.post('/auth/login', { email, password });
    console.log("Inida")
    console.log(data)

    localStorage.setItem('adminToken', data.token);
    localStorage.setItem('adminUser', JSON.stringify({ _id: data._id, name: data.name, email: data.email }));
    setAdmin({ _id: data._id, name: data.name, email: data.email });
    return data;
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, loading, login, logout, api }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
export { api };