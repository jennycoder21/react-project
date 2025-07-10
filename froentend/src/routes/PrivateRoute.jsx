import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" replace />;
  if (requiredRole && user.role !== requiredRole) return <Navigate to="/" replace />;

  return children;
};

export default PrivateRoute;
