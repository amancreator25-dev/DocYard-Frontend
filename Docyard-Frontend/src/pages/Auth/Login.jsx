import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../services/auth.js";
import useAuth from "../hooks/useAuth.js";


// ======================================
// LOGIN PAGE
// ======================================

const Login = () => {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);


  // ======================================
  // HANDLE INPUT
  // ======================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };


  // ======================================
  // HANDLE LOGIN
  // ======================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await loginUser(formData);

      /*
       * Depending on the backend response,
       * the user may be inside:
       *
       * response.data
       * or
       * response.data.user
       */

      const loggedInUser =
        response?.data?.user ||
        response?.user ||
        null;

      if (loggedInUser && setUser) {
        setUser(loggedInUser);
      }

      navigate("/");

    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Login failed. Please check your credentials.";

      setError(message);

    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="auth-page">

      <div className="auth-container">

        {/* ================================= */}
        {/* LOGIN CARD                         */}
        {/* ================================= */}

        <div className="auth-card">

          {/* HEADER */}

          <div className="auth-header">

            <span className="auth-badge">
              DOCYARD
            </span>

            <h1>
              Welcome Back
            </h1>

            <p>
              Sign in to continue to your DocYard account.
            </p>

          </div>


          {/* ERROR */}

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}


          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="auth-form"
          >

            {/* EMAIL */}

            <div className="form-group">

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
                placeholder="Enter your email"
                className="form-input"
                autoComplete="email"
                required
              />

            </div>


            {/* PASSWORD */}

            <div className="form-group">

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
                placeholder="Enter your password"
                className="form-input"
                autoComplete="current-password"
                required
              />

            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={loading}
            >
              {loading
                ? "Signing in..."
                : "Sign In"}
            </button>

          </form>


          {/* REGISTER */}

          <div className="auth-footer">

            <p>
              Don't have an account?{" "}

              <Link to="/register">
                Create one
              </Link>

            </p>

          </div>

        </div>

      </div>

    </main>
  );
};


export default Login;