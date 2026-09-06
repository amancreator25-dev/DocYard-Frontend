import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../../services/admin.service.js";

import Loader from "../../components/Common/Loader.jsx";
import EmptyState from "../../components/Common/EmptyState.jsx";

const Users = () => {
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
        response?.data?.users ||
        response?.users ||
        response?.data ||
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
        previous.filter((user) => {
          const id = user._id || user.id;
          return id !== userId;
        })
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
              ADMIN / USERS
            </span>

            <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <h1 className="font-display text-5xl font-semibold leading-[1.05] md:text-6xl">
                  Users.
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-6 text-ink-soft">
                  Manage accounts and permissions
                  across the DocYard community.
                </p>
              </div>

              <span className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
                {users.length} USERS
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

        {/* USERS */}

        <section className="py-10">

          {loading ? (
            <div className="flex min-h-[260px] items-center justify-center border border-line bg-white">
              <Loader />
            </div>
          ) : users.length === 0 ? (
            <div className="border border-line bg-white px-6 py-16 text-center">
              <EmptyState
                title="No users found."
                message="There are currently no users to manage."
              />
            </div>
          ) : (
            <div className="border border-line bg-white">

              {/* TABLE HEADER */}

              <div className="hidden border-b border-line bg-paper-raised px-6 py-4 md:grid md:grid-cols-[1fr_190px_130px_140px] md:gap-6">
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

              {/* USERS */}

              {users.map((user) => {
                const userId =
                  user._id || user.id;

                const username =
                  user.username ||
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
                  <div
                    key={userId}
                    className="grid gap-5 border-b border-line px-6 py-6 last:border-b-0 md:grid-cols-[1fr_190px_130px_140px] md:items-center md:gap-6"
                  >

                    {/* USER */}

                    <div className="min-w-0">
                      <div className="flex items-start gap-3">

                        <span className="mt-1 font-mono text-[9px] text-blue">
                          USER
                        </span>

                        <div className="min-w-0">
                          <h2 className="truncate font-display text-lg font-semibold">
                            {username}
                          </h2>

                          <p className="mt-1 truncate text-xs text-ink-soft">
                            {email}
                          </p>
                        </div>

                      </div>
                    </div>

                    {/* JOINED */}

                    <div>
                      <span className="table-heading md:hidden">
                        JOINED
                      </span>

                      <p className="mt-1 font-mono text-[10px] text-ink-faint md:mt-0">
                        {formatDate(createdAt)}
                      </p>
                    </div>

                    {/* ROLE */}

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
                        className="mt-2 border border-line bg-paper px-3 py-2 font-mono text-[9px] uppercase tracking-wide outline-none focus:border-ink md:mt-0"
                      >
                        <option value="user">
                          User
                        </option>

                        <option value="admin">
                          Admin
                        </option>
                      </select>
                    </div>

                    {/* ACTION */}

                    <div className="flex justify-start md:justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(userId)
                        }
                        disabled={isLoading}
                        className="font-mono text-[9px] uppercase tracking-wide text-ink-faint transition-colors hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isLoading
                          ? "Processing..."
                          : "Delete"}
                      </button>
                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </section>
      </div>
    </main>
  );
};

export default Users;