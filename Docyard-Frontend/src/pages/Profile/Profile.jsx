import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getCurrentUser,
  updateProfile,
  changePassword,
  logoutUser,
} from "../services/auth.js";

import useAuth from "../hooks/useAuth.js";

const Profile = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [user, setUser] = useState(null);

  const [profile, setProfile] = useState({
    username: "",
    fullName: "",
    email: "",
    bio: "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [changingPassword, setChangingPassword] =
    useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] =
    useState("");

  const [error, setError] = useState("");

  // ======================================
  // LOAD USER
  // ======================================

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getCurrentUser();

        const currentUser =
          response?.data?.user ||
          response?.user ||
          response?.data ||
          null;

        if (!currentUser) {
          setError("Unable to load your profile.");
          return;
        }

        setUser(currentUser);

        setProfile({
          username: currentUser.username || "",
          fullName:
            currentUser.fullName ||
            currentUser.name ||
            "",
          email: currentUser.email || "",
          bio: currentUser.bio || "",
        });
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Unable to load your profile."
        );
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // ======================================
  // PROFILE INPUT
  // ======================================

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));

    setProfileMessage("");
    setError("");
  };

  // ======================================
  // PASSWORD INPUT
  // ======================================

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswords((previous) => ({
      ...previous,
      [name]: value,
    }));

    setPasswordMessage("");
    setError("");
  };

  // ======================================
  // UPDATE PROFILE
  // ======================================

  const handleProfileSubmit = async (event) => {
    event.preventDefault();

    setSavingProfile(true);
    setProfileMessage("");
    setError("");

    try {
      const response = await updateProfile({
        fullName: profile.fullName,
        bio: profile.bio,
      });

      const updatedUser =
        response?.data?.user ||
        response?.user ||
        null;

      if (updatedUser) {
        setUser(updatedUser);
      }

      setProfileMessage(
        "Profile updated successfully."
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to update your profile."
      );
    } finally {
      setSavingProfile(false);
    }
  };

  // ======================================
  // CHANGE PASSWORD
  // ======================================

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();

    setPasswordMessage("");
    setError("");

    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      setError("Please fill in all password fields.");
      return;
    }

    if (
      passwords.newPassword !==
      passwords.confirmPassword
    ) {
      setError("New passwords do not match.");
      return;
    }

    if (passwords.newPassword.length < 8) {
      setError(
        "New password must be at least 8 characters."
      );
      return;
    }

    setChangingPassword(true);

    try {
      await changePassword({
        currentPassword:
          passwords.currentPassword,
        newPassword: passwords.newPassword,
      });

      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setPasswordMessage(
        "Password changed successfully."
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to change your password."
      );
    } finally {
      setChangingPassword(false);
    }
  };

  // ======================================
  // LOGOUT
  // ======================================

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await logoutUser();
    } catch {
      // Token is removed by the auth service
      // even if the server request fails.
    } finally {
      setLoggingOut(false);
      navigate("/");
    }
  };

  // ======================================
  // LOGIN REQUIRED
  // ======================================

  if (!isAuthenticated) {
    return (
      <main className="profile-page">
        <div className="container">

          <div className="profile-empty">

            <span className="page-eyebrow">
              DOCYARD
            </span>

            <h1>Account</h1>

            <p>
              Sign in to access your profile.
            </p>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>

          </div>

        </div>
      </main>
    );
  }

  // ======================================
  // LOADING
  // ======================================

  if (loading) {
    return (
      <main className="profile-page">
        <div className="container">

          <div className="profile-loading">
            Loading profile...
          </div>

        </div>
      </main>
    );
  }

  // ======================================
  // PAGE
  // ======================================

  return (
    <main className="profile-page">

      <div className="container">

        {/* ================================= */}
        {/* HEADER                             */}
        {/* ================================= */}

        <header className="profile-header">

          <div>

            <span className="page-eyebrow">
              ACCOUNT
            </span>

            <h1>Profile</h1>

            <p>
              Manage your DocYard account and
              personal information.
            </p>

          </div>

          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => navigate("/my-documents")}
          >
            My documents
          </button>

        </header>


        {/* ================================= */}
        {/* ERROR                              */}
        {/* ================================= */}

        {error && (
          <div className="profile-alert">
            {error}
          </div>
        )}


        {/* ================================= */}
        {/* PROFILE INFORMATION                */}
        {/* ================================= */}

        <section className="profile-section">

          <div className="profile-section-heading">

            <span>
              01
            </span>

            <div>
              <h2>
                Personal information
              </h2>

              <p>
                Information displayed on your
                DocYard profile.
              </p>
            </div>

          </div>


          <form
            className="profile-form"
            onSubmit={handleProfileSubmit}
          >

            {/* USERNAME */}

            <div className="profile-field">

              <label htmlFor="username">
                Username
              </label>

              <input
                id="username"
                name="username"
                type="text"
                value={profile.username}
                disabled
              />

              <small>
                Username cannot be changed here.
              </small>

            </div>


            {/* EMAIL */}

            <div className="profile-field">

              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                disabled
              />

              <small>
                Your account email address.
              </small>

            </div>


            {/* NAME */}

            <div className="profile-field">

              <label htmlFor="fullName">
                Full name
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                value={profile.fullName}
                onChange={handleProfileChange}
                placeholder="Your name"
                maxLength={100}
              />

            </div>


            {/* BIO */}

            <div className="profile-field">

              <label htmlFor="bio">
                About
              </label>

              <textarea
                id="bio"
                name="bio"
                value={profile.bio}
                onChange={handleProfileChange}
                placeholder="Tell the DocYard community a little about yourself..."
                rows={5}
                maxLength={500}
              />

            </div>


            <div className="profile-form-footer">

              {profileMessage && (
                <span className="profile-success">
                  {profileMessage}
                </span>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                disabled={savingProfile}
              >
                {savingProfile
                  ? "Saving..."
                  : "Save changes"}
              </button>

            </div>

          </form>

        </section>


        {/* ================================= */}
        {/* SECURITY                            */}
        {/* ================================= */}

        <section className="profile-section">

          <div className="profile-section-heading">

            <span>
              02
            </span>

            <div>
              <h2>
                Security
              </h2>

              <p>
                Keep your DocYard account secure.
              </p>
            </div>

          </div>


          <form
            className="profile-form"
            onSubmit={handlePasswordSubmit}
          >

            {/* CURRENT PASSWORD */}

            <div className="profile-field">

              <label htmlFor="currentPassword">
                Current password
              </label>

              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={
                  passwords.currentPassword
                }
                onChange={handlePasswordChange}
                autoComplete="current-password"
              />

            </div>


            {/* NEW PASSWORD */}

            <div className="profile-field">

              <label htmlFor="newPassword">
                New password
              </label>

              <input
                id="newPassword"
                name="newPassword"
                type="password"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                autoComplete="new-password"
              />

            </div>


            {/* CONFIRM */}

            <div className="profile-field">

              <label htmlFor="confirmPassword">
                Confirm new password
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={
                  passwords.confirmPassword
                }
                onChange={handlePasswordChange}
                autoComplete="new-password"
              />

            </div>


            <div className="profile-form-footer">

              {passwordMessage && (
                <span className="profile-success">
                  {passwordMessage}
                </span>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                disabled={changingPassword}
              >
                {changingPassword
                  ? "Updating..."
                  : "Change password"}
              </button>

            </div>

          </form>

        </section>


        {/* ================================= */}
        {/* ACCOUNT                            */}
        {/* ================================= */}

        <section className="profile-section profile-danger-section">

          <div className="profile-section-heading">

            <span>
              03
            </span>

            <div>
              <h2>
                Account
              </h2>

              <p>
                Sign out of your DocYard account.
              </p>
            </div>

          </div>

          <div className="profile-logout">

            <div>
              <strong>
                Sign out
              </strong>

              <p>
                You'll need to sign in again to
                access your account.
              </p>
            </div>

            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleLogout}
              disabled={loggingOut}
            >
              {loggingOut
                ? "Signing out..."
                : "Sign out"}
            </button>

          </div>

        </section>

      </div>

    </main>
  );
};

export default Profile;