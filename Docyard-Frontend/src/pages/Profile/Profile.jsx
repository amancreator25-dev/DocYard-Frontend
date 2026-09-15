import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getCurrentUser,
  updateProfile,
  changePassword,
} from "../../services/auth.service.js";

const Profile = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    bio: "",
    role: "",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const [editingProfile, setEditingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ==========================================
  // LOAD USER
  // ==========================================

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getCurrentUser();

        const data =
          response?.data?.data?.user ||
          response?.data?.user ||
          response?.user ||
          response?.data ||
          null;

        if (data) {
          setProfile({
            username: data.username || "",
            email: data.email || "",
            bio: data.bio || "",
            role: data.role || "",
          });
        }
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "Unable to load your profile."
        );
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // ==========================================
  // INPUT HANDLERS
  // ==========================================

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPassword((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // UPDATE PROFILE
  // ==========================================

  const handleProfileSubmit = async (event) => {
    event.preventDefault();

    setSavingProfile(true);
    setMessage("");
    setError("");

    try {
      const response = await updateProfile({
        username: profile.username,
        bio: profile.bio,
      });

      const updatedUser =
        response?.data?.data?.user ||
        response?.data?.user ||
        response?.user ||
        null;

      if (updatedUser) {
        setProfile((previous) => ({
          ...previous,
          username:
            updatedUser.username ||
            previous.username,
          bio:
            updatedUser.bio ||
            previous.bio,
          role:
            updatedUser.role ||
            previous.role,
        }));
      }

      setMessage("Profile updated successfully.");
      setEditingProfile(false);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to update your profile."
      );
    } finally {
      setSavingProfile(false);
    }
  };

  // ==========================================
  // CHANGE PASSWORD
  // ==========================================

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (
      password.newPassword !==
      password.confirmPassword
    ) {
      setError("New passwords do not match.");
      return;
    }

    setSavingPassword(true);

    try {
      await changePassword({
        currentPassword: password.currentPassword,
        newPassword: password.newPassword,
      });

      setPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setMessage("Password changed successfully.");
      setChangingPassword(false);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to change your password."
      );
    } finally {
      setSavingPassword(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-paper px-6 py-10 md:px-10 lg:px-16">
        <div className="animate-pulse">
          <div className="h-10 w-56 bg-paper-raised" />

          <div className="mt-3 h-4 w-72 bg-paper-raised" />

          <div className="mt-10 h-72 w-full rounded-md bg-paper-raised" />

          <div className="mt-8 h-28 w-full rounded-md bg-paper-raised" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen border-t border-ink bg-paper text-ink">

      {/* TOP NAVIGATION */}

      <div className="flex flex-wrap justify-end gap-3 px-6 pt-7 md:px-10 lg:px-16">

        {profile.role === "admin" && (
          <Link
            to="/admin"
            className="inline-flex items-center justify-center rounded-md bg-[#0A3A63] px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.08em] !text-white transition-all duration-200 hover:bg-[#082F50]"
          >
            Admin Dashboard
          </Link>
        )}

        <Link
          to="/my-documents"
          className="inline-flex items-center justify-center rounded-md bg-ink px-5 py-2.5 text-xs font-semibold text-paper transition-all duration-200 hover:-translate-y-px hover:bg-blue"
        >
          My Documents
        </Link>

        <Link
          to="/bookmarks"
          className="inline-flex items-center justify-center rounded-md border border-ink bg-paper px-5 py-2.5 text-xs font-semibold text-ink transition-all duration-200 hover:-translate-y-px hover:bg-ink hover:text-paper"
        >
          Bookmarks
        </Link>

      </div>

      {/* STATUS */}

      {(message || error) && (
        <div className="px-6 pt-6 md:px-10 lg:px-16">
          <div
            className={`rounded-md px-5 py-3.5 text-sm ${
              error
                ? "bg-paper-raised text-ink-soft"
                : "bg-ink text-paper"
            }`}
          >
            {error || message}
          </div>
        </div>
      )}

      {/* PERSONAL INFORMATION */}

      <section className="px-6 pb-0 pt-8 md:px-10 lg:px-16">

        <div className="w-full overflow-hidden rounded-md border border-line bg-white">

          {/* CARD HEADER */}

          <div className="flex flex-col gap-6 border-b border-line px-7 py-7 md:flex-row md:items-center md:justify-between md:px-8">

            <div>
              <span className="page-eyebrow">
                PERSONAL INFORMATION
              </span>

              <h2 className="mt-2 font-display text-2xl font-semibold">
                Your details
              </h2>
            </div>

            {!editingProfile && (
              <button
                type="button"
                onClick={() => {
                  setEditingProfile(true);
                  setChangingPassword(false);
                  setMessage("");
                  setError("");
                }}
                className="inline-flex w-fit items-center justify-center rounded-md bg-ink px-6 py-3 text-xs font-semibold text-paper transition-all duration-200 hover:-translate-y-px hover:bg-blue"
              >
                Edit profile
              </button>
            )}

          </div>

          {/* PROFILE DETAILS */}

          {!editingProfile && (
            <div className="grid gap-9 px-7 py-8 md:grid-cols-2 md:px-8">

              <div>
                <span className="form-label">
                  Username
                </span>

                <p className="mt-2 text-sm font-medium">
                  {profile.username || "Not set"}
                </p>
              </div>

              <div>
                <span className="form-label">
                  Email
                </span>

                <p className="mt-2 break-all text-sm font-medium">
                  {profile.email || "Not available"}
                </p>
              </div>

              <div className="md:col-span-2">
                <span className="form-label">
                  Bio
                </span>

                <p className="mt-2 max-w-4xl text-sm leading-6 text-ink-soft">
                  {profile.bio || "No bio added yet."}
                </p>
              </div>

            </div>
          )}

          {/* EDIT FORM */}

          {editingProfile && (
            <form
              onSubmit={handleProfileSubmit}
              className="px-7 py-8 md:px-8"
            >

              <div className="grid gap-6 md:grid-cols-2">

                <div>
                  <label
                    htmlFor="username"
                    className="form-label"
                  >
                    Username
                  </label>

                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={profile.username}
                    onChange={handleProfileChange}
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="form-label"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={profile.email}
                    disabled
                    className="form-input cursor-not-allowed opacity-60"
                  />

                  <span className="form-help">
                    Email cannot be changed here.
                  </span>
                </div>

              </div>

              <div className="mt-6">
                <label
                  htmlFor="bio"
                  className="form-label"
                >
                  Bio
                </label>

                <textarea
                  id="bio"
                  name="bio"
                  value={profile.bio}
                  onChange={handleProfileChange}
                  placeholder="Tell us a little about yourself..."
                  rows={5}
                  className="form-textarea"
                />
              </div>

              <div className="mt-7 flex flex-wrap gap-3">

                <button
                  type="submit"
                  disabled={savingProfile}
                  className="inline-flex items-center justify-center rounded-md bg-ink px-6 py-3 text-xs font-semibold text-paper transition-all duration-200 hover:bg-blue disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {savingProfile
                    ? "Saving..."
                    : "Save changes"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditingProfile(false);
                    setMessage("");
                    setError("");
                  }}
                  className="inline-flex items-center justify-center rounded-md border border-line bg-paper px-6 py-3 text-xs font-semibold text-ink transition-all duration-200 hover:border-ink"
                >
                  Cancel
                </button>

              </div>

            </form>
          )}

        </div>
      </section>

      {/* PASSWORD */}

      <section className="px-6 py-8 md:px-10 lg:px-16 lg:py-8">

        <div className="w-full overflow-hidden rounded-md border border-line bg-white">

          {!changingPassword ? (
            <div className="flex flex-col gap-6 px-7 py-7 md:flex-row md:items-center md:justify-between md:px-8">

              <div>
                <h2 className="font-display text-2xl font-semibold">
                  Password
                </h2>

                <p className="mt-2 text-sm text-ink-soft">
                  Update your password whenever you need to.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setChangingPassword(true);
                  setEditingProfile(false);
                  setMessage("");
                  setError("");
                }}
                className="inline-flex w-fit items-center justify-center rounded-md bg-ink px-6 py-3 text-xs font-semibold text-paper transition-all duration-200 hover:-translate-y-px hover:bg-blue"
              >
                Change password
              </button>

            </div>
          ) : (
            <form
              onSubmit={handlePasswordSubmit}
              className="px-7 py-8 md:px-8"
            >

              <div className="mb-7">
                <h2 className="font-display text-2xl font-semibold">
                  Change password
                </h2>

                <p className="mt-2 text-sm text-ink-soft">
                  Enter your current password and choose a new one.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">

                <div className="md:col-span-2">
                  <label
                    htmlFor="currentPassword"
                    className="form-label"
                  >
                    Current password
                  </label>

                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={password.currentPassword}
                    onChange={handlePasswordChange}
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="form-label"
                  >
                    New password
                  </label>

                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={password.newPassword}
                    onChange={handlePasswordChange}
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="form-label"
                  >
                    Confirm password
                  </label>

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={password.confirmPassword}
                    onChange={handlePasswordChange}
                    className="form-input"
                    required
                  />
                </div>

              </div>

              <div className="mt-7 flex flex-wrap gap-3">

                <button
                  type="submit"
                  disabled={savingPassword}
                  className="inline-flex items-center justify-center rounded-md bg-ink px-6 py-3 text-xs font-semibold text-paper transition-all duration-200 hover:bg-blue disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {savingPassword
                    ? "Updating..."
                    : "Update password"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setChangingPassword(false);

                    setPassword({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });

                    setMessage("");
                    setError("");
                  }}
                  className="inline-flex items-center justify-center rounded-md border border-line bg-paper px-6 py-3 text-xs font-semibold text-ink transition-all duration-200 hover:border-ink"
                >
                  Cancel
                </button>

              </div>

            </form>
          )}

        </div>

      </section>

    </main>
  );
};

export default Profile;