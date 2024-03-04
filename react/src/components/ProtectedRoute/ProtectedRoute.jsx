import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = true;
  if (user) {
  return children;
  }
  return <Navigate to="/login" />;
}
