import api from "./axios.service.js";

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
// VERIFY REGISTRATION OTP
// ======================================

const verifyRegistrationOTP = async (
  email,
  otp
) => {
  const response = await api.post(
    "/users/verify-registration-otp",
    {
      email,
      otp,
    }
  );

  return response.data;
};

// ======================================
// FORGOT PASSWORD
// ======================================

const sendForgotPasswordOTP = async (email) => {
  const response = await api.post(
    "/users/forgot-password",
    {
      email,
    }
  );

  return response.data;
};

// ======================================
// VERIFY FORGOT PASSWORD OTP
// ======================================

const verifyForgotPasswordOTP = async (
  email,
  otp
) => {
  const response = await api.post(
    "/users/verify-forgot-password-otp",
    {
      email,
      otp,
    }
  );

  return response.data;
};

// ======================================
// RESET PASSWORD
// ======================================

const resetPassword = async (
  resetToken,
  newPassword
) => {
  const response = await api.post(
    "/users/reset-password",
    {
      resetToken,
      newPassword,
    }
  );

  return response.data;
};

// ======================================
// LOGIN USER
// ======================================

const loginUser = async (credentials) => {
  const response = await api.post(
    "/users/login",
    credentials
  );

  return response.data;
};

// ======================================
// ADMIN LOGIN OTP
// ======================================

const sendAdminLoginOTP = async (
  email,
  password
) => {
  const response = await api.post(
    "/admin/login",
    {
      email,
      password,
    }
  );

  return response.data;
};

// ======================================
// VERIFY ADMIN LOGIN OTP
// ======================================

const verifyAdminOTP = async (
  email,
  otp
) => {
  const response = await api.post(
    "/admin/verify-admin-otp",
    {
      email,
      otp,
    }
  );

  return response.data;
};

// ======================================
// LOGOUT USER
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
  verifyRegistrationOTP,

  sendForgotPasswordOTP,
  verifyForgotPasswordOTP,
  resetPassword,

  loginUser,

  sendAdminLoginOTP,
  verifyAdminOTP,

  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  changePassword,
  updateProfile,
  getUserProfile,
};