import api from "./axios.service.js";

const registerUser = async (userData) => {
  const response = await api.post("/users/register", userData);

  return response.data;
};

const loginUser = async (credentials) => {
  const response = await api.post("/users/login", credentials);

  const accessToken =
    response.data?.data?.accessToken ||
    response.data?.accessToken;

  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }

  return response.data;
};

const logoutUser = async () => {
  const response = await api.post("/users/logout");

  localStorage.removeItem("accessToken");

  return response.data;
};

const refreshAccessToken = async () => {
  const response = await api.post("/users/refresh-token");

  const accessToken =
    response.data?.data?.accessToken ||
    response.data?.accessToken;

  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }

  return response.data;
};

const getCurrentUser = async () => {
  const response = await api.get("/users/me");

  return response.data;
};

const changePassword = async (passwordData) => {
  const response = await api.patch(
    "/users/change-password",
    passwordData
  );

  return response.data;
};

const updateProfile = async (profileData) => {
  const response = await api.patch(
    "/users/profile",
    profileData
  );

  return response.data;
};

const getUserProfile = async (username) => {
  const response = await api.get(
    `/users/profile/${username}`
  );

  return response.data;
};

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