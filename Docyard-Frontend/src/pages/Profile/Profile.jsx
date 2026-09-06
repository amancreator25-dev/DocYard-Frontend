import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getCurrentUser,
  updateProfile,
  changePassword,
} from "../../services/auth.service.js";

const Profile = () => {
  const [user, setUser] = useState(null);

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    bio: "",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] =
    useState(false);
  const [savingPassword, setSavingPassword] =
    useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ==========================================
  // LOAD USER
  // ==========================================

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);

      try {
        const response = await getCurrentUser();

        const data =
          response?.data?.user ||
          response?.user ||
          response?.data ||
          null;

        if (data) {
          setUser(data);

          setProfile({
            username: data.username || "",
            email: data.email || "",
            bio: data.bio || "",
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
  // PROFILE CHANGE
  // ==========================================

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // PASSWORD CHANGE
  // ==========================================

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
      const response =
        await updateProfile({
          username: profile.username,
          bio: profile.bio,
        });

      const updatedUser =
        response?.data?.user ||
        response?.user ||
        null;

      if (updatedUser) {
        setUser(updatedUser);

        setProfile((previous) => ({
          ...previous,
          username:
            updatedUser.username ||
            previous.username,
          bio:
            updatedUser.bio ||
            previous.bio,
        }));
      }

      setMessage("Profile updated successfully.");
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
  // UPDATE PASSWORD
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
        currentPassword:
          password.currentPassword,
        newPassword:
          password.newPassword,
      });

      setPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setMessage("Password changed successfully.");
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
      <main className="min-h-screen bg-paper px-6 py-16 md:px-12">
        <div className="mx-auto max-w-[1180px]">

          <div className="h-3 w-24 bg-paper-raised" />

          <div className="mt-5 h-12 max-w-lg bg-paper-raised" />

          <div className="mt-4 h-4 max-w-md bg-paper-raised" />

          <div className="mt-12 h-64 bg-paper-raised" />

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-paper px-6 py-14 text-ink md:px-12 md:py-20">

      <div className="mx-auto max-w-[1180px]">

        {/* ================================= */}
        {/* HEADER                            */}
        {/* ================================= */}

        <header className="border-b border-line pb-10">

          <span className="page-eyebrow">
            ACCOUNT
          </span>

          <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.05] md:text-6xl">
            Your Profile
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-ink-soft">
            Manage your DocYard account and
            personal information.
          </p>

        </header>


        {/* ================================= */}
        {/* STATUS                            */}
        {/* ================================= */}

        {(message || error) && (
          <div
            className={`mt-6 border px-5 py-4 text-sm ${
              error
                ? "border-line bg-paper-raised text-ink-soft"
                : "border-line bg-white text-ink"
            }`}
          >
            {error || message}
          </div>
        )}


        {/* ================================= */}
        {/* PROFILE GRID                       */}
        {/* ================================= */}

        <div className="grid gap-12 py-12 lg:grid-cols-[280px_minmax(0,1fr)]">

          {/* SIDEBAR */}

          <aside>

            <div className="border-t border-line">

              <div className="border-b border-line py-5">

                <span className="page-eyebrow">
                  ACCOUNT
                </span>

              </div>

              <div className="border-b border-line py-5">

                <div className="flex h-16 w-16 items-center justify-center bg-ink font-display text-2xl text-paper">
                  {(
                    profile.username ||
                    "U"
                  )
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <h2 className="mt-5 font-display text-2xl font-semibold">
                  {profile.username ||
                    "User"}
                </h2>

                <p className="mt-1 break-all text-xs text-ink-soft">
                  {profile.email}
                </p>

              </div>

              <nav className="divide-y divide-line">

                <Link
                  to="/my-documents"
                  className="block py-4 font-mono text-[10px] uppercase tracking-wide text-ink-faint transition-colors hover:text-blue"
                >
                  My documents →
                </Link>

                <Link
                  to="/bookmarks"
                  className="block py-4 font-mono text-[10px] uppercase tracking-wide text-ink-faint transition-colors hover:text-blue"
                >
                  Bookmarks →
                </Link>

              </nav>

            </div>

          </aside>


          {/* FORMS */}

          <div className="space-y-12">

            {/* ================================= */}
            {/* PERSONAL INFORMATION              */}
            {/* ================================= */}

            <section>

              <div className="mb-7 border-b border-line pb-5">

                <span className="page-eyebrow">
                  PROFILE
                </span>

                <h2 className="mt-2 font-display text-3xl font-semibold">
                  Personal information
                </h2>

              </div>

              <form
                onSubmit={handleProfileSubmit}
                className="border border-line bg-white p-6 md:p-8"
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
                      onChange={
                        handleProfileChange
                      }
                      className="form-input"
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
                      name="email"
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
                    onChange={
                      handleProfileChange
                    }
                    placeholder="Tell the DocYard community a little about yourself..."
                    rows={5}
                    className="form-textarea"
                  />

                </div>


                <div className="mt-7 flex justify-end">

                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="btn btn-primary"
                  >
                    {savingProfile
                      ? "Saving..."
                      : "Save profile"}
                  </button>

                </div>

              </form>

            </section>


            {/* ================================= */}
            {/* PASSWORD                           */}
            {/* ================================= */}

            <section>

              <div className="mb-7 border-b border-line pb-5">

                <span className="page-eyebrow">
                  SECURITY
                </span>

                <h2 className="mt-2 font-display text-3xl font-semibold">
                  Change password
                </h2>

              </div>

              <form
                onSubmit={handlePasswordSubmit}
                className="border border-line bg-white p-6 md:p-8"
              >

                <div className="space-y-6">

                  <div>

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
                      value={
                        password.currentPassword
                      }
                      onChange={
                        handlePasswordChange
                      }
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
                      value={
                        password.newPassword
                      }
                      onChange={
                        handlePasswordChange
                      }
                      className="form-input"
                      required
                    />

                  </div>


                  <div>

                    <label
                      htmlFor="confirmPassword"
                      className="form-label"
                    >
                      Confirm new password
                    </label>

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={
                        password.confirmPassword
                      }
                      onChange={
                        handlePasswordChange
                      }
                      className="form-input"
                      required
                    />

                  </div>

                </div>


                <div className="mt-7 flex justify-end">

                  <button
                    type="submit"
                    disabled={savingPassword}
                    className="btn btn-primary"
                  >
                    {savingPassword
                      ? "Updating..."
                      : "Change password"}
                  </button>

                </div>

              </form>

            </section>

          </div>

        </div>

      </div>

    </main>
  );
};

export default Profile;