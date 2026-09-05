import api from "./axios.js";

const createContact = async (contactData) => {
  const response = await api.post(
    "/contacts",
    contactData
  );

  return response.data;
};

const getAllContacts = async () => {
  const response = await api.get("/contacts");

  return response.data;
};

const getContactById = async (contactId) => {
  const response = await api.get(
    `/contacts/${contactId}`
  );

  return response.data;
};

const updateContactStatus = async (
  contactId,
  status
) => {
  const response = await api.patch(
    `/contacts/${contactId}/status`,
    { status }
  );

  return response.data;
};

const deleteContact = async (contactId) => {
  const response = await api.delete(
    `/contacts/${contactId}`
  );

  return response.data;
};

export {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
};