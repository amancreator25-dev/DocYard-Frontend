import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getAllContacts,
  updateContactStatus,
  deleteContact,
} from "../../services/contact.service.js";

import Loader from "../../components/Common/Loader.jsx";
import EmptyState from "../../components/Common/EmptyState.jsx";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  // ======================================
  // LOAD CONTACTS
  // ======================================

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllContacts();

      const data =
        response?.data?.contacts ||
        response?.contacts ||
        response?.data ||
        [];

      setContacts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to load contact messages."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  // ======================================
  // UPDATE STATUS
  // ======================================

  const handleStatusChange = async (contactId, status) => {
    try {
      setActionLoading(contactId);
      setError("");

      await updateContactStatus(contactId, status);

      setContacts((previous) =>
        previous.map((contact) => {
          const id = contact._id || contact.id;

          return id === contactId
            ? { ...contact, status }
            : contact;
        })
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to update contact status."
      );
    } finally {
      setActionLoading(null);
    }
  };

  // ======================================
  // DELETE
  // ======================================

  const handleDelete = async (contactId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) return;

    try {
      setActionLoading(contactId);
      setError("");

      await deleteContact(contactId);

      setContacts((previous) =>
        previous.filter((contact) => {
          const id = contact._id || contact.id;
          return id !== contactId;
        })
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to delete the message."
      );
    } finally {
      setActionLoading(null);
    }
  };

  // ======================================
  // FORMAT DATE
  // ======================================

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // ======================================
  // STATUS
  // ======================================

  const getStatusStyle = (status) => {
    if (status === "resolved") {
      return "border-green-200 bg-green-50 text-green-700";
    }

    if (status === "in-progress") {
      return "border-blue-200 bg-blue-50 text-[#0A3A63]";
    }

    return "border-line bg-paper text-ink-faint";
  };

  // ======================================
  // RENDER
  // ======================================

  return (
    <main className="min-h-screen bg-paper text-ink">

      {/* ==================================
          HEADER
      ================================== */}

      <section className="border-b border-line">
        <div className="w-full px-6 pb-10 pt-12 sm:px-10 md:px-14 lg:px-20 xl:px-24">

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

            <div>
              <Link
                to="/admin"
                className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-faint transition hover:text-[#0A3A63]"
              >
                Admin Dashboard
              </Link>

              <div className="mt-7">
                <span className="page-eyebrow">
                  Admin / Contacts
                </span>

                <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
                  Contact messages
                </h1>

                <p className="mt-3 max-w-xl text-sm leading-6 text-ink-soft">
                  Review and manage enquiries, feedback,
                  and support messages from the DocYard community.
                </p>
              </div>
            </div>

            {/* COUNT */}

            <div className="border-l-2 border-[#0A3A63] pl-4 md:min-w-[120px]">
              <p className="font-display text-3xl font-semibold">
                {contacts.length}
              </p>

              <p className="mt-1 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                Total messages
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================
          CONTENT
      ================================== */}

      <section className="w-full px-6 py-8 sm:px-10 md:px-14 lg:px-20 xl:px-24">

        {/* ERROR */}

        {error && (
          <div
            className="mb-6 border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* LOADING */}

        {loading ? (
          <div className="flex min-h-[260px] items-center justify-center border-y border-line bg-paper-raised">
            <Loader />
          </div>
        ) : contacts.length === 0 ? (
          <div className="border-y border-line bg-paper-raised px-6 py-20 text-center">
            <EmptyState
              title="No messages found."
              message="There are currently no contact messages to review."
            />
          </div>
        ) : (
          <div className="border-y border-line bg-white">

            {/* ==================================
                TABLE HEADER
            ================================== */}

            <div className="hidden grid-cols-[minmax(0,1fr)_150px_150px_90px] gap-6 border-b border-line bg-paper-raised px-6 py-3 md:grid lg:px-7">

              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                Message
              </span>

              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                Date
              </span>

              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                Status
              </span>

              <span className="text-right font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                Action
              </span>

            </div>

            {/* ==================================
                CONTACTS
            ================================== */}

            {contacts.map((contact) => {
              const contactId =
                contact._id || contact.id;

              const name =
                contact.name ||
                contact.username ||
                "Unknown";

              const email =
                contact.email ||
                "No email";

              const subject =
                contact.subject ||
                "No subject";

              const message =
                contact.message || "";

              const status =
                contact.status || "pending";

              const date =
                contact.createdAt ||
                contact.created_at;

              const isLoading =
                actionLoading === contactId;

              return (
                <article
                  key={contactId}
                  className="grid gap-6 border-b border-line px-5 py-6 last:border-b-0 transition-colors hover:bg-paper-raised/50 md:grid-cols-[minmax(0,1fr)_150px_150px_90px] md:items-center md:px-6 lg:px-7"
                >

                  {/* MESSAGE */}

                  <div className="min-w-0">

                    <div className="flex items-start gap-4">

                      <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#0A3A63] text-white sm:flex">
                        <span className="font-mono text-[9px] font-semibold">
                          MSG
                        </span>
                      </div>

                      <div className="min-w-0">

                        <h2 className="truncate font-display text-lg font-semibold tracking-[-0.015em]">
                          {subject}
                        </h2>

                        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-soft">
                          <span className="font-medium text-ink">
                            {name}
                          </span>

                          <span className="text-ink-faint">
                            {email}
                          </span>
                        </div>

                        <p className="mt-3 line-clamp-2 max-w-3xl text-sm leading-6 text-ink-soft">
                          {message}
                        </p>

                      </div>
                    </div>

                  </div>

                  {/* DATE */}

                  <div>
                    <span className="mb-1 block font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-ink-faint md:hidden">
                      Date
                    </span>

                    <p className="font-mono text-[10px] text-ink-soft">
                      {formatDate(date)}
                    </p>
                  </div>

                  {/* STATUS */}

                  <div>
                    <span className="mb-1 block font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-ink-faint md:hidden">
                      Status
                    </span>

                    <select
                      value={status}
                      onChange={(event) =>
                        handleStatusChange(
                          contactId,
                          event.target.value
                        )
                      }
                      disabled={isLoading}
                      className={`h-9 rounded-md border px-3 font-mono text-[9px] font-semibold uppercase tracking-[0.08em] outline-none transition focus:border-[#0A3A63] ${getStatusStyle(
                        status
                      )}`}
                    >
                      <option value="pending">
                        Pending
                      </option>

                      <option value="in-progress">
                        In Progress
                      </option>

                      <option value="resolved">
                        Resolved
                      </option>
                    </select>
                  </div>

                  {/* DELETE */}

                  <div className="md:text-right">

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(contactId)
                      }
                      disabled={isLoading}
                      className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-ink-faint transition hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {isLoading
                        ? "Processing"
                        : "Delete"}
                    </button>

                  </div>

                </article>
              );
            })}

          </div>
        )}

      </section>
    </main>
  );
};

export default AdminContacts;