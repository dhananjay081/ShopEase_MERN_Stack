import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../layout/Loader/loader";
import { useAlert } from "react-alert";

const ProtectedRoute = ({ isAdmin }) => {
  const alert = useAlert()
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

 
  if (loading || typeof isAuthenticated === "undefined" || typeof user === "undefined") {
    return <Loader/>; 
  }

  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  
  if (isAdmin && user.role !== "admin") {
    alert.error("You are not admin");
    return <Navigate to="/account"/>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
