import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterForm = ({
  id,
  name,
  type = "text",
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  required = false,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="form-label"
      >
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="form-input"
      />
    </div>
  );
};

export default RegisterForm;