import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getAllContacts,
  updateContactStatus,
  deleteContact,
} from "../../services/contact.js";

import Loader from "../../components/Common/Loader.jsx";
import EmptyState from "../../components/Common/EmptyState.jsx";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

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

  const handleStatusChange = async (contactId, status) => {
    try {
      setActionLoading(contactId);
      setError("");

      await updateContactStatus(contactId, status);

      setContacts((previous) =>
        previous.map((contact) => {
          const id = contact._id || contact.id;

          if (id !== contactId) {
            return contact;
          }

          return {
            ...contact,
            status,
          };
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

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString();
  };

  const getStatusClass = (status) => {
    if (status === "resolved") {
      return "text-green-700";
    }

    if (status === "in-progress") {
      return "text-blue";
    }

    return "text-ink-faint";
  };

  return (
    <main className="min-h-screen bg-paper px-6 py-14 text-ink md:px-12 md:py-20">
      <div className="mx-auto max-w-[1200px]">

        {/* HEADER */}

        <header className="border-b border-line pb-10">
          <Link
            to="/admin"
            className="font-mono text-[10px] uppercase tracking-wide text-ink-faint hover:text-blue"
          >
            ← Admin dashboard
          </Link>

          <div className="mt-9">
            <span className="page-eyebrow">
              ADMIN / CONTACTS
            </span>

            <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <h1 className="font-display text-5xl font-semibold leading-[1.05] md:text-6xl">
                  Contacts.
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-6 text-ink-soft">
                  Review enquiries, feedback, and
                  support messages from the DocYard
                  community.
                </p>
              </div>

              <span className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
                {contacts.length} MESSAGES
              </span>
            </div>
          </div>
        </header>

        {/* ERROR */}

        {error && (
          <div className="mt-6 border border-line bg-paper-raised px-5 py-4 text-sm text-ink-soft">
            {error}
          </div>
        )}

        {/* CONTACTS */}

        <section className="py-10">

          {loading ? (
            <div className="flex min-h-[240px] items-center justify-center border border-line bg-white">
              <Loader />
            </div>
          ) : contacts.length === 0 ? (
            <div className="border border-line bg-white px-6 py-16 text-center">
              <EmptyState
                title="No messages found."
                message="There are currently no contact messages to review."
              />
            </div>
          ) : (
            <div className="border border-line bg-white">

              {/* TABLE HEADER */}

              <div className="hidden border-b border-line bg-paper-raised px-6 py-4 md:grid md:grid-cols-[1fr_170px_130px_150px] md:gap-6">
                <span className="table-heading">
                  MESSAGE
                </span>

                <span className="table-heading">
                  DATE
                </span>

                <span className="table-heading">
                  STATUS
                </span>

                <span className="table-heading text-right">
                  ACTION
                </span>
              </div>

              {/* CONTACT ITEMS */}

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
                    className="grid gap-5 border-b border-line px-6 py-7 last:border-b-0 md:grid-cols-[1fr_170px_130px_150px] md:items-center md:gap-6"
                  >

                    {/* MESSAGE */}

                    <div className="min-w-0">
                      <div className="flex items-start gap-3">
                        <span className="mt-1 font-mono text-[9px] text-blue">
                          MSG
                        </span>

                        <div className="min-w-0">
                          <h2 className="font-display text-lg font-semibold">
                            {subject}
                          </h2>

                          <p className="mt-1 text-xs text-ink-soft">
                            {name} · {email}
                          </p>

                          <p className="mt-3 line-clamp-2 text-sm leading-6 text-ink-soft">
                            {message}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* DATE */}

                    <div>
                      <span className="table-heading md:hidden">
                        DATE
                      </span>

                      <p className="mt-1 font-mono text-[10px] text-ink-faint md:mt-0">
                        {formatDate(date)}
                      </p>
                    </div>

                    {/* STATUS */}

                    <div>
                      <span className="table-heading md:hidden">
                        STATUS
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
                        className={`mt-2 border border-line bg-paper px-3 py-2 font-mono text-[9px] uppercase tracking-wide outline-none focus:border-ink md:mt-0 ${getStatusClass(
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

                    {/* ACTION */}

                    <div className="flex justify-start md:justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(contactId)
                        }
                        disabled={isLoading}
                        className="font-mono text-[9px] uppercase tracking-wide text-ink-faint transition-colors hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isLoading
                          ? "Processing..."
                          : "Delete"}
                      </button>
                    </div>

                  </article>
                );
              })}
            </div>
          )}

        </section>
      </div>
    </main>
  );
};

export default Contacts;