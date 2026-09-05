import api from "./axios.js";

const addBookmark = async (documentId) => {
  const response = await api.post(
    `/bookmarks/${documentId}`
  );

  return response.data;
};

const removeBookmark = async (documentId) => {
  const response = await api.delete(
    `/bookmarks/${documentId}`
  );

  return response.data;
};

const checkBookmarkStatus = async (documentId) => {
  const response = await api.get(
    `/bookmarks/${documentId}/status`
  );

  return response.data;
};

const getMyBookmarks = async () => {
  const response = await api.get("/bookmarks/my");

  return response.data;
};

export {
  addBookmark,
  removeBookmark,
  checkBookmarkStatus,
  getMyBookmarks,
};