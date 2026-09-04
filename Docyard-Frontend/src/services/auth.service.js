import api from "./api.service";

const registerUser = async (userData) => {
  const response = await api.post("/users/register", userData);
  return response.data;
};

const loginUser = async (credentials) => {
  const response = await api.post("/users/login", credentials);

  if (response.data?.data?.accessToken) {
    localStorage.setItem(
      "accessToken",
      response.data.data.accessToken
    );
  }

  if (response.data?.accessToken) {
    localStorage.setItem(
      "accessToken",
      response.data.accessToken
    );
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

  if (response.data?.data?.accessToken) {
    localStorage.setItem(
      "accessToken",
      response.data.data.accessToken
    );
  }

  if (response.data?.accessToken) {
    localStorage.setItem(
      "accessToken",
      response.data.accessToken
    );
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