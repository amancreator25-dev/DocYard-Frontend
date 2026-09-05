import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

const ProtectedRoute = () => {
  const {
    isAuthenticated,
    loading,
  } = useAuth();

  const location = useLocation();

  // Wait until authentication check is complete
  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  // Not logged in → send to login
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  // Logged in → allow route
  return <Outlet />;
};

export default ProtectedRoute;