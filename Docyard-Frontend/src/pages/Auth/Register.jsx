import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/auth.js";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
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

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      navigate("/login");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to create your account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-paper text-ink">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* BRAND PANEL */}

        <section className="hidden border-r border-line bg-ink p-12 text-paper lg:flex lg:flex-col lg:justify-between">

          <Link
            to="/"
            className="font-display text-3xl font-semibold"
          >
            DocYard<span className="text-blue">.</span>
          </Link>

          <div className="max-w-xl">

            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50">
              JOIN THE ARCHIVE
            </span>

            <h1 className="mt-5 font-display text-6xl font-semibold leading-[1.02]">
              Share
              <br />
              what matters.
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-paper/60">
              Create your account and become
              part of the DocYard document
              community.
            </p>

          </div>

          <p className="font-mono text-[9px] uppercase tracking-wide text-paper/40">
            DOCYARD / 2026
          </p>

        </section>


        {/* REGISTER PANEL */}

        <section className="flex min-h-screen items-center justify-center px-6 py-12 md:px-12">

          <div className="w-full max-w-[440px]">

            {/* MOBILE LOGO */}

            <Link
              to="/"
              className="font-display text-3xl font-semibold lg:hidden"
            >
              DocYard<span className="text-blue">.</span>
            </Link>


            {/* HEADING */}

            <div className="mt-12 lg:mt-0">

              <span className="page-eyebrow">
                CREATE ACCOUNT
              </span>

              <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
                Join DocYard.
              </h2>

              <p className="mt-4 text-sm leading-6 text-ink-soft">
                Create an account to save,
                share, and discover documents.
              </p>

            </div>


            {/* ERROR */}

            {error && (
              <div className="mt-7 border border-line bg-paper-raised px-4 py-3 text-sm text-ink-soft">
                {error}
              </div>
            )}


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="mt-8"
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
                  placeholder="Choose a username"
                  className="form-input"
                  autoComplete="username"
                  required
                />

              </div>


              {/* EMAIL */}

              <div className="mt-5">

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
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="form-input"
                  autoComplete="email"
                  required
                />

              </div>


              {/* PASSWORD */}

              <div className="mt-5">

                <label
                  htmlFor="password"
                  className="form-label"
                >
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="form-input"
                  autoComplete="new-password"
                  required
                />

              </div>


              {/* CONFIRM PASSWORD */}

              <div className="mt-5">

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
                  value={
                    formData.confirmPassword
                  }
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  className="form-input"
                  autoComplete="new-password"
                  required
                />

              </div>


              {/* SUBMIT */}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary mt-7 w-full"
              >
                {loading
                  ? "Creating account..."
                  : "Create account →"}
              </button>

            </form>


            {/* LOGIN */}

            <div className="mt-8 border-t border-line pt-7 text-center">

              <p className="text-sm text-ink-soft">
                Already have an account?
              </p>

              <Link
                to="/login"
                className="mt-2 inline-block font-mono text-[10px] uppercase tracking-wide text-blue hover:text-ink"
              >
                Sign in →
              </Link>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
};

export default Register;