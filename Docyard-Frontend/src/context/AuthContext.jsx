import {
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  changePassword,
  updateProfile,
} from "../services/auth.service.js";

import {
  getToken,
  removeToken,
} from "../utils/storage.js";


// ======================================
// CREATE CONTEXT
// ======================================

export const AuthContext = createContext(null);


// ======================================
// AUTH PROVIDER
// ======================================

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] =
    useState(false);


  // ======================================
  // GET CURRENT USER
  // ======================================

  const fetchCurrentUser = useCallback(
    async () => {
      try {
        const token = getToken();

        if (!token) {
          setUser(null);
          setIsAuthenticated(false);
          return;
        }

        const response = await getCurrentUser();

        const currentUser =
          response?.data?.user ||
          response?.data ||
          response?.user ||
          null;

        if (currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error(
          "Fetch Current User Error:",
          error
        );

        removeToken();

        setUser(null);
        setIsAuthenticated(false);
      }
    },
    []
  );


  // ======================================
  // INITIAL AUTH CHECK
  // ======================================

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await fetchCurrentUser();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [fetchCurrentUser]);


  // ======================================
  // REGISTER
  // ======================================

  const register = async (userData) => {
    const response = await registerUser(userData);

    return response;
  };


  // ======================================
  // LOGIN
  // ======================================

  const login = async (credentials) => {
    const response = await loginUser(credentials);

    const loggedInUser =
      response?.data?.user ||
      response?.user ||
      null;

    if (loggedInUser) {
      setUser(loggedInUser);
    }

    setIsAuthenticated(true);

    return response;
  };


  // ======================================
  // LOGOUT
  // ======================================

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      removeToken();
    }
  };


  // ======================================
  // CHANGE PASSWORD
  // ======================================

  const updatePassword = async (passwordData) => {
    const response =
      await changePassword(passwordData);

    return response;
  };


  // ======================================
  // UPDATE PROFILE
  // ======================================

  const editProfile = async (profileData) => {
    const response =
      await updateProfile(profileData);

    const updatedUser =
      response?.data?.user ||
      response?.user ||
      null;

    if (updatedUser) {
      setUser(updatedUser);
    }

    return response;
  };


  // ======================================
  // CONTEXT VALUE
  // ======================================

  const value = {
    user,
    setUser,

    loading,
    isAuthenticated,

    register,
    login,
    logout,

    updatePassword,
    editProfile,

    fetchCurrentUser,
  };


  // ======================================
  // PROVIDER
  // ======================================

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};