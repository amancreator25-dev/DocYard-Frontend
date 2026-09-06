import { useState } from "react";

const ProfileForm = ({
  user = {},
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    username: user.username || "",
    email: user.email || "",
    bio: user.bio || "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!formData.username.trim()) {
      setError("Please enter a username.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    try {
      await onSubmit?.({
        username: formData.username.trim(),
        email: formData.email.trim(),
        bio: formData.bio.trim(),
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to update your profile."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-line bg-white p-6 md:p-8"
    >
      {/* HEADER */}

      <div className="mb-8 border-b border-line pb-5">
        <span className="page-eyebrow">
          YOUR PROFILE
        </span>

        <h2 className="mt-3 font-display text-3xl font-semibold">
          Edit profile.
        </h2>

        <p className="mt-2 text-sm leading-6 text-ink-soft">
          Keep your DocYard profile information up to date.
        </p>
      </div>

      {/* ERROR */}

      {error && (
        <div
          className="mb-6 border border-line bg-paper-raised px-5 py-4 text-sm text-ink-soft"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* USERNAME */}

      <div>
        <label
          htmlFor="profile-username"
          className="form-label"
        >
          Username
        </label>

        <input
          id="profile-username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="Your username"
          className="form-input"
          disabled={loading}
        />
      </div>

      {/* EMAIL */}

      <div className="mt-6">
        <label
          htmlFor="profile-email"
          className="form-label"
        >
          Email
        </label>

        <input
          id="profile-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="form-input"
          disabled={loading}
        />
      </div>

      {/* BIO */}

      <div className="mt-6">
        <label
          htmlFor="profile-bio"
          className="form-label"
        >
          Bio
        </label>

        <textarea
          id="profile-bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Tell the DocYard community a little about yourself..."
          rows={5}
          maxLength={500}
          className="form-input min-h-[130px] resize-y"
          disabled={loading}
        />

        <div className="mt-2 text-right font-mono text-[9px] text-ink-faint">
          {formData.bio.length}/500
        </div>
      </div>

      {/* ACTION */}

      <div className="mt-8 flex justify-end border-t border-line pt-6">
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : "Save changes →"}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;