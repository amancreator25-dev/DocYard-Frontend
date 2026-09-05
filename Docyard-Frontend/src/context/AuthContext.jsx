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
  getToken,
  removeToken,
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

  const [loading, setLoading] =
    useState(true);

  const [isAuthenticated, setIsAuthenticated] =
    useState(false);


  // ====================================
  // LOAD CURRENT USER
  // ====================================

  const loadUser = async () => {
    try {
      setLoading(true);

      const token = getToken();

      if (!token) {
        setUser(null);
        setIsAuthenticated(false);
        return;
      }

      const response =
        await getCurrentUser();

      const currentUser =
        response?.data?.user ||
        response?.data ||
        response?.user;

      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }

    } catch (error) {
      console.error(
        "Load User Error:",
        error
      );

      // --------------------------------
      // Try refreshing the token
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
          setUser(currentUser);
          setIsAuthenticated(true);
        } else {
          removeToken();
          setUser(null);
          setIsAuthenticated(false);
        }

      } catch (refreshError) {
        console.error(
          "Refresh Token Error:",
          refreshError
        );

        removeToken();

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
      removeToken();

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