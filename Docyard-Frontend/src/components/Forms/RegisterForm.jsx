import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterForm = ({
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (!formData.password) {
      setError("Please enter a password.");
      return;
    }

    if (formData.password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await onSubmit?.({
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to create your account."
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
          JOIN DOCYARD
        </span>

        <h2 className="mt-3 font-display text-3xl font-semibold">
          Create account.
        </h2>

        <p className="mt-2 text-sm leading-6 text-ink-soft">
          Start building your personal document
          archive.
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
          htmlFor="register-username"
          className="form-label"
        >
          Username
        </label>

        <input
          id="register-username"
          name="username"
          type="text"
          autoComplete="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Choose a username"
          className="form-input"
          disabled={loading}
        />
      </div>

      {/* EMAIL */}

      <div className="mt-6">
        <label
          htmlFor="register-email"
          className="form-label"
        >
          Email
        </label>

        <input
          id="register-email"
          name="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="form-input"
          disabled={loading}
        />
      </div>

      {/* PASSWORD */}

      <div className="mt-6">
        <label
          htmlFor="register-password"
          className="form-label"
        >
          Password
        </label>

        <input
          id="register-password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
          className="form-input"
          disabled={loading}
        />

        <p className="mt-2 text-xs text-ink-faint">
          Use at least 6 characters.
        </p>
      </div>

      {/* CONFIRM PASSWORD */}

      <div className="mt-6">
        <label
          htmlFor="register-confirm-password"
          className="form-label"
        >
          Confirm password
        </label>

        <input
          id="register-confirm-password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Repeat your password"
          className="form-input"
          disabled={loading}
        />
      </div>

      {/* SUBMIT */}

      <div className="mt-8 border-t border-line pt-6">
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Creating account..."
            : "Create account →"}
        </button>
      </div>

      {/* LOGIN */}

      <p className="mt-6 text-center text-sm text-ink-soft">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-ink underline decoration-line underline-offset-4 hover:text-blue"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;