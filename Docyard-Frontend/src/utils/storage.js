const TOKEN_KEY = "accessToken";

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const clearStorage = () => {
  localStorage.clear();
};

export {
  getToken,
  setToken,
  removeToken,
  clearStorage,
};