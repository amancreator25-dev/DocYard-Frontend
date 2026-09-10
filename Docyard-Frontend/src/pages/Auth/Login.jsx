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
      //
      // Backend response:
      //
      // {
      //   success: true,
      //   data: {
      //     user: {...}
      //   }
      // }
      //
      // Axios response:
      //
      // response.data.data.user
      //

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

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* ======================================
            BRAND PANEL
        ====================================== */}

        <section className="hidden border-r border-line bg-ink p-12 text-paper lg:flex lg:flex-col lg:justify-between">

          <Link
            to="/"
            className="font-display text-3xl font-semibold"
          >
            DocYard<span className="text-blue">.</span>
          </Link>

          <div className="max-w-xl">

            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50">
              THE DOCUMENT ARCHIVE
            </span>

            <h1 className="mt-5 font-display text-6xl font-semibold leading-[1.02]">
              Knowledge,
              <br />
              kept together.
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-paper/60">
              Access your saved documents,
              contribute to the archive, and
              keep your research organized.
            </p>

          </div>

          <p className="font-mono text-[9px] uppercase tracking-wide text-paper/40">
            DOCYARD / 2026
          </p>

        </section>


        {/* ======================================
            LOGIN PANEL
        ====================================== */}

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
                WELCOME BACK
              </span>

              <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
                Sign in.
              </h2>

              <p className="mt-4 text-sm leading-6 text-ink-soft">
                Sign in to continue to your
                DocYard account.
              </p>

            </div>


            {/* ERROR */}

            {error && (
              <div className="mt-7 border border-line bg-paper-raised px-4 py-3 text-sm text-ink-soft">
                {error}
              </div>
            )}


            {/* ==================================
                LOGIN FORM
            ================================== */}

            <form
              onSubmit={handleSubmit}
              className="mt-8 border border-line bg-white p-6 md:p-8"
            >

              {/* EMAIL */}

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


              {/* PASSWORD */}

              <div className="mt-6">

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
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


              {/* SUBMIT */}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary mt-7 w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Signing in..."
                  : "Sign in →"}
              </button>

            </form>


            {/* REGISTER */}

            <div className="mt-8 border-t border-line pt-7 text-center">

              <p className="text-sm text-ink-soft">
                Don't have an account?
              </p>

              <Link
                to="/register"
                className="mt-2 inline-block font-mono text-[10px] uppercase tracking-wide text-blue hover:text-ink"
              >
                Create an account →
              </Link>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
};

export default Login;