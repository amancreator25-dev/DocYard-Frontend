const isValidEmail = (email) => {
  if (!email) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email.trim()
  );
};


const isValidPassword = (password) => {
  return (
    typeof password === "string" &&
    password.length >= 8
  );
};


const isValidUsername = (username) => {
  if (!username) {
    return false;
  }

  return /^[a-zA-Z0-9_]{3,20}$/.test(
    username.trim()
  );
};


const validateRequiredFields = (
  data,
  fields
) => {
  const errors = {};

  fields.forEach((field) => {
    const value = data?.[field];

    if (
      value === undefined ||
      value === null ||
      String(value).trim() === ""
    ) {
      errors[field] = `${field} is required`;
    }
  });

  return errors;
};


const validateRegistration = (userData) => {
  const errors = {};

  if (!userData.username?.trim()) {
    errors.username = "Username is required";
  } else if (!isValidUsername(userData.username)) {
    errors.username =
      "Username must be 3-20 characters and contain only letters, numbers, and underscores";
  }

  if (!userData.fullname?.trim()) {
    errors.fullname = "Full name is required";
  }

  if (!userData.email?.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(userData.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!userData.password) {
    errors.password = "Password is required";
  } else if (!isValidPassword(userData.password)) {
    errors.password =
      "Password must be at least 8 characters";
  }

  return errors;
};


export {
  isValidEmail,
  isValidPassword,
  isValidUsername,
  validateRequiredFields,
  validateRegistration,
};