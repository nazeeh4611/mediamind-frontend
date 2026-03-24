import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminProvider, useAdmin } from './Admincontext';


import AdminLayout from './Adminlayout';
import AdminDashboard from '../pages/Admindashboard';
import AdminWorks from '../pages/Adminworks';
import AdminWorkForm from '../pages/Adminworkform';
import AdminLogin from './Adminlogin';

function ProtectedRoute({ children }) {
  const { admin, loading } = useAdmin();

  if (loading) return <div>Loading...</div>;

  return admin ? children : <Navigate to="/admin/login" replace />;
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="works" element={<AdminWorks />} />
        <Route path="works/new" element={<AdminWorkForm />} />
        <Route path="works/:id/edit" element={<AdminWorkForm />} />
      </Route>
    </Routes>
  );
}

export default function AdminApp() {
  return (
    <AdminProvider>
      <AdminRoutes />
    </AdminProvider>
  );
}