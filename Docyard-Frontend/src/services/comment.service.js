import api from "./axios.js";

const addComment = async (documentId, commentData) => {
  const response = await api.post(
    `/comments/document/${documentId}`,
    commentData
  );

  return response.data;
};

const getDocumentComments = async (documentId) => {
  const response = await api.get(
    `/comments/document/${documentId}`
  );

  return response.data;
};

const updateComment = async (commentId, content) => {
  const response = await api.patch(
    `/comments/${commentId}`,
    { content }
  );

  return response.data;
};

const deleteComment = async (commentId) => {
  const response = await api.delete(
    `/comments/${commentId}`
  );

  return response.data;
};

export {
  addComment,
  getDocumentComments,
  updateComment,
  deleteComment,
};