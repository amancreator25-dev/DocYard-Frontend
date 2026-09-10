import api from "./axios.service.js";

const createDocument = async (formData) => {
  const response = await api.post(
    "/documents",
    formData
  );

  return response.data;
};

const getAllDocuments = async () => {
  const response = await api.get("/documents");

  return response.data;
};

const getDocumentBySlug = async (slug) => {
  const response = await api.get(
    `/documents/slug/${slug}`
  );

  return response.data;
};

const getMyDocuments = async () => {
  const response = await api.get("/documents/my");

  return response.data;
};

const updateDocument = async (
  documentId,
  formData
) => {
  const response = await api.patch(
    `/documents/${documentId}`,
    formData
  );

  return response.data;
};

const deleteDocument = async (documentId) => {
  const response = await api.delete(
    `/documents/${documentId}`
  );

  return response.data;
};

const downloadDocument = async (documentId) => {
  const response = await api.get(
    `/documents/download/${documentId}`
  );

  return response.data;
};

export {
  createDocument,
  getAllDocuments,
  getDocumentBySlug,
  getMyDocuments,
  updateDocument,
  deleteDocument,
  downloadDocument,
};