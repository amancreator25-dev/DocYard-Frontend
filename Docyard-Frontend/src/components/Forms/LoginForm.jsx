import { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = ({
  onSubmit,
  loading = false,
  initialEmail = "",
}) => {
  const [formData, setFormData] = useState({
    email: initialEmail,
    password: "",
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

    if (!formData.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!formData.password) {
      setError("Please enter your password.");
      return;
    }

    try {
      await onSubmit?.({
        email: formData.email.trim(),
        password: formData.password,
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to sign in. Please check your credentials."
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
          WELCOME BACK
        </span>

        <h2 className="mt-3 font-display text-3xl font-semibold">
          Sign in.
        </h2>

        <p className="mt-2 text-sm leading-6 text-ink-soft">
          Access your DocYard account.
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

      {/* EMAIL */}

      <div>
        <label
          htmlFor="login-email"
          className="form-label"
        >
          Email
        </label>

        <input
          id="login-email"
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
        <div className="flex items-center justify-between gap-4">
          <label
            htmlFor="login-password"
            className="form-label"
          >
            Password
          </label>

          <Link
            to="/forgot-password"
            className="font-mono text-[9px] uppercase tracking-wide text-ink-faint hover:text-blue"
          >
            Forgot?
          </Link>
        </div>

        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Your password"
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
            ? "Signing in..."
            : "Sign in →"}
        </button>
      </div>

      {/* REGISTER */}

      <p className="mt-6 text-center text-sm text-ink-soft">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-ink underline decoration-line underline-offset-4 hover:text-blue"
        >
          Create one
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;