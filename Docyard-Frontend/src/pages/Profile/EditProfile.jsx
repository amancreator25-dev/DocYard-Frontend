import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getCurrentUser,
  updateProfile,
} from "../../services/auth.service.js";

const EditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    bio: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // LOAD PROFILE
  // ==========================================

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await getCurrentUser();

        const user =
          response?.data?.user ||
          response?.user ||
          response?.data ||
          null;

        if (!user) {
          setError("Unable to load profile.");
          return;
        }

        setFormData({
          username: user.username || "",
          bio: user.bio || "",
        });
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "Unable to load your profile."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // ==========================================
  // HANDLE CHANGE
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await updateProfile({
        username: formData.username.trim(),
        bio: formData.bio.trim(),
      });

      setSuccess(
        "Your profile has been updated."
      );

      setTimeout(() => {
        navigate("/profile");
      }, 700);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to update your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-paper px-6 py-16 text-ink md:px-12 md:py-20">

        <div className="mx-auto max-w-[760px]">

          <div className="h-3 w-24 bg-paper-raised" />

          <div className="mt-5 h-12 max-w-lg bg-paper-raised" />

          <div className="mt-4 h-4 max-w-md bg-paper-raised" />

          <div className="mt-10 h-[400px] bg-paper-raised" />

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-paper px-6 py-14 text-ink md:px-12 md:py-20">

      <div className="mx-auto max-w-[760px]">

        {/* ================================= */}
        {/* HEADER                            */}
        {/* ================================= */}

        <header className="border-b border-line pb-9">

          <Link
            to="/profile"
            className="font-mono text-[10px] uppercase tracking-wide text-ink-faint hover:text-blue"
          >
            ← Back to profile
          </Link>

          <div className="mt-9">

            <span className="page-eyebrow">
              ACCOUNT
            </span>

            <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.05] md:text-6xl">
              Edit profile.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-ink-soft">
              Update the information shown on
              your DocYard profile.
            </p>

          </div>

        </header>


        {/* ================================= */}
        {/* STATUS                            */}
        {/* ================================= */}

        {error && (
          <div className="mt-6 border border-line bg-paper-raised px-5 py-4 text-sm text-ink-soft">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-6 border border-line bg-white px-5 py-4 text-sm text-ink">
            {success}
          </div>
        )}


        {/* ================================= */}
        {/* FORM                              */}
        {/* ================================= */}

        <form
          onSubmit={handleSubmit}
          className="mt-10 border border-line bg-white p-6 md:p-8"
        >

          {/* USERNAME */}

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
              value={formData.username}
              onChange={handleChange}
              placeholder="Your username"
              className="form-input"
              required
            />

          </div>


          {/* BIO */}

          <div className="mt-7">

            <label
              htmlFor="bio"
              className="form-label"
            >
              Bio
            </label>

            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell the DocYard community about yourself..."
              rows={6}
              className="form-textarea"
            />

          </div>


          {/* ACTIONS */}

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line pt-7 sm:flex-row sm:justify-end">

            <Link
              to="/profile"
              className="btn btn-ghost text-center"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="btn btn-primary"
            >
              {saving
                ? "Saving..."
                : "Save changes →"}
            </button>

          </div>

        </form>

      </div>

    </main>
  );
};

export default EditProfile;