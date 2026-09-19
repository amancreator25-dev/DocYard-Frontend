import axios from "axios";

import {
  removeSession,
} from "../utils/storage.js";

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
// REQUEST INTERCEPTOR
// ======================================

api.interceptors.request.use(
  (config) => {
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
    // AUTHENTICATION ROUTES
    // ==================================
    //
    // These routes must NEVER trigger
    // automatic access-token refresh.
    // ==================================

    const authRoutes = [
      "/users/login",
      "/users/register",
      "/users/verify-registration-otp",
      "/users/forgot-password",
      "/users/verify-forgot-password-otp",
      "/users/reset-password",
      "/users/refresh-token",
      "/admin/login",
      "/admin/verify-admin-otp",
    ];

    const isAuthRoute =
      authRoutes.some((route) =>
        originalRequest?.url?.includes(route)
      );

    // ==================================
    // ACCESS TOKEN EXPIRED / 401
    // ==================================

    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isAuthRoute
    ) {
      originalRequest._retry = true;

      try {
        // =================================
        // REQUEST NEW ACCESS TOKEN
        // =================================

        await axios.post(
          `${API_BASE_URL}/users/refresh-token`,
          {},
          {
            withCredentials: true,
          }
        );

        // =================================
        // RETRY ORIGINAL REQUEST
        // =================================

        return api(originalRequest);

      } catch (refreshError) {
        console.error(
          "Token refresh failed:",
          refreshError
        );

        // =================================
        // INVALID SESSION
        // =================================

        removeSession();

        return Promise.reject(
          refreshError
        );
      }
    }

    // ==================================
    // NORMAL ERROR
    // ==================================

    return Promise.reject(error);
  }
);

export default api;