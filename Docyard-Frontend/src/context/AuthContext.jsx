import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCurrentUser,
  logoutUser,
} from "../services/auth.service.js";

import {
  hasSession,
  setSession,
  removeSession,
} from "../utils/storage.js";

// ======================================
// CREATE CONTEXT
// ======================================

const AuthContext = createContext(null);

// ======================================
// AUTH PROVIDER
// ======================================

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  // ====================================
  // LOAD CURRENT USER
  // ====================================

  const loadUser = async () => {
    try {
      setLoading(true);

      // --------------------------------
      // No frontend session
      // --------------------------------

      if (!hasSession()) {
        setUser(null);
        setIsAuthenticated(false);
        return;
      }

      // --------------------------------
      // Get current user
      //
      // Axios interceptor automatically
      // handles 401 + refresh token.
      // --------------------------------

      const response = await getCurrentUser();

      const currentUser =
        response?.data?.user ||
        response?.data ||
        response?.user;

      if (currentUser) {
        setSession();

        setUser(currentUser);
        setIsAuthenticated(true);

        return;
      }

      // --------------------------------
      // Invalid session
      // --------------------------------

      removeSession();

      setUser(null);
      setIsAuthenticated(false);

    } catch (error) {
      console.error(
        "Load User Error:",
        error
      );

      // --------------------------------
      // Axios interceptor already tried
      // refreshing the access token.
      //
      // If we reach here, the session
      // could not be restored.
      // --------------------------------

      removeSession();

      setUser(null);
      setIsAuthenticated(false);

    } finally {
      setLoading(false);
    }
  };

  // ====================================
  // LOGIN
  // ====================================

  const login = (userData) => {
    if (!userData) {
      return;
    }

    // JWTs remain inside HttpOnly cookies.
    // Only the session flag is stored locally.

    setSession();

    setUser(userData);
    setIsAuthenticated(true);
  };

  // ====================================
  // LOGOUT
  // ====================================

  const logout = async () => {
    try {
      await logoutUser();

    } catch (error) {
      console.error(
        "Logout Error:",
        error
      );

    } finally {
      // Backend clears HttpOnly cookies.
      // Frontend clears session flag.

      removeSession();

      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // ====================================
  // UPDATE USER
  // ====================================

  const updateUser = (updatedUser) => {
    if (!updatedUser) {
      return;
    }

    setUser((currentUser) => ({
      ...currentUser,
      ...updatedUser,
    }));
  };

  // ====================================
  // INITIAL AUTH CHECK
  // ====================================

  useEffect(() => {
    loadUser();
  }, []);

  // ====================================
  // CONTEXT VALUE
  // ====================================

  const value = {
    user,
    setUser,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser,
    loadUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// ======================================
// CUSTOM HOOK
// ======================================

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};

// ======================================
// EXPORT
// ======================================

export {
  AuthProvider,
  useAuth,
};

export default AuthContext;