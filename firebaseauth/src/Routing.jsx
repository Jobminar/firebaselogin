import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/LoginComponent";
import Home from "./components/HomeComponent";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

const Routing = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      {/* Fallback route for unmatched paths */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default Routing;
