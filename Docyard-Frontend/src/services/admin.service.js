import api from "./axios.service.js";

// ======================================
// DASHBOARD
// ======================================

const getAdminDashboard = () => {
  return api.get("/admin/dashboard");
};

// ======================================
// USERS
// ======================================

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

// ======================================
// DOCUMENTS
// ======================================

const getAllDocumentsAdmin = (visibility = "") => {
  return api.get("/admin/documents", {
    params: visibility
      ? { visibility }
      : {},
  });
};

const adminDeleteDocument = (documentId) => {
  return api.delete(`/admin/documents/${documentId}`);
};

// ======================================
// CONTACTS
// ======================================

const getContactStatistics = () => {
  return api.get("/admin/contacts/statistics");
};

// ======================================
// EXPORTS
// ======================================

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