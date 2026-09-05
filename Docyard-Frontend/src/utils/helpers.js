// ======================================
// CLASS NAMES
// ======================================

const cn = (...classes) => {
  return classes
    .filter(Boolean)
    .join(" ");
};


// ======================================
// CAPITALIZE
// ======================================

const capitalize = (text) => {
  if (!text) {
    return "";
  }

  return (
    text.charAt(0).toUpperCase() +
    text.slice(1)
  );
};


// ======================================
// TITLE CASE
// ======================================

const titleCase = (text) => {
  if (!text) {
    return "";
  }

  return text
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
};


// ======================================
// SLUG
// ======================================

const createSlug = (text) => {
  if (!text) {
    return "";
  }

  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(
      /[\s\W-]+/g,
      "-"
    )
    .replace(
      /^-+|-+$/g,
      ""
    );
};


// ======================================
// DEBOUNCE
// ======================================

const debounce = (
  callback,
  delay = 500
) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};


// ======================================
// ARRAY CHECK
// ======================================

const isArrayEmpty = (array) => {
  return (
    !Array.isArray(array) ||
    array.length === 0
  );
};


// ======================================
// OBJECT CHECK
// ======================================

const isObjectEmpty = (object) => {
  return (
    !object ||
    typeof object !== "object" ||
    Object.keys(object).length === 0
  );
};


// ======================================
// FILE EXTENSION
// ======================================

const getFileExtension = (
  filename
) => {
  if (!filename) {
    return "";
  }

  const parts =
    filename.split(".");

  return parts.length > 1
    ? parts.pop().toLowerCase()
    : "";
};


// ======================================
// FILE TYPE ICON
// ======================================

const getFileType = (filename) => {
  const extension =
    getFileExtension(filename);

  switch (extension) {
    case "pdf":
      return "pdf";

    case "doc":
    case "docx":
      return "docx";

    case "txt":
      return "txt";

    default:
      return "unknown";
  }
};


// ======================================
// ERROR MESSAGE
// ======================================

const getErrorMessage = (
  error,
  fallback = "Something went wrong"
) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    fallback
  );
};


// ======================================
// DOWNLOAD BLOB
// ======================================

const downloadBlob = (
  blob,
  filename
) => {
  if (!blob) {
    return;
  }

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;
  link.download =
    filename || "document";

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);
};


export {
  cn,
  capitalize,
  titleCase,
  createSlug,
  debounce,
  isArrayEmpty,
  isObjectEmpty,
  getFileExtension,
  getFileType,
  getErrorMessage,
  downloadBlob,
};