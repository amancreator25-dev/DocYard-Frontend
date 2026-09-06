import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createDocument } from "../../services/document.service.js";

const UploadDocument = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    language: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    setFile(selectedFile || null);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!file) {
      setError("Please select a document to upload.");
      return;
    }

    if (!formData.title.trim()) {
      setError("Please enter a document title.");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      data.append("title", formData.title.trim());
      data.append(
        "description",
        formData.description.trim()
      );
      data.append("category", formData.category);
      data.append("language", formData.language);
      data.append("file", file);

      const response = await createDocument(data);

      const document =
        response?.data?.document ||
        response?.document ||
        null;

      if (document?.slug) {
        navigate(`/documents/${document.slug}`);
      } else if (document?._id) {
        navigate(`/documents/${document._id}`);
      } else {
        navigate("/my-documents");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to upload the document."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-paper px-6 py-14 text-ink md:px-12 md:py-20">

      <div className="mx-auto max-w-[1000px]">

        {/* HEADER */}

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


        {/* ERROR */}

        {error && (
          <div className="mt-6 border border-line bg-paper-raised px-5 py-4 text-sm text-ink-soft">
            {error}
          </div>
        )}


        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]"
        >

          {/* MAIN */}

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
                onChange={handleChange}
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

                <span className="mt-2 font-mono text-[9px] uppercase text-ink-faint">
                  PDF / DOC / DOCX
                </span>

                <input
                  id="file"
                  name="file"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />

              </label>

            </div>


            {/* ACTIONS */}

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
                className="btn btn-primary"
              >
                {loading
                  ? "Uploading..."
                  : "Publish document →"}
              </button>

            </div>

          </div>


          {/* SIDEBAR */}

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