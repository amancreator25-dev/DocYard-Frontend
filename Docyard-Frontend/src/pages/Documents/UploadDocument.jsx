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
      setError(
        "Please select a document to upload."
      );
      return;
    }


    if (!formData.title.trim()) {
      setError(
        "Please enter a document title."
      );
      return;
    }


    if (!formData.description.trim()) {
      setError(
        "Please enter a document description."
      );
      return;
    }


    if (!formData.author.trim()) {
      setError(
        "Please enter the author name."
      );
      return;
    }


    if (!formData.category.trim()) {
      setError(
        "Please enter a category."
      );
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

      data.append(
        "title",
        formData.title.trim()
      );

      data.append(
        "description",
        formData.description.trim()
      );

      data.append(
        "author",
        formData.author.trim()
      );

      data.append(
        "slug",
        formData.slug.trim().toLowerCase()
      );

      data.append(
        "category",
        formData.category.trim()
      );

      data.append(
        "tags",
        formData.tags.trim()
      );

      data.append(
        "language",
        formData.language || "English"
      );

      data.append(
        "visibility",
        formData.visibility || "public"
      );


      // ========================================
      // FILE
      // ========================================

      data.append(
        "document",
        file
      );


      // ========================================
      // DEBUG
      // ========================================

      console.log(
        "========== UPLOAD DATA =========="
      );

      for (const [key, value] of data.entries()) {

        if (value instanceof File) {

          console.log(
            key,
            value.name,
            value.type,
            value.size
          );

        } else {

          console.log(
            key,
            value
          );

        }

      }

      console.log(
        "================================="
      );


      // ========================================
      // API REQUEST
      // ========================================

      const response =
        await createDocument(data);


      console.log(
        "UPLOAD RESPONSE:",
        response
      );


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

      setSuccess(
        "Document uploaded successfully."
      );


      // ========================================
      // REDIRECT
      // ========================================

      if (document?.slug) {

        navigate(
          `/documents/${document.slug}`
        );

      } else {

        navigate("/my-documents");

      }

    } catch (err) {

      console.error(
        "UPLOAD ERROR:",
        err
      );


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
    <main className="min-h-screen bg-paper px-6 py-14 text-ink md:px-12 md:py-20">

      <div className="mx-auto max-w-[1000px]">

        {/* ====================================
            HEADER
        ==================================== */}

        <header className="border-b border-line pb-9">

          <Link
            to="/my-documents"
            className="font-mono text-[10px] uppercase tracking-wide text-ink-faint hover:text-blue"
          >
            ← My documents
          </Link>


          <div className="mt-9">

            <span className="page-eyebrow">
              CONTRIBUTE
            </span>

            <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.05] md:text-6xl">
              Add to the archive.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-ink-soft">
              Share a document with the DocYard
              community.
            </p>

          </div>

        </header>


        {/* ====================================
            ERROR
        ==================================== */}

        {error && (

          <div className="mt-6 border border-line bg-paper-raised px-5 py-4 text-sm text-ink-soft">
            {error}
          </div>

        )}


        {/* ====================================
            SUCCESS
        ==================================== */}

        {success && (

          <div className="mt-6 border border-line bg-paper-raised px-5 py-4 text-sm text-ink-soft">
            {success}
          </div>

        )}


        {/* ====================================
            FORM
        ==================================== */}

        <form
          onSubmit={handleSubmit}
          className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]"
        >

          {/* ==================================
              MAIN FORM
          ================================== */}

          <div className="border border-line bg-white p-6 md:p-8">


            {/* TITLE */}

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

            </div>


            {/* DESCRIPTION */}

            <div className="mt-7">

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
                rows={6}
                className="form-textarea"
                required
              />

            </div>


            {/* AUTHOR */}

            <div className="mt-7">

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


            {/* CATEGORY + LANGUAGE */}

            <div className="mt-7 grid gap-6 sm:grid-cols-2">

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
                  placeholder="e.g. Technology"
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


            {/* TAGS */}

            <div className="mt-7">

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
                placeholder="e.g. react, javascript, web"
                className="form-input"
              />

              <p className="mt-2 text-xs text-ink-faint">
                Separate multiple tags with commas.
              </p>

            </div>


            {/* VISIBILITY */}

            <div className="mt-7">

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
                className="form-input"
              >

                <option value="public">
                  Public
                </option>

                <option value="private">
                  Private
                </option>

              </select>

            </div>


            {/* SLUG */}

            <div className="mt-7">

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
                className="form-input"
                required
              />

            </div>


            {/* FILE */}

            <div className="mt-7">

              <label
                htmlFor="file"
                className="form-label"
              >
                Document file
              </label>


              <label
                htmlFor="file"
                className="mt-2 flex min-h-[180px] cursor-pointer flex-col items-center justify-center border border-dashed border-line bg-paper-raised px-6 text-center transition-colors hover:border-ink"
              >

                <span className="font-mono text-[10px] uppercase tracking-wide text-blue">

                  {file
                    ? "FILE SELECTED"
                    : "UPLOAD DOCUMENT"}

                </span>


                <span className="mt-3 text-sm text-ink-soft">

                  {file
                    ? file.name
                    : "Click to choose a file"}

                </span>


                {file && (

                  <span className="mt-2 text-xs text-ink-faint">

                    {(file.size / 1024 / 1024).toFixed(2)}
                    {" MB"}

                  </span>

                )}


                <span className="mt-2 font-mono text-[9px] uppercase text-ink-faint">
                  PDF / DOC / DOCX
                </span>


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

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line pt-7 sm:flex-row sm:justify-end">

              <Link
                to="/my-documents"
                className="btn btn-ghost text-center"
              >
                Cancel
              </Link>


              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading
                  ? "Uploading..."
                  : "Publish document →"}

              </button>

            </div>

          </div>


          {/* ==================================
              SIDEBAR
          ================================== */}

          <aside>

            <div className="border-t border-line">

              <div className="border-b border-line py-5">

                <span className="page-eyebrow">
                  BEFORE YOU UPLOAD
                </span>

              </div>


              <div className="space-y-6 py-6">


                <div>

                  <span className="font-mono text-[10px] text-blue">
                    01
                  </span>

                  <h3 className="mt-2 font-display text-lg font-semibold">
                    Give it a clear title
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-ink-soft">
                    Make it easy for others to
                    understand what your document
                    contains.
                  </p>

                </div>


                <div>

                  <span className="font-mono text-[10px] text-blue">
                    02
                  </span>

                  <h3 className="mt-2 font-display text-lg font-semibold">
                    Add context
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-ink-soft">
                    A useful description helps
                    people discover and understand
                    your contribution.
                  </p>

                </div>


                <div>

                  <span className="font-mono text-[10px] text-blue">
                    03
                  </span>

                  <h3 className="mt-2 font-display text-lg font-semibold">
                    Upload the right file
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-ink-soft">
                    Supported document formats are
                    PDF, DOC, and DOCX.
                  </p>

                </div>

              </div>

            </div>

          </aside>

        </form>

      </div>

    </main>
  );
};

export default UploadDocument;