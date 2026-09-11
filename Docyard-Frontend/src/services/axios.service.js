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

  // IMPORTANT:
  // Allows browser to send HttpOnly
  // accessToken and refreshToken cookies.
  withCredentials: true,
});


// ======================================
// REQUEST INTERCEPTOR
// ======================================
//
// DO NOT manually attach Authorization.
//
// We are using:
//
// HttpOnly accessToken cookie
//
// instead of:
//
// Authorization: Bearer <token>
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

  // ------------------------------------
  // SUCCESS
  // ------------------------------------

  (response) => {
    return response;
  },


  // ------------------------------------
  // ERROR
  // ------------------------------------

  async (error) => {

    const originalRequest =
      error.config;


    // ==================================
    // NO SERVER RESPONSE
    // ==================================

    if (!error.response) {
      return Promise.reject(error);
    }


    // ==================================
    // ACCESS TOKEN EXPIRED / 401
    // ==================================

    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&

      // Don't refresh after login
      !originalRequest.url?.includes(
        "/users/login"
      ) &&

      // Don't refresh after register
      !originalRequest.url?.includes(
        "/users/register"
      ) &&

      // Don't refresh the refresh request
      !originalRequest.url?.includes(
        "/users/refresh-token"
      )
    ) {

      originalRequest._retry = true;


      try {

        // =================================
        // REQUEST NEW ACCESS TOKEN
        // =================================
        //
        // Browser automatically sends the
        // HttpOnly refreshToken cookie.
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
        //
        // Backend has now replaced the
        // accessToken cookie.
        //
        // Browser automatically sends it.
        // =================================

        return api(
          originalRequest
        );

      } catch (refreshError) {

        console.error(
          "Token refresh failed:",
          refreshError
        );


        // =================================
        // SESSION IS INVALID
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