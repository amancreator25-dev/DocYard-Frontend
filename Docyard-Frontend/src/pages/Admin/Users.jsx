import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../../services/admin.service.js";

import Loader from "../../components/Common/Loader.jsx";
import EmptyState from "../../components/Common/EmptyState.jsx";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllUsers();

      const data =
        response?.data?.data?.users ||
        response?.data?.users ||
        response?.users ||
        [];

      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to load users."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange = async (userId, role) => {
    try {
      setActionLoading(userId);
      setError("");

      await updateUserRole(userId, role);

      setUsers((previous) =>
        previous.map((user) => {
          const id = user._id || user.id;

          if (id !== userId) {
            return user;
          }

          return {
            ...user,
            role,
          };
        })
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to update user role."
      );
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(userId);
      setError("");

      await deleteUser(userId);

      setUsers((previous) =>
        previous.filter(
          (user) => (user._id || user.id) !== userId
        )
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to delete user."
      );
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString();
  };

  return (
    <main className="min-h-screen border-t border-ink bg-paper text-ink">

      <section className="px-6 pb-10 pt-12 md:px-10 md:pb-12 lg:px-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

          <div>
            <span className="page-eyebrow">
              ADMIN / USERS
            </span>

            <h1 className="mt-3 font-display text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-6xl lg:text-7xl">
              Users.
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-ink-soft md:text-base">
              Manage accounts and permissions across the
              DocYard community.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
              {users.length} USERS
            </span>

            <Link
              to="/admin"
              className="inline-flex items-center justify-center rounded-md border border-line bg-white px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-ink"
            >
              Dashboard
            </Link>
          </div>

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

      <section className="px-6 pb-16 md:px-10 lg:px-16">

        {loading ? (
          <div className="flex min-h-[260px] items-center justify-center rounded-md border border-line bg-white">
            <Loader />
          </div>
        ) : users.length === 0 ? (
          <div className="rounded-md border border-line bg-white px-6 py-16 text-center">
            <EmptyState
              title="No users found."
              message="There are currently no users to manage."
            />
          </div>
        ) : (
          <div className="overflow-hidden rounded-md border border-line bg-white">

            <div className="hidden border-b border-line bg-paper-raised px-6 py-4 md:grid md:grid-cols-[1fr_150px_130px_110px] md:gap-6">
              <span className="table-heading">
                USER
              </span>

              <span className="table-heading">
                JOINED
              </span>

              <span className="table-heading">
                ROLE
              </span>

              <span className="table-heading text-right">
                ACTION
              </span>
            </div>

            {users.map((user) => {
              const userId = user._id || user.id;

              const username =
                user.username ||
                user.fullname ||
                user.name ||
                "Unknown user";

              const email =
                user.email || "No email";

              const role =
                user.role || "user";

              const createdAt =
                user.createdAt ||
                user.created_at;

              const isLoading =
                actionLoading === userId;

              return (
                <article
                  key={userId}
                  className="grid gap-5 border-b border-line px-6 py-7 last:border-b-0 md:grid-cols-[1fr_150px_130px_110px] md:items-center md:gap-6"
                >

                  <div className="min-w-0">
                    <h2 className="truncate font-display text-xl font-semibold tracking-tight">
                      {username}
                    </h2>

                    <p className="mt-1 truncate text-xs text-ink-soft">
                      {email}
                    </p>
                  </div>

                  <div>
                    <span className="table-heading md:hidden">
                      JOINED
                    </span>

                    <p className="mt-1 font-mono text-[10px] text-ink-faint md:mt-0">
                      {formatDate(createdAt)}
                    </p>
                  </div>

                  <div>
                    <span className="table-heading md:hidden">
                      ROLE
                    </span>

                    <select
                      value={role}
                      onChange={(event) =>
                        handleRoleChange(
                          userId,
                          event.target.value
                        )
                      }
                      disabled={isLoading}
                      className="mt-2 rounded-md border border-line bg-paper px-3 py-2 font-mono text-[10px] uppercase tracking-[0.08em] outline-none transition-colors focus:border-ink md:mt-0"
                    >
                      <option value="user">
                        User
                      </option>

                      <option value="admin">
                        Admin
                      </option>
                    </select>
                  </div>

                  <div className="flex justify-start md:justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(userId)
                      }
                      disabled={isLoading}
                      className="inline-flex rounded-md border border-line px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-ink transition-all duration-200 hover:border-red-500 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
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

export default AdminUsers;
