import { useState } from "react";
import { Link } from "react-router-dom";

import { createContact } from "../../services/contact.service.js";

import ContactForm from "../../components/Forms/ContactForm.jsx";

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
    <main className="min-h-screen bg-paper text-ink">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="w-full px-6 pb-10 pt-10 sm:px-10 md:px-14 md:pb-14 md:pt-14 lg:px-20 xl:px-24">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <span className="page-eyebrow">
              GET IN TOUCH
            </span>


            <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.96] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-[76px]">
              Contact us.
            </h1>


            <p className="mt-5 max-w-3xl text-base leading-7 text-ink-soft md:text-lg md:leading-8">
              Have a question, suggestion, or something
              you'd like to tell us? We'd love to hear
              from you.
            </p>

          </div>


          <Link
            to="/"
            className="inline-flex h-11 w-fit items-center justify-center rounded-lg border border-line-strong bg-white px-5 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-ink-soft transition-all hover:border-blue hover:text-blue"
          >
            ← Back home
          </Link>

        </div>

      </section>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="w-full px-6 pb-16 pt-6 sm:px-10 md:px-14 md:pb-24 md:pt-8 lg:px-20 xl:px-24">

        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)]">

          {/* =================================================
              INFORMATION
          ================================================= */}

          <aside className="lg:sticky lg:top-6 lg:self-start">

            <div className="rounded-2xl border border-line bg-paper-raised p-7 md:p-8">

              <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-blue">
                DOCYARD
              </span>


              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight">
                We'd like to hear from you.
              </h2>


              <p className="mt-4 text-sm leading-7 text-ink-soft md:text-base">
                Whether you have a question, some feedback,
                or need a little help, send us a message.
              </p>


              {/* =================================================
                  CONTACT TYPES
              ================================================= */}

              <div className="mt-9 grid gap-4">

                {/* QUESTIONS */}

                <div className="rounded-xl border border-line bg-white p-5">

                  <div className="flex items-center justify-between">

                    <span className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-blue">
                      QUESTIONS
                    </span>

                    <span className="font-mono text-xs text-ink-faint">
                      01
                    </span>

                  </div>


                  <p className="mt-3 text-sm leading-6 text-ink-soft">
                    Ask us anything about the platform
                    or your account.
                  </p>

                </div>


                {/* FEEDBACK */}

                <div className="rounded-xl border border-line bg-white p-5">

                  <div className="flex items-center justify-between">

                    <span className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-blue">
                      FEEDBACK
                    </span>

                    <span className="font-mono text-xs text-ink-faint">
                      02
                    </span>

                  </div>


                  <p className="mt-3 text-sm leading-6 text-ink-soft">
                    Tell us how we can make
                    DocYard better.
                  </p>

                </div>


                {/* SUPPORT */}

                <div className="rounded-xl border border-line bg-white p-5">

                  <div className="flex items-center justify-between">

                    <span className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-blue">
                      SUPPORT
                    </span>

                    <span className="font-mono text-xs text-ink-faint">
                      03
                    </span>

                  </div>


                  <p className="mt-3 text-sm leading-6 text-ink-soft">
                    Need help with your documents
                    or account? Send us a message.
                  </p>

                </div>

              </div>

            </div>

          </aside>


          {/* =================================================
              FORM
          ================================================= */}

          <section>

            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8 md:p-10 lg:p-12"
            >

              {/* =============================================
                  FORM HEADER
              ============================================= */}

              <div className="mb-9">

                <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-blue">
                  SEND A MESSAGE
                </span>


                <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
                  How can we help?
                </h2>


                <p className="mt-3 text-sm leading-6 text-ink-soft md:text-base">
                  Fill in the details below and we'll
                  get back to you as soon as possible.
                </p>

              </div>


              {/* =============================================
                  SUCCESS
              ============================================= */}

              {success && (
                <div className="mb-7 rounded-xl border border-line-strong bg-blue-light px-5 py-4 text-sm font-medium leading-6 text-blue md:px-6">
                  {success}
                </div>
              )}


              {/* =============================================
                  ERROR
              ============================================= */}

              {error && (
                <div className="mb-7 rounded-xl border border-line-strong bg-paper-raised px-5 py-4 text-sm font-medium leading-6 text-ink md:px-6">
                  {error}
                </div>
              )}


              {/* =============================================
                  NAME + EMAIL
              ============================================= */}

              <div className="grid gap-6 md:grid-cols-2">

                <ContactForm
                  id="name"
                  name="name"
                  type="text"
                  label="Name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />


                <ContactForm
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


              {/* =============================================
                  SUBJECT
              ============================================= */}

              <div className="mt-7">

                <ContactForm
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


              {/* =============================================
                  MESSAGE
              ============================================= */}

              <div className="mt-7">

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
                  className="form-textarea min-h-[210px]"
                  required
                />

              </div>


              {/* =============================================
                  ACTION
              ============================================= */}

              <div className="mt-9 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">

                <p className="text-xs leading-5 text-ink-faint">
                  We appreciate you taking the time
                  to reach out to DocYard.
                </p>


                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-blue bg-blue px-7 text-sm font-semibold text-white shadow-sm transition-all hover:border-ink hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Sending..."
                    : "Send message →"}
                </button>

              </div>

            </form>

          </section>

        </div>

      </section>


      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <section className="w-full bg-ink px-6 py-16 text-paper sm:px-10 md:px-14 md:py-20 lg:px-20 xl:px-24">

        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">

          <div>

            <span className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-paper/50">
              DOCYARD
            </span>


            <h2 className="mt-4 font-display text-4xl font-semibold leading-[0.95] tracking-[-0.025em] sm:text-5xl md:text-6xl">
              Have something useful
              <br className="hidden sm:block" />
              to share?
            </h2>

          </div>


          <Link
            to="/upload"
            className="inline-flex h-12 w-fit items-center justify-center rounded-lg border border-paper/30 px-7 text-sm font-semibold text-paper transition-all hover:bg-paper hover:text-ink"
          >
            Contribute a document →
          </Link>

        </div>

      </section>

    </main>
  );
};

export default Contact;