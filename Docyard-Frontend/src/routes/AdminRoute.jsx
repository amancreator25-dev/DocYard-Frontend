import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth.js";


// ======================================
// ADMIN ROUTE
// ======================================

const AdminRoute = () => {
  const {
    user,
    loading,
    isAuthenticated,
  } = useAuth();


  // ====================================
  // AUTH CHECK LOADING
  // ====================================

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }


  // ====================================
  // NOT AUTHENTICATED
  // ====================================

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }


  // ====================================
  // NOT ADMIN
  // ====================================

  if (user?.role !== "admin") {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }


  // ====================================
  // ADMIN → ALLOW ACCESS
  // ====================================

  return <Outlet />;
};


export default AdminRoute;