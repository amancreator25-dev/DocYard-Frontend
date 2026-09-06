import api from "./axios.service.js";

const summarizeDocument = async (documentId) => {
  const response = await api.post(
    `/ai/summarize/${documentId}`
  );

  return response.data;
};

const translateDocument = async (
  documentId,
  language
) => {
  const response = await api.post(
    `/ai/translate/${documentId}`,
    {
      language,
    }
  );

  return response.data;
};

export {
  summarizeDocument,
  translateDocument,
};