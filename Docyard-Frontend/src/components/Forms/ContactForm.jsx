import { useState } from "react";

const ContactForm = ({
  onSubmit,
  loading = false,
  initialData = {},
}) => {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    subject: initialData.subject || "",
    message: initialData.message || "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!formData.subject.trim()) {
      setError("Please enter a subject.");
      return;
    }

    if (!formData.message.trim()) {
      setError("Please enter your message.");
      return;
    }

    try {
      const result = await onSubmit?.({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      if (result !== false) {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to send your message."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-line bg-white p-6 md:p-8"
    >
      {/* HEADER */}

      <div className="mb-8 border-b border-line pb-5">
        <span className="page-eyebrow">
          SEND A MESSAGE
        </span>

        <h2 className="mt-3 font-display text-3xl font-semibold">
          How can we help?
        </h2>
      </div>

      {/* ERROR */}

      {error && (
        <div
          className="mb-6 border border-line bg-paper-raised px-5 py-4 text-sm text-ink-soft"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* NAME + EMAIL */}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="form-label"
          >
            Name
          </label>

          <input
            id="contact-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="form-input"
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="form-label"
          >
            Email
          </label>

          <input
            id="contact-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="form-input"
            disabled={loading}
          />
        </div>
      </div>

      {/* SUBJECT */}

      <div className="mt-6">
        <label
          htmlFor="contact-subject"
          className="form-label"
        >
          Subject
        </label>

        <input
          id="contact-subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          placeholder="What is this about?"
          className="form-input"
          disabled={loading}
        />
      </div>

      {/* MESSAGE */}

      <div className="mt-6">
        <label
          htmlFor="contact-message"
          className="form-label"
        >
          Message
        </label>

        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Write your message..."
          rows={7}
          className="form-input min-h-[170px] resize-y"
          disabled={loading}
        />
      </div>

      {/* ACTION */}

      <div className="mt-8 flex justify-end border-t border-line pt-6">
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Sending..."
            : "Send message →"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;