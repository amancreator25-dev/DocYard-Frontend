import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getAdminDashboard,
  getContactStatistics,
} from "../../services/admin.service.js";

import Loader from "../../components/Common/Loader.jsx";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    documents: 0,
    likes: 0,
    bookmarks: 0,
    comments: 0,
    contacts: 0,
    publicDocuments: 0,
    privateDocuments: 0,
  });

  const [contactStats, setContactStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [dashboardResponse, contactResponse] = await Promise.all([
          getAdminDashboard(),
          getContactStatistics(),
        ]);

        const dashboardData =
          dashboardResponse?.data?.data?.statistics || {};

        const contactsData =
          contactResponse?.data?.data?.statistics || {};

        setStats({
          users: dashboardData.totalUsers ?? 0,
          documents: dashboardData.totalDocuments ?? 0,
          likes: dashboardData.totalLikes ?? 0,
          bookmarks: dashboardData.totalBookmarks ?? 0,
          comments: dashboardData.totalComments ?? 0,
          contacts: dashboardData.totalContacts ?? 0,
          publicDocuments: dashboardData.publicDocuments ?? 0,
          privateDocuments: dashboardData.privateDocuments ?? 0,
        });

        setContactStats({
          total: contactsData.total ?? 0,
          pending: contactsData.pending ?? 0,
          inProgress: contactsData.inProgress ?? 0,
          resolved: contactsData.resolved ?? 0,
        });
      } catch (err) {
        console.error("Admin dashboard error:", err);

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
      label: "USERS",
      value: stats.users,
      link: "/admin/users",
      description: "Registered accounts",
    },
    {
      label: "DOCUMENTS",
      value: stats.documents,
      link: "/admin/documents",
      description: "Documents in archive",
    },
    {
      label: "LIKES",
      value: stats.likes,
      description: "Document engagement",
    },
    {
      label: "BOOKMARKS",
      value: stats.bookmarks,
      description: "Saved documents",
    },
    {
      label: "COMMENTS",
      value: stats.comments,
      description: "Community comments",
    },
    {
      label: "CONTACTS",
      value: stats.contacts,
      link: "/admin/contacts",
      description: "Community messages",
    },
    {
      label: "PUBLIC",
      value: stats.publicDocuments,
      link: "/admin/documents?visibility=public",
      description: "Public documents",
    },
    {
      label: "PRIVATE",
      value: stats.privateDocuments,
      link: "/admin/documents?visibility=private",
      description: "Private documents",
    },
  ];

  const managementCards = [
    {
      number:'1',
      title: "Users",
      description:
        "View registered users and manage their accounts.",
      link: "/admin/users",
      action: "Manage users",
    },
    {
      number:'2',
      title: "Documents",
      description:
        "Review and manage documents in the archive.",
      link: "/admin/documents",
      action: "Manage documents",
    },
    {
      number:'3',
      title: "Contacts",
      description:
        "Review messages and manage community enquiries.",
      link: "/admin/contacts",
      action: "View messages",
    },
  ];

  return (
    <main className="min-h-screen border-t border-ink bg-paper text-ink">
      <section className="px-6 pb-10 pt-12 md:px-10 md:pb-12 lg:px-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="page-eyebrow">
              ADMINISTRATION
            </span>

            <h1 className="mt-3 font-display text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-6xl lg:text-7xl">
              Dashboard.
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-ink-soft md:text-base">
              Manage the DocYard archive, users, documents,
              and community activity from one place.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex w-fit items-center justify-center rounded-md border border-line bg-white px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-ink"
          >
            View DocYard
          </Link>
        </div>
      </section>

      {error && (
        <section className="px-6 pb-8 md:px-10 lg:px-16">
          <div
            className="rounded-md border border-line bg-paper-raised px-5 py-4 text-sm text-ink-soft"
            role="alert"
          >
            {error}
          </div>
        </section>
      )}

      <section className="px-6 pb-12 md:px-10 lg:px-16">
        <div className="mb-7">
          <span className="page-eyebrow">
            OVERVIEW
          </span>

          <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">
            Archive at a glance.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => {
            const content = (
              <>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-blue">
                  {stat.label}
                </span>

                <div className="mt-8">
                  {loading ? (
                    <div className="flex h-14 items-center">
                      <Loader />
                    </div>
                  ) : (
                    <span className="font-display text-5xl font-semibold tracking-tight md:text-6xl">
                      {stat.value.toLocaleString()}
                    </span>
                  )}
                </div>

                <p className="mt-5 text-xs leading-5 text-ink-soft">
                  {stat.description}
                </p>
              </>
            );

            return stat.link ? (
              <Link
                key={stat.label}
                to={stat.link}
                className="group rounded-md border border-line bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/40 hover:shadow-sm md:p-7"
              >
                {content}
              </Link>
            ) : (
              <div
                key={stat.label}
                className="rounded-md border border-line bg-white p-6 md:p-7"
              >
                {content}
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-line px-6 py-12 md:px-10 md:py-16 lg:px-16">
        <div className="mb-7">
          <span className="page-eyebrow">
            CONTACT ACTIVITY
          </span>

          <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">
            Enquiry status.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatusCard
            label="TOTAL"
            value={contactStats.total}
            loading={loading}
          />

          <StatusCard
            label="PENDING"
            value={contactStats.pending}
            loading={loading}
          />

          <StatusCard
            label="IN PROGRESS"
            value={contactStats.inProgress}
            loading={loading}
          />

          <StatusCard
            label="RESOLVED"
            value={contactStats.resolved}
            loading={loading}
          />
        </div>
      </section>

      <section className="border-t border-line px-6 py-12 md:px-10 md:py-16 lg:px-16">
        <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="page-eyebrow">
              MANAGEMENT
            </span>

            <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">
              Manage DocYard.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-ink-soft">
            Access the areas of the platform that require
            administrative control.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {managementCards.map((card) => (
            <Link
              key={card.number}
              to={card.link}
              className="group flex min-h-[260px] flex-col rounded-md border border-line bg-white p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/40 hover:shadow-sm md:p-8"
            >

              <div className="mt-auto pt-12">
                <h3 className="font-display text-3xl font-semibold tracking-tight">
                  {card.title}
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-6 text-ink-soft">
                  {card.description}
                </p>
              </div>

              <div className="mt-7">
                <span className="inline-flex rounded-md bg-[#0A3A63] px-5 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] !text-[#ffffff] transition-all duration-200 group-hover:bg-[#0A3A63]">
                  {card.action}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

const StatusCard = ({ label, value, loading }) => {
  return (
    <div className="rounded-md border border-line bg-white p-6 md:p-7">
      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-blue">
        {label}
      </span>

      <div className="mt-8">
        {loading ? (
          <div className="flex h-14 items-center">
            <Loader />
          </div>
        ) : (
          <span className="font-display text-5xl font-semibold tracking-tight">
            {value.toLocaleString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;