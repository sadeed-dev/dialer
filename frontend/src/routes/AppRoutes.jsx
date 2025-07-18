import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import Leads from "../pages/admin/leads/Leads";
import UserPage from "../components/admin/user/UserPage";
import AdminNavbar from "../components/layout/AdminNavbar";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminNavbar />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="leads" element={<Leads />} />
        <Route path="users" element={<UserPage />} />
      </Route>
    </Routes>
  );
}
