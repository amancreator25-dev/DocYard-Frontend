import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCurrentUser,
  logoutUser,
  refreshAccessToken,
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
      // No frontend session flag
      // means there is no login session
      // to restore.
      // --------------------------------

      if (!hasSession()) {
        setUser(null);
        setIsAuthenticated(false);
        return;
      }

      // --------------------------------
      // Check current access token
      // through the HttpOnly cookie.
      // --------------------------------

      const response = await getCurrentUser();

      const currentUser =
        response?.data?.user ||
        response?.data ||
        response?.user;

      if (currentUser) {
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
      // Access token may have expired.
      // Try refresh token.
      // --------------------------------

      try {
        await refreshAccessToken();

        const response =
          await getCurrentUser();

        const currentUser =
          response?.data?.user ||
          response?.data ||
          response?.user;

        if (currentUser) {
          setSession();

          setUser(currentUser);
          setIsAuthenticated(true);
        } else {
          removeSession();

          setUser(null);
          setIsAuthenticated(false);
        }

      } catch (refreshError) {
        console.error(
          "Refresh Token Error:",
          refreshError
        );

        // --------------------------------
        // Refresh token is invalid/expired.
        // --------------------------------

        removeSession();

        setUser(null);
        setIsAuthenticated(false);
      }

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

    // Only the session flag is stored
    // locally. JWTs remain HttpOnly cookies.

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
      // Frontend clears only session flag.

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
  const context =
    useContext(AuthContext);

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