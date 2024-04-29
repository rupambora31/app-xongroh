import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useGetCurrentUserQuery } from "../store/slices/authApiSlice";

const AuthLayout = () => {
  const { data, isLoading, isError } = useGetCurrentUserQuery();

  if (isLoading) {
    return <div className="items-center">Loading...</div>; // Consider using a more sophisticated loading component
  }

  if (isError || !data) {
    // Enhance error handling, e.g., show an error message or redirect to an error page
    console.log("An error occurred while fetching user data.");
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AuthLayout;
