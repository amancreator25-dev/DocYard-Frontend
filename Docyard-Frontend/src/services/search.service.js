import api from "./axios.service.js";

const searchDocuments = (params = {}) => {
  return api.get("/search", {
    params,
  });
};

export {
  searchDocuments,
};