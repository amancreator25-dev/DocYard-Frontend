import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getAdminStats,
} from "../../services/admin.js";

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    documents: 0,
    contacts: 0,
    pendingContacts: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await getAdminStats();

        const data =
          response?.data?.stats ||
          response?.stats ||
          response?.data ||
          {};

        setStats({
          users:
            data.users ||
            data.totalUsers ||
            0,

          documents:
            data.documents ||
            data.totalDocuments ||
            0,

          contacts:
            data.contacts ||
            data.totalContacts ||
            0,

          pendingContacts:
            data.pendingContacts ||
            data.pending ||
            0,
        });
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "Unable to load dashboard statistics."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const statCards = [
    {
      label: "TOTAL USERS",
      value: stats.users,
      link: "/admin/users",
    },
    {
      label: "DOCUMENTS",
      value: stats.documents,
      link: "/admin/documents",
    },
    {
      label: "CONTACT MESSAGES",
      value: stats.contacts,
      link: "/admin/contacts",
    },
    {
      label: "PENDING",
      value: stats.pendingContacts,
      link: "/admin/contacts",
    },
  ];

  return (
    <main className="min-h-screen bg-paper px-6 py-14 text-ink md:px-12 md:py-20">

      <div className="mx-auto max-w-[1180px]">

        {/* ==========================================
            HEADER
        ========================================== */}

        <header className="border-b border-line pb-10">

          <span className="page-eyebrow">
            ADMIN / OVERVIEW
          </span>

          <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <h1 className="font-display text-5xl font-semibold leading-[1.05] md:text-6xl">
                Dashboard.
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-ink-soft">
                Manage DocYard and keep track of
                what's happening across the archive.
              </p>

            </div>

            <span className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
              ADMIN CONTROL CENTER
            </span>

          </div>

        </header>


        {/* ==========================================
            ERROR
        ========================================== */}

        {error && (
          <div className="mt-6 border border-line bg-paper-raised px-5 py-4 text-sm text-ink-soft">
            {error}
          </div>
        )}


        {/* ==========================================
            STATISTICS
        ========================================== */}

        <section className="py-12">

          <div className="mb-7">

            <span className="page-eyebrow">
              OVERVIEW
            </span>

            <h2 className="mt-2 font-display text-3xl font-semibold">
              Archive statistics
            </h2>

          </div>


          <div className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">

            {statCards.map((stat) => (
              <Link
                key={stat.label}
                to={stat.link}
                className="group border-b border-r border-line bg-white p-6 transition-colors hover:bg-paper-raised md:p-7"
              >

                <span className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
                  {stat.label}
                </span>

                <div className="mt-5">

                  {loading ? (
                    <div className="h-12 w-20 bg-paper-raised" />
                  ) : (
                    <span className="font-display text-5xl font-semibold">
                      {stat.value}
                    </span>
                  )}

                </div>

                <div className="mt-7 flex items-center justify-between border-t border-line pt-4">

                  <span className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
                    View
                  </span>

                  <span className="text-sm text-blue transition-transform group-hover:translate-x-1">
                    →
                  </span>

                </div>

              </Link>
            ))}

          </div>

        </section>


        {/* ==========================================
            MANAGEMENT
        ========================================== */}

        <section className="border-t border-line py-12">

          <div className="mb-8">

            <span className="page-eyebrow">
              MANAGEMENT
            </span>

            <h2 className="mt-2 font-display text-3xl font-semibold">
              Quick access
            </h2>

          </div>


          <div className="grid gap-4 md:grid-cols-3">

            {/* USERS */}

            <Link
              to="/admin/users"
              className="group border border-line bg-white p-7 transition-colors hover:bg-paper-raised"
            >

              <span className="font-mono text-[10px] text-blue">
                01
              </span>

              <h3 className="mt-5 font-display text-2xl font-semibold">
                Users
              </h3>

              <p className="mt-3 text-sm leading-6 text-ink-soft">
                View and manage registered DocYard
                users.
              </p>

              <div className="mt-8 border-t border-line pt-4 font-mono text-[9px] uppercase tracking-wide text-ink-faint">
                Manage users →
              </div>

            </Link>


            {/* DOCUMENTS */}

            <Link
              to="/admin/documents"
              className="group border border-line bg-white p-7 transition-colors hover:bg-paper-raised"
            >

              <span className="font-mono text-[10px] text-blue">
                02
              </span>

              <h3 className="mt-5 font-display text-2xl font-semibold">
                Documents
              </h3>

              <p className="mt-3 text-sm leading-6 text-ink-soft">
                Review and manage documents in the
                archive.
              </p>

              <div className="mt-8 border-t border-line pt-4 font-mono text-[9px] uppercase tracking-wide text-ink-faint">
                Manage documents →
              </div>

            </Link>


            {/* CONTACTS */}

            <Link
              to="/admin/contacts"
              className="group border border-line bg-white p-7 transition-colors hover:bg-paper-raised"
            >

              <span className="font-mono text-[10px] text-blue">
                03
              </span>

              <h3 className="mt-5 font-display text-2xl font-semibold">
                Contacts
              </h3>

              <p className="mt-3 text-sm leading-6 text-ink-soft">
                Review messages and respond to
                community enquiries.
              </p>

              <div className="mt-8 border-t border-line pt-4 font-mono text-[9px] uppercase tracking-wide text-ink-faint">
                View messages →
              </div>

            </Link>

          </div>

        </section>


        {/* ==========================================
            ADMIN NOTE
        ========================================== */}

        <section className="border-t border-line py-10">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>

              <span className="page-eyebrow">
                DOCYARD ADMIN
              </span>

              <p className="mt-2 text-sm text-ink-soft">
                Use the sections above to manage the
                platform.
              </p>

            </div>

            <Link
              to="/"
              className="font-mono text-[10px] uppercase tracking-wide text-ink-faint hover:text-blue"
            >
              Return to DocYard →
            </Link>

          </div>

        </section>

      </div>

    </main>
  );
};

export default Dashboard;