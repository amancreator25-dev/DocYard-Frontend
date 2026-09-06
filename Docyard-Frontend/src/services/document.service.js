import api from "./axios.service.js";

const getAllDocuments = async (params = {}) => {
  const response = await api.get("/documents", {
    params,
  });

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

const createDocument = async (documentData) => {
  const response = await api.post(
    "/documents",
    documentData
  );

  return response.data;
};

const updateDocument = async (
  documentId,
  documentData
) => {
  const response = await api.patch(
    `/documents/${documentId}`,
    documentData
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
    `/documents/download/${documentId}`,
    {
      responseType: "blob",
    }
  );

  return response;
};

export {
  getAllDocuments,
  getDocumentBySlug,
  getMyDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  downloadDocument,
};