import axios from "axios";

import { removeSession } from "../utils/storage.js";

// ======================================
// API BASE URL
// ======================================

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8000/api";

// ======================================
// AXIOS INSTANCE
// ======================================

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// ======================================
// REFRESH STATE
// ======================================

let refreshPromise = null;

// ======================================
// AUTHENTICATION ROUTES
// These routes must not trigger
// automatic token refresh.
// ======================================

const authRoutes = [
  // ------------------------------
  // USER AUTH
  // ------------------------------

  "/users/login",
  "/users/register",
  "/users/verify-registration-otp",

  // ------------------------------
  // FORGOT PASSWORD
  // ------------------------------

  "/users/forgot-password",
  "/users/verify-forgot-password-otp",
  "/users/reset-password",

  // ------------------------------
  // TOKEN
  // ------------------------------

  "/users/refresh-token",

  // ------------------------------
  // ADMIN AUTH
  // ------------------------------

  "/admin/login",
  "/admin/verify-admin-otp",
];

// ======================================
// REQUEST INTERCEPTOR
// ======================================

api.interceptors.request.use(
  (config) => {
    // JWT authentication is handled
    // through HttpOnly cookies.

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// ======================================
// RESPONSE INTERCEPTOR
// ======================================

api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    // ==================================
    // NO SERVER RESPONSE
    // ==================================

    if (!error.response) {
      return Promise.reject(error);
    }

    // ==================================
    // INVALID REQUEST
    // ==================================

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // ==================================
    // CHECK AUTH ROUTE
    // ==================================

    const isAuthRoute = authRoutes.some((route) =>
      originalRequest.url?.includes(route)
    );

    // ==================================
    // HANDLE EXPIRED ACCESS TOKEN
    // ==================================

    if (
      error.response.status !== 401 ||
      isAuthRoute ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    // ==================================
    // PREVENT INFINITE RETRIES
    // ==================================

    originalRequest._retry = true;

    try {
      // ==================================
      // ONLY ONE REFRESH REQUEST
      // ==================================

      if (!refreshPromise) {
        refreshPromise = axios
          .post(
            `${API_BASE_URL}/users/refresh-token`,
            {},
            {
              withCredentials: true,
            }
          )
          .finally(() => {
            refreshPromise = null;
          });
      }

      // ==================================
      // WAIT FOR TOKEN REFRESH
      // ==================================

      await refreshPromise;

      // ==================================
      // RETRY ORIGINAL REQUEST
      // ==================================

      return api(originalRequest);
    } catch (refreshError) {
      console.error(
        "Token refresh failed:",
        refreshError
      );

      // ==================================
      // SESSION NO LONGER VALID
      // ==================================

      removeSession();

      return Promise.reject(refreshError);
    }
  }
);

export default api;