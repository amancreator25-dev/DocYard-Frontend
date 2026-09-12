import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../../services/auth.service.js";

import RegisterForm from "../../components/Forms/RegisterForm.jsx";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

    setError("");

    // Full name validation
    if (!formData.fullname.trim()) {
      setError("Please enter your full name.");
      return;
    }

    // Username validation
    if (!formData.username.trim()) {
      setError("Please enter a username.");
      return;
    }

    // Email validation
    if (!formData.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    // Password validation
    if (!formData.password) {
      setError("Please enter a password.");
      return;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        fullname: formData.fullname.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      navigate("/login");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to create your account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-paper text-ink">

      <div className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">

        {/* =====================================================
            BRAND PANEL
        ===================================================== */}

        <section className="relative hidden min-h-screen overflow-hidden bg-ink p-10 text-paper lg:flex lg:flex-col lg:justify-between xl:p-14">

          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            to="/"
            className="group inline-flex w-fit items-center"
          >

            <span className="font-display text-3xl font-bold tracking-tight">
              DocYard
              <span className="text-blue">.</span>
            </span>

          </Link>


          {/* =================================================
              BRAND MESSAGE
          ================================================= */}

          <div className="max-w-2xl">

            <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-paper/45">
              JOIN THE ARCHIVE
            </span>


            <h1 className="mt-6 font-display text-6xl font-semibold leading-[0.9] tracking-[-0.03em] xl:text-7xl">
              Share
              <br />
              what matters.
            </h1>


            <p className="mt-7 max-w-xl text-base leading-7 text-paper/60">
              Create your account and become
              part of the DocYard document
              community.
            </p>


            {/* FEATURE TAGS */}

            <div className="mt-10 flex flex-wrap gap-3">

              <div className="rounded-lg border border-paper/15 px-4 py-3">

                <span className="font-mono text-xs uppercase tracking-[0.1em] text-paper/45">
                  DISCOVER
                </span>

              </div>


              <div className="rounded-lg border border-paper/15 px-4 py-3">

                <span className="font-mono text-xs uppercase tracking-[0.1em] text-paper/45">
                  SAVE
                </span>

              </div>


              <div className="rounded-lg border border-paper/15 px-4 py-3">

                <span className="font-mono text-xs uppercase tracking-[0.1em] text-paper/45">
                  SHARE
                </span>

              </div>

            </div>

          </div>


        </section>


        {/* =====================================================
            REGISTER PANEL
        ===================================================== */}

        <section className="flex min-h-screen items-center px-6 py-12 sm:px-10 md:px-14 lg:px-16 xl:px-24">

          <div className="w-full max-w-2xl">

            {/* =================================================
                MOBILE LOGO
            ================================================= */}

            <Link
              to="/"
              className="inline-flex items-center lg:hidden"
            >

              <span className="font-display text-3xl font-bold tracking-tight text-blue">
                DocYard
                <span className="text-ai-gold">.</span>
              </span>

            </Link>


            {/* =================================================
                HEADING
            ================================================= */}

            <div className="mt-12 lg:mt-0">

              <span className="page-eyebrow">
                CREATE ACCOUNT
              </span>


              <h2 className="mt-4 font-display text-5xl font-semibold leading-[0.95] tracking-[-0.03em] sm:text-6xl md:text-7xl">
                Join DocYard.
              </h2>


              <p className="mt-5 max-w-xl text-base leading-7 text-ink-soft md:text-lg">
                Create an account to save,
                share, and discover documents.
              </p>

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
              <div className="mt-8 rounded-xl border border-line-strong bg-paper-raised px-5 py-4 text-sm font-medium leading-6 text-ink">
                {error}
              </div>
            )}


            {/* =================================================
                REGISTER FORM
            ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8 md:p-10"
            >

              {/* FORM HEADER */}

              <div className="mb-8">

                <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-blue">
                  CREATE YOUR ACCOUNT
                </span>


                <p className="mt-2 text-sm leading-6 text-ink-soft">
                  Enter your details to get started.
                </p>

              </div>


              {/* ===============================================
                  FULL NAME
              =============================================== */}

              <RegisterForm
                id="fullname"
                name="fullname"
                type="text"
                label="Full Name"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />


              {/* ===============================================
                  USERNAME
              =============================================== */}

              <div className="mt-6">

                <RegisterForm
                  id="username"
                  name="username"
                  type="text"
                  label="Username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  autoComplete="username"
                  required
                />

              </div>


              {/* ===============================================
                  EMAIL
              =============================================== */}

              <div className="mt-6">

                <RegisterForm
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />

              </div>


              {/* ===============================================
                  PASSWORD
              =============================================== */}

              <div className="mt-6">

                <RegisterForm
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                />

              </div>


              {/* ===============================================
                  CONFIRM PASSWORD
              =============================================== */}

              <div className="mt-6">

                <RegisterForm
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  label="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  required
                />

              </div>


              {/* ===============================================
                  SUBMIT
              =============================================== */}

              <button
                  type="submit"
                  disabled={loading}
                  className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-lg border border-[#0F4C81] bg-[#0A3A63] px-7 text-sm font-semibold text-white shadow-sm transition-all hover:[#0F4C81] hover:[#0F4C81] disabled:cursor-not-allowed disabled:opacity-60"
                >
                {loading
                  ? "Creating account..."
                  : "Create account "}
              </button>

            </form>


            {/* =================================================
                LOGIN LINK
            ================================================= */}

            <div className="mt-8 rounded-xl border border-line bg-paper-raised px-6 py-5">

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <p className="text-sm text-ink-soft">
                  Already have an account?
                </p>


                <Link
                  to="/login"
                  className="inline-flex h-10 w-fit items-center justify-center rounded-lg border border-line-strong bg-white px-5 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-blue transition-all hover:border-blue hover:bg-blue-light"
                >
                  Sign in
                </Link>

              </div>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
};

export default Register;