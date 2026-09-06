import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../../services/auth.service.js";

import RegisterForm from "../../components/Forms/RegisterForm.jsx";

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

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Basic username validation
    if (!formData.username.trim()) {
      setError("Please enter a username.");
      return;
    }

    // Basic email validation
    if (!formData.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    // Password validation
    if (!formData.password) {
      setError("Please enter a password.");
      return;
    }

    setLoading(true);

    try {
      await registerUser({
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
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* ==========================================
            BRAND PANEL
        ========================================== */}

        <section className="hidden border-r border-line bg-ink p-12 text-paper lg:flex lg:flex-col lg:justify-between">

          {/* LOGO */}

          <Link
            to="/"
            className="font-display text-3xl font-semibold"
          >
            DocYard<span className="text-blue">.</span>
          </Link>


          {/* BRAND MESSAGE */}

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


          {/* FOOTER */}

          <p className="font-mono text-[9px] uppercase tracking-wide text-paper/40">
            DOCYARD / 2026
          </p>

        </section>


        {/* ==========================================
            REGISTER PANEL
        ========================================== */}

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


            {/* ======================================
                ERROR
            ====================================== */}

            {error && (
              <div className="mt-7 border border-line bg-paper-raised px-4 py-3 text-sm text-ink-soft">
                {error}
              </div>
            )}


            {/* ======================================
                REGISTER FORM

                IMPORTANT:
                RegisterForm only renders inputs.
                This is the ONLY <form> on this page.
            ====================================== */}

            <form
              onSubmit={handleSubmit}
              className="mt-8"
            >

              {/* USERNAME */}

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


              {/* EMAIL */}

              <div className="mt-5">

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


              {/* PASSWORD */}

              <div className="mt-5">

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


              {/* CONFIRM PASSWORD */}

              <div className="mt-5">

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


              {/* SUBMIT */}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary mt-7 w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Creating account..."
                  : "Create account →"}
              </button>

            </form>


            {/* ======================================
                LOGIN LINK
            ====================================== */}

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