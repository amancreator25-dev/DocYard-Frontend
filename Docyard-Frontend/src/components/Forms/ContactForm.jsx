import { useState } from "react";

const ContactForm = ({
  id,
  name,
  type = "text",
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  required = false,
  rows,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="form-label"
      >
        {label}
      </label>

      {rows ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className="form-textarea"
        />
      ) : (
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
      )}
    </div>
  );
};

export default ContactForm;