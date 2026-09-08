import axios from "axios";

import {
  getToken,
  setToken,
  removeToken,
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

  headers: {
    "Content-Type": "application/json",
  },
});


// ======================================
// REQUEST INTERCEPTOR
// ======================================

api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

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
  (response) => response,

  async (error) => {
    const originalRequest =
      error.config;

    // ==================================
    // ACCESS TOKEN EXPIRED
    // ==================================

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes(
        "/users/login"
      ) &&
      !originalRequest.url?.includes(
        "/users/refresh-token"
      )
    ) {
      originalRequest._retry = true;

      try {
        const response =
          await axios.post(
            `${API_BASE_URL}/users/refresh-token`,
            {},
            {
              withCredentials: true,
            }
          );

        const newAccessToken =
          response.data?.data?.accessToken ||
          response.data?.accessToken;

        if (!newAccessToken) {
          throw new Error(
            "Failed to refresh access token"
          );
        }

        // Save new token
        setToken(newAccessToken);

        // Add new token to original request
        originalRequest.headers =
          originalRequest.headers || {};

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        // Retry original request
        return api(originalRequest);

      } catch (refreshError) {
        removeToken();

        return Promise.reject(
          refreshError
        );
      }
    }

    return Promise.reject(error);
  }
);


export default api;