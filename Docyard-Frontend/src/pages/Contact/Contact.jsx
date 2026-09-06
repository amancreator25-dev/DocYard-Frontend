import { useState } from "react";
import { Link } from "react-router-dom";

import { createContact } from "../services/contact.js";

import FormInput from "../components/Common/FormInput.jsx";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
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

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await createContact(formData);

      setSuccess(
        "Thanks for reaching out. We'll get back to you soon."
      );

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to send your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-paper px-6 py-14 text-ink md:px-12 md:py-20">
      <div className="mx-auto max-w-[1180px]">

        {/* HEADER */}

        <header className="border-b border-line pb-10">
          <span className="page-eyebrow">
            GET IN TOUCH
          </span>

          <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.05] md:text-6xl">
            Contact us.
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-ink-soft">
            Have a question, suggestion, or something
            you'd like to tell us? We'd love to hear
            from you.
          </p>
        </header>

        {/* CONTENT */}

        <div className="grid gap-12 py-12 lg:grid-cols-[300px_minmax(0,1fr)]">

          {/* INFO */}

          <aside>
            <div className="border-t border-line">

              <div className="border-b border-line py-5">
                <span className="page-eyebrow">
                  DOCYARD
                </span>
              </div>

              <div className="divide-y divide-line">

                <div className="py-6">
                  <span className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
                    QUESTIONS
                  </span>

                  <p className="mt-2 text-sm leading-6 text-ink-soft">
                    Ask us anything about the
                    platform or your account.
                  </p>
                </div>

                <div className="py-6">
                  <span className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
                    FEEDBACK
                  </span>

                  <p className="mt-2 text-sm leading-6 text-ink-soft">
                    Tell us how we can make
                    DocYard better.
                  </p>
                </div>

                <div className="py-6">
                  <span className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
                    SUPPORT
                  </span>

                  <p className="mt-2 text-sm leading-6 text-ink-soft">
                    Need help with your documents
                    or account? Send us a message.
                  </p>
                </div>

              </div>
            </div>
          </aside>

          {/* FORM */}

          <section>
            <form
              onSubmit={handleSubmit}
              className="border border-line bg-white p-6 md:p-8"
            >

              {/* STATUS */}

              {success && (
                <div className="mb-7 border border-line bg-paper-raised px-5 py-4 text-sm leading-6 text-ink">
                  {success}
                </div>
              )}

              {error && (
                <div className="mb-7 border border-line bg-paper-raised px-5 py-4 text-sm leading-6 text-ink-soft">
                  {error}
                </div>
              )}

              {/* NAME + EMAIL */}

              <div className="grid gap-6 md:grid-cols-2">

                <FormInput
                  id="name"
                  name="name"
                  type="text"
                  label="Name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />

                <FormInput
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />

              </div>

              {/* SUBJECT */}

              <div className="mt-6">
                <FormInput
                  id="subject"
                  name="subject"
                  type="text"
                  label="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  required
                />
              </div>

              {/* MESSAGE */}

              <div className="mt-6">

                <label
                  htmlFor="message"
                  className="form-label"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  rows={8}
                  className="form-textarea"
                  required
                />

              </div>

              {/* ACTION */}

              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">

                <Link
                  to="/"
                  className="font-mono text-[10px] uppercase tracking-wide text-ink-faint hover:text-blue"
                >
                  ← Back home
                </Link>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Sending..."
                    : "Send message →"}
                </button>

              </div>

            </form>
          </section>

        </div>
      </div>
    </main>
  );
};

export default Contact;