// ======================================
// APPLICATION
// ======================================

const APP_NAME = "DocYard";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8080/api";


// ======================================
// DOCUMENT
// ======================================

const DOCUMENT_FILE_TYPES = [
  "pdf",
  "docx",
  "txt",
];

const DOCUMENT_VISIBILITY = {
  PUBLIC: "public",
  PRIVATE: "private",
};

const DOCUMENT_SORT_OPTIONS = {
  NEWEST: "newest",
  OLDEST: "oldest",
  MOST_VIEWED: "mostViewed",
  MOST_DOWNLOADED: "mostDownloaded",
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB


// ======================================
// USER
// ======================================

const USER_ROLES = {
  USER: "user",
  ADMIN: "admin",
};


// ======================================
// CONTACT
// ======================================

const CONTACT_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in-progress",
  RESOLVED: "resolved",
};


// ======================================
// AI
// ======================================

const SUPPORTED_LANGUAGES = [
  "English",
  "Hindi",
  "Bengali",
  "Tamil",
  "Telugu",
  "Marathi",
  "Gujarati",
  "Kannada",
  "Malayalam",
  "Punjabi",
  "Urdu",
  "French",
  "German",
  "Spanish",
  "Japanese",
  "Chinese",
];


// ======================================
// PAGINATION
// ======================================

const DEFAULT_PAGE = 1;

const DEFAULT_LIMIT = 12;

const MAX_LIMIT = 50;


export {
  APP_NAME,
  API_URL,

  DOCUMENT_FILE_TYPES,
  DOCUMENT_VISIBILITY,
  DOCUMENT_SORT_OPTIONS,
  MAX_FILE_SIZE,

  USER_ROLES,

  CONTACT_STATUS,

  SUPPORTED_LANGUAGES,

  DEFAULT_PAGE,
  DEFAULT_LIMIT,
  MAX_LIMIT,
};