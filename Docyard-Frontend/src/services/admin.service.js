import api from "./axios.js";

const getAdminDashboard = () => {
  return api.get("/admin/dashboard");
};

const getAllUsers = () => {
  return api.get("/admin/users");
};

const getUserById = (userId) => {
  return api.get(`/admin/users/${userId}`);
};

const updateUserRole = (userId, role) => {
  return api.patch(`/admin/users/${userId}/role`, {
    role,
  });
};

const deleteUser = (userId) => {
  return api.delete(`/admin/users/${userId}`);
};

const getAllDocumentsAdmin = () => {
  return api.get("/admin/documents");
};

const adminDeleteDocument = (documentId) => {
  return api.delete(`/admin/documents/${documentId}`);
};

const getContactStatistics = () => {
  return api.get("/admin/contacts/statistics");
};

export {
  getAdminDashboard,
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  getAllDocumentsAdmin,
  adminDeleteDocument,
  getContactStatistics,
};