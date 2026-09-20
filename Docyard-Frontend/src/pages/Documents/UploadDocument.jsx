import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createDocument } from "../../services/document.service.js";

const UploadDocument = () => {
  const navigate = useNavigate();

  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    slug: "",
    category: "",
    tags: "",
    language: "English",
    visibility: "public",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  // ==========================================
  // HANDLE FILE CHANGE
  // ==========================================

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setError("");
  };

  // ==========================================
  // GENERATE SLUG
  // ==========================================

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  // ==========================================
  // HANDLE TITLE CHANGE
  // ==========================================

  const handleTitleChange = (event) => {
    const value = event.target.value;

    setFormData((previous) => ({
      ...previous,
      title: value,
      slug: generateSlug(value),
    }));

    setError("");
  };

  // ==========================================
  // HANDLE SUBMIT
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    // ------------------------------------------
    // VALIDATION
    // ------------------------------------------

    if (!file) {
      setError("Please select a document to upload.");
      return;
    }

    if (!formData.title.trim()) {
      setError("Please enter a document title.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Please enter a document description.");
      return;
    }

    if (!formData.author.trim()) {
      setError("Please enter the author name.");
      return;
    }

    if (!formData.category.trim()) {
      setError("Please enter a category.");
      return;
    }

    // ------------------------------------------
    // START LOADING
    // ------------------------------------------

    setLoading(true);

    try {
      // ========================================
      // CREATE MULTIPART FORM DATA
      // ========================================

      const data = new FormData();

      // ========================================
      // TEXT FIELDS
      // ========================================

      data.append("title", formData.title.trim());

      data.append("description", formData.description.trim());

      data.append("author", formData.author.trim());

      data.append("slug", formData.slug.trim().toLowerCase());

      data.append("category", formData.category.trim());

      data.append("tags", formData.tags.trim());

      data.append("language", formData.language || "English");

      data.append("visibility", formData.visibility || "public");

      // ========================================
      // FILE
      // ========================================

      data.append("document", file);

      // ========================================
      // DEBUG
      // ========================================

      console.log("========== UPLOAD DATA ==========");

      for (const [key, value] of data.entries()) {
        if (value instanceof File) {
          console.log(key, value.name, value.type, value.size);
        } else {
          console.log(key, value);
        }
      }

      console.log("=================================");

      // ========================================
      // API REQUEST
      // ========================================

      const response = await createDocument(data);

      console.log("UPLOAD RESPONSE:", response);

      // ========================================
      // GET CREATED DOCUMENT
      // ========================================

      const document =
        response?.data?.document ||
        response?.document ||
        null;

      // ========================================
      // SUCCESS
      // ========================================

      setSuccess("Document uploaded successfully.");

      // ========================================
      // REDIRECT
      // ========================================

      if (document?.slug) {
        navigate(`/documents/${document.slug}`);
      } else {
        navigate("/my-documents");
      }
    } catch (err) {
      console.error("UPLOAD ERROR:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to upload the document."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // JSX
  // ==========================================

  return (
    <main className="min-h-screen bg-paper text-ink">

      {/* ======================================
          PAGE HEADER
      ====================================== */}

      <section className="w-full px-6 pb-10 pt-10 sm:px-10 md:px-14 md:pb-14 md:pt-14 lg:px-20 xl:px-24">

       <Link
        to="/my-documents"
        className="inline-flex items-center justify-center rounded-lg border border-[#0A3A63] bg-[#0A3A63] px-5 py-2.5 !text-[#ffffff] text-xs font-semibold uppercase tracking-[0.08em] text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#082F50] hover:shadow-md"
      >
        My documents
      </Link>

        <div className="mt-10">

          <span className="page-eyebrow">
            CONTRIBUTE
          </span>

          <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.98] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-[76px]">
            Add to the archive.
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-ink-soft md:text-lg">
            Share a document with the DocYard community.
            Add useful context so others can discover and
            understand your contribution.
          </p>

        </div>

      </section>


      {/* ======================================
          STATUS MESSAGES
      ====================================== */}

      {(error || success) && (
        <section className="w-full px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24">

          {error && (
            <div className="rounded-xl border border-line-strong bg-paper-raised px-5 py-4 text-sm font-medium text-ink md:px-6 md:py-5">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-xl border border-line-strong bg-blue-light px-5 py-4 text-sm font-medium text-blue md:px-6 md:py-5">
              {success}
            </div>
          )}

        </section>
      )}


      {/* ======================================
          MAIN FORM AREA
      ====================================== */}

      <section className="w-full px-6 pb-16 pt-8 sm:px-10 md:px-14 md:pb-24 md:pt-10 lg:px-20 xl:px-24">

        <form
          onSubmit={handleSubmit}
          className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px]"
        >

          {/* ==================================
              MAIN FORM
          ================================== */}

          <div className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8 md:p-10 lg:p-12">

            {/* FORM HEADER */}

            <div className="mb-10">

              <span className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-blue">
                DOCUMENT INFORMATION
              </span>

              <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
                Tell us about your document.
              </h2>

              <p className="mt-3 text-sm leading-6 text-ink-soft md:text-base">
                Provide the basic information needed to organize
                and publish your document in the archive.
              </p>

            </div>


            {/* ==================================
                TITLE
            ================================== */}

            <div>

              <label
                htmlFor="title"
                className="form-label"
              >
                Document title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Enter document title"
                className="form-input"
                required
              />

              <p className="mt-2 text-xs leading-5 text-ink-faint">
                Your slug will be generated automatically from this title.
              </p>

            </div>


            {/* ==================================
                DESCRIPTION
            ================================== */}

            <div className="mt-8">

              <label
                htmlFor="description"
                className="form-label"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="What is this document about?"
                rows={7}
                className="form-textarea min-h-[180px]"
                required
              />

            </div>


            {/* ==================================
                AUTHOR
            ================================== */}

            <div className="mt-8">

              <label
                htmlFor="author"
                className="form-label"
              >
                Author
              </label>

              <input
                id="author"
                name="author"
                type="text"
                value={formData.author}
                onChange={handleChange}
                placeholder="e.g. Aman Singh"
                className="form-input"
                required
              />

            </div>


            {/* ==================================
                CATEGORY + LANGUAGE
            ================================== */}

            <div className="mt-8 grid gap-6 sm:grid-cols-2">

              <div>

                <label
                  htmlFor="category"
                  className="form-label"
                >
                  Category
                </label>

                <input
                  id="category"
                  name="category"
                  type="text"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. History"
                  className="form-input"
                  required
                />

              </div>


              <div>

                <label
                  htmlFor="language"
                  className="form-label"
                >
                  Language
                </label>

                <input
                  id="language"
                  name="language"
                  type="text"
                  value={formData.language}
                  onChange={handleChange}
                  placeholder="e.g. English"
                  className="form-input"
                />

              </div>

            </div>


            {/* ==================================
                TAGS
            ================================== */}

            <div className="mt-8">

              <label
                htmlFor="tags"
                className="form-label"
              >
                Tags
              </label>

              <input
                id="tags"
                name="tags"
                type="text"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g. History, Politics, Geography"
                className="form-input"
              />

              <p className="mt-2 text-xs leading-5 text-ink-faint">
                Separate multiple tags with commas.
              </p>

            </div>


            {/* ==================================
                VISIBILITY
            ================================== */}

            <div className="mt-8">

              <label
                htmlFor="visibility"
                className="form-label"
              >
                Visibility
              </label>

              <select
                id="visibility"
                name="visibility"
                value={formData.visibility}
                onChange={handleChange}
                className="form-input cursor-pointer"
              >
                <option value="public">
                  Public
                </option>

                <option value="private">
                  Private
                </option>
              </select>

              <p className="mt-2 text-xs leading-5 text-ink-faint">
                Public documents can be discovered by the DocYard community.
              </p>

            </div>


            {/* ==================================
                SLUG
            ================================== */}

            <div className="mt-8">

              <label
                htmlFor="slug"
                className="form-label"
              >
                Document slug
              </label>

              <input
                id="slug"
                name="slug"
                type="text"
                value={formData.slug}
                onChange={handleChange}
                placeholder="document-slug"
                className="form-input font-mono text-sm"
                required
              />

              <p className="mt-2 text-xs leading-5 text-ink-faint">
                This is generated automatically but can be edited before publishing.
              </p>

            </div>


            {/* ==================================
                FILE UPLOAD
            ================================== */}

            <div className="mt-8">

              <div className="flex items-end justify-between gap-4">

                <label
                  htmlFor="file"
                  className="form-label"
                >
                  Document file
                </label>

                <span className="font-mono text-xs uppercase tracking-[0.08em] text-ink-faint">
                  PDF / DOC / DOCX
                </span>

              </div>


              <label
                htmlFor="file"
                className="mt-3 flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-line-strong bg-paper-raised px-6 text-center transition-all hover:border-blue hover:bg-blue-light/40"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-line bg-white font-display text-2xl text-blue">
                  ↑
                </div>


                <span className="mt-5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-blue">
                  {file
                    ? "FILE SELECTED"
                    : "UPLOAD DOCUMENT"}
                </span>


                <span className="mt-3 max-w-xl break-all text-sm font-medium text-ink-soft md:text-base">

                  {file
                    ? file.name
                    : "Click anywhere here to choose a file"}

                </span>


                {file && (
                  <span className="mt-2 text-xs text-ink-faint">

                    {(file.size / 1024 / 1024).toFixed(2)}
                    {" MB"}

                  </span>
                )}


                {!file && (
                  <span className="mt-2 text-xs text-ink-faint">
                    Select a PDF, DOC, or DOCX file from your device.
                  </span>
                )}


                <input
                  id="file"
                  name="document"
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileChange}
                  className="hidden"
                />

              </label>

            </div>


            {/* ==================================
                ACTIONS
            ================================== */}

            <div className="mt-10 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:justify-end">

              <Link
                to="/my-documents"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-line-strong bg-paper px-6 text-sm font-semibold text-ink transition-all hover:border-ink hover:bg-paper-raised"
              >
                Cancel
              </Link>


              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-12 items-center justify-center rounded-lg border border-blue bg-[#0A3A63] px-7 text-sm font-semibold text-white shadow-sm transition-all hover:bg-ink hover:border-ink disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Uploading..."
                  : "Publish Document"}
              </button>

            </div>

          </div>


          {/* ==================================
              SIDEBAR
          ================================== */}

          <aside className="lg:sticky lg:top-6 lg:self-start">

            <div className="rounded-2xl border border-line bg-paper-raised p-7 md:p-8">

              {/* SIDEBAR HEADER */}

              <div>

                <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-blue">
                  BEFORE YOU UPLOAD
                </span>

                <h2 className="mt-3 font-display text-3xl font-semibold leading-tight">
                  Make your contribution useful.
                </h2>

                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  A little context makes documents much easier
                  for other people to discover and understand.
                </p>

              </div>


              {/* GUIDELINES */}

              <div className="mt-8 space-y-7">

                {/* ITEM 01 */}

                <div className="flex gap-4">

               

                  <div>

                    <h3 className="font-display text-xl font-semibold">
                      Give it a clear title
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-ink-soft">
                      Make it easy for others to understand
                      what your document contains.
                    </p>

                  </div>

                </div>


                {/* ITEM 02 */}

                <div className="flex gap-4">

                  <div>

                    <h3 className="font-display text-xl font-semibold">
                      Add useful context
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-ink-soft">
                      A meaningful description helps people
                      discover and understand your contribution.
                    </p>

                  </div>

                </div>


                {/* ITEM 03 */}

                <div className="flex gap-4">


                  <div>

                    <h3 className="font-display text-xl font-semibold">
                      Upload the right file
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-ink-soft">
                      DocYard currently supports PDF, DOC,
                      and DOCX documents.
                    </p>

                  </div>

                </div>

              </div>


              {/* QUICK NOTE */}

              <div className="mt-9 rounded-xl border border-line bg-white p-5">

                <span className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ink-faint">
                  QUICK NOTE
                </span>

                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  Your title automatically creates the document
                  slug. You can review or edit it before publishing.
                </p>

              </div>

            </div>

          </aside>

        </form>

      </section>

    </main>
  );
};

export default UploadDocument;