import api from "./axios.service.js";

const likeDocument = async (documentId) => {
  const response = await api.post(
    `/likes/${documentId}`
  );

  return response.data;
};

const unlikeDocument = async (documentId) => {
  const response = await api.delete(
    `/likes/${documentId}`
  );

  return response.data;
};

const checkLikeStatus = async (documentId) => {
  const response = await api.get(
    `/likes/${documentId}/status`
  );

  return response.data;
};

const getLikeCount = async (documentId) => {
  const response = await api.get(
    `/likes/${documentId}/count`
  );

  return response.data;
};

export {
  likeDocument,
  unlikeDocument,
  checkLikeStatus,
  getLikeCount,
};