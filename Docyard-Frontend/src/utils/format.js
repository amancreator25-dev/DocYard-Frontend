const formatFileSize = (bytes) => {
  if (!bytes || bytes <= 0) {
    return "0 Bytes";
  }

  const units = [
    "Bytes",
    "KB",
    "MB",
    "GB",
  ];

  const index = Math.floor(
    Math.log(bytes) / Math.log(1024)
  );

  const unitIndex = Math.min(
    index,
    units.length - 1
  );

  return `${(
    bytes / Math.pow(1024, unitIndex)
  ).toFixed(unitIndex === 0 ? 0 : 2)} ${
    units[unitIndex]
  }`;
};


const formatDate = (date) => {
  if (!date) {
    return "";
  }

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};


const formatDateTime = (date) => {
  if (!date) {
    return "";
  }

  return new Date(date).toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
};


const truncateText = (text, maxLength = 100) => {
  if (!text) {
    return "";
  }

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.substring(0, maxLength).trim()}...`;
};


export {
  formatFileSize,
  formatDate,
  formatDateTime,
  truncateText,
};