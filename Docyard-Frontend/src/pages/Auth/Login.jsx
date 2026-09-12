import { useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { loginUser } from "../../services/auth.service.js";
import { useAuth } from "../../context/AuthContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ==========================================
  // AUTH CONTEXT
  // ==========================================

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const from =
    location.state?.from?.pathname || "/";

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
  // HANDLE SUBMIT
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      // --------------------------------------
      // LOGIN API
      // --------------------------------------

      const response = await loginUser({
        email: formData.email.trim(),
        password: formData.password,
      });

      console.log("LOGIN RESPONSE:", response);

      // --------------------------------------
      // GET USER FROM BACKEND RESPONSE
      // --------------------------------------

      const loggedInUser =
        response?.data?.data?.user ||
        response?.data?.user ||
        response?.user;

      console.log(
        "LOGGED IN USER:",
        loggedInUser
      );

      if (!loggedInUser) {
        throw new Error(
          "Login successful, but user information was not received."
        );
      }

      // --------------------------------------
      // UPDATE AUTH CONTEXT
      // --------------------------------------

      login(loggedInUser);

      // --------------------------------------
      // REDIRECT
      // --------------------------------------

      navigate(from, {
        replace: true,
      });

    } catch (err) {
      console.error(
        "Login Error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Invalid email or password."
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

          {/* TOP */}

          <Link
            to="/"
            className="group inline-flex w-fit items-center"
          >

            <span className="font-display text-3xl font-bold tracking-tight">
              DocYard
              <span className="text-blue">.</span>
            </span>

          </Link>


          {/* CENTER CONTENT */}

          <div className="max-w-2xl">

            <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-paper/45">
              THE DOCUMENT ARCHIVE
            </span>


            <h1 className="mt-6 font-display text-6xl font-semibold leading-[0.9] tracking-[-0.03em] xl:text-7xl">
              Knowledge,
              <br />
              kept together.
            </h1>


            <p className="mt-7 max-w-xl text-base leading-7 text-paper/60">
              Access your saved documents,
              contribute to the archive, and
              keep your research organized.
            </p>


            {/* SMALL FEATURE ROW */}

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
                  CONTRIBUTE
                </span>

              </div>

            </div>

          </div>


          {/* BOTTOM */}

          <div className="flex items-center justify-between">

            <p className="font-mono text-xs uppercase tracking-[0.12em] text-paper/35">
              DOCYARD / 2026
            </p>

            <span className="font-mono text-xs text-paper/25">
              01
            </span>

          </div>

        </section>


        {/* =====================================================
            LOGIN PANEL
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
                WELCOME BACK
              </span>


              <h2 className="mt-4 font-display text-5xl font-semibold leading-[0.95] tracking-[-0.03em] sm:text-6xl md:text-7xl">
                Sign in.
              </h2>


              <p className="mt-5 max-w-xl text-base leading-7 text-ink-soft md:text-lg">
                Sign in to continue to your
                DocYard account.
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
                LOGIN FORM
            ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8 md:p-10"
            >

              {/* FORM INTRO */}

              <div className="mb-8">

                <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-blue">
                  ACCOUNT ACCESS
                </span>

                <p className="mt-2 text-sm leading-6 text-ink-soft">
                  Enter your account details below.
                </p>

              </div>


              {/* ===============================================
                  EMAIL
              =============================================== */}

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
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="form-input"
                  required
                />

              </div>


              {/* ===============================================
                  PASSWORD
              =============================================== */}

              <div className="mt-7">

                <div className="mb-2 flex items-center justify-between gap-4">

                  <label
                    htmlFor="password"
                    className="form-label"
                  >
                    Password
                  </label>


                  <Link
                    to="/forgot-password"
                    className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-ink-faint transition-colors hover:text-blue"
                  >
                    Forgot?
                  </Link>

                </div>


                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="form-input"
                  required
                />

              </div>


              {/* ===============================================
                  SUBMIT
              =============================================== */}

              <button
                type="submit"
                disabled={loading}
                className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-lg border border-blue bg-blue px-7 text-sm font-semibold text-white shadow-sm transition-all hover:border-ink hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Signing in..."
                  : "Sign in →"}
              </button>

            </form>


            {/* =================================================
                REGISTER
            ================================================= */}

            <div className="mt-8 rounded-xl border border-line bg-paper-raised px-6 py-5">

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <p className="text-sm text-ink-soft">
                  Don't have an account?
                </p>


                <Link
                  to="/register"
                  className="inline-flex h-10 w-fit items-center justify-center rounded-lg border border-line-strong bg-white px-5 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-blue transition-all hover:border-blue hover:bg-blue-light"
                >
                  Create an account →
                </Link>

              </div>

            </div>


            {/* =================================================
                BACK HOME
            ================================================= */}

            <Link
              to="/"
              className="mt-6 inline-flex items-center font-mono text-xs font-medium uppercase tracking-[0.08em] text-ink-faint transition-colors hover:text-blue"
            >
              ← Back to DocYard
            </Link>

          </div>

        </section>

      </div>

    </main>
  );
};

export default Login;