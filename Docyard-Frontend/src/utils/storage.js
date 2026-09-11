// ======================================
// AUTH SESSION STORAGE
// ======================================
//
// IMPORTANT:
// The actual accessToken and refreshToken
// are stored by the backend in HttpOnly
// cookies.
//
// We DO NOT store JWT tokens in localStorage.
//
// We only keep a small session flag so the
// frontend knows whether it should attempt
// an authentication check on startup.
// ======================================

const SESSION_KEY = "docyard_session";


// ======================================
// CHECK WHETHER USER HAS A SESSION
// ======================================

const hasSession = () => {
  return localStorage.getItem(SESSION_KEY) === "true";
};


// ======================================
// MARK USER AS LOGGED IN
// ======================================

const setSession = () => {
  localStorage.setItem(
    SESSION_KEY,
    "true"
  );
};


// ======================================
// MARK USER AS LOGGED OUT
// ======================================

const removeSession = () => {
  localStorage.removeItem(
    SESSION_KEY
  );
};


// ======================================
// CLEAR LOCAL STORAGE
// ======================================

const clearStorage = () => {
  localStorage.clear();
};


// ======================================
// BACKWARD COMPATIBILITY
// ======================================
//
// These are kept so other files that may
// still import them don't immediately break.
//
// DO NOT use these for JWT authentication.
// ======================================

const getToken = () => {
  return null;
};


const setToken = () => {
  // JWT is handled by HttpOnly cookies.
};


const removeToken = () => {
  // JWT cookie is cleared by backend.
};


export {
  hasSession,
  setSession,
  removeSession,
  clearStorage,

  // Backward-compatible exports
  getToken,
  setToken,
  removeToken,
};