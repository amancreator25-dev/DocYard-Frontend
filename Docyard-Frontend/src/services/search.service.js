import api from "./axios.js";

const searchDocuments = (params = {}) => {
  return api.get("/search", {
    params,
  });
};

export {
  searchDocuments,
};