import api from "./api.js";


// ======================================
// REGISTER USER
// ======================================

const registerUser = async (userData) => {
  const response = await api.post(
    "/users/register",
    userData
  );

  return response.data;
};


// ======================================
// LOGIN USER
// ======================================
//
// Backend sets:
//
// accessToken     -> HttpOnly cookie
// refreshToken    -> HttpOnly cookie
//
// We DO NOT save either token manually.
// ======================================

const loginUser = async (credentials) => {
  const response = await api.post(
    "/users/login",
    credentials
  );

  return response.data;
};


// ======================================
// LOGOUT USER
// ======================================
//
// Backend clears the HttpOnly cookies.
// ======================================

const logoutUser = async () => {
  const response = await api.post(
    "/users/logout"
  );

  return response.data;
};


// ======================================
// REFRESH ACCESS TOKEN
// ======================================
//
// Backend reads the refreshToken
// HttpOnly cookie and creates a new
// accessToken cookie.
// ======================================

const refreshAccessToken = async () => {
  const response = await api.post(
    "/users/refresh-token"
  );

  return response.data;
};


// ======================================
// GET CURRENT USER
// ======================================

const getCurrentUser = async () => {
  const response = await api.get(
    "/users/me"
  );

  return response.data;
};


// ======================================
// CHANGE PASSWORD
// ======================================

const changePassword = async (
  passwordData
) => {
  const response = await api.patch(
    "/users/change-password",
    passwordData
  );

  return response.data;
};


// ======================================
// UPDATE PROFILE
// ======================================

const updateProfile = async (
  profileData
) => {
  const response = await api.patch(
    "/users/profile",
    profileData
  );

  return response.data;
};


// ======================================
// GET PUBLIC USER PROFILE
// ======================================

const getUserProfile = async (
  username
) => {
  const response = await api.get(
    `/users/profile/${username}`
  );

  return response.data;
};


// ======================================
// EXPORT
// ======================================

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  changePassword,
  updateProfile,
  getUserProfile,
};