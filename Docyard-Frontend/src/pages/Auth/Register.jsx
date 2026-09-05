import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/auth.js";


// ======================================
// REGISTER PAGE
// ======================================

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
  // HANDLE REGISTER
  // ======================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    // Basic password validation
    if (formData.password.length < 8) {
      setError(
        "Password must be at least 8 characters long."
      );
      return;
    }

    setLoading(true);

    try {
      await registerUser(formData);

      setSuccess(
        "Account created successfully. Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Registration failed. Please try again.";

      setError(message);

    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="auth-page">

      <div className="auth-container">

        <div className="auth-card">

          {/* ================================= */}
          {/* HEADER                             */}
          {/* ================================= */}

          <div className="auth-header">

            <span className="auth-badge">
              DOCYARD
            </span>

            <h1>
              Create Account
            </h1>

            <p>
              Create your DocYard account and start
              managing your documents.
            </p>

          </div>


          {/* ================================= */}
          {/* ERROR                              */}
          {/* ================================= */}

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}


          {/* ================================= */}
          {/* SUCCESS                            */}
          {/* ================================= */}

          {success && (
            <div className="alert alert-success">
              {success}
            </div>
          )}


          {/* ================================= */}
          {/* FORM                               */}
          {/* ================================= */}

          <form
            onSubmit={handleSubmit}
            className="auth-form"
          >

            {/* USERNAME */}

            <div className="form-group">

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
                minLength={3}
                maxLength={20}
                autoComplete="username"
                required
              />

            </div>


            {/* FULL NAME */}

            <div className="form-group">

              <label
                htmlFor="fullname"
                className="form-label"
              >
                Full Name
              </label>

              <input
                id="fullname"
                name="fullname"
                type="text"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="form-input"
                maxLength={50}
                autoComplete="name"
                required
              />

            </div>


            {/* EMAIL */}

            <div className="form-group">

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
                htmlFor="register-password"
                className="form-label"
              >
                Password
              </label>

              <input
                id="register-password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="form-input"
                minLength={8}
                autoComplete="new-password"
                required
              />

              <small className="form-help">
                Password must contain at least 8 characters.
              </small>

            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>


          {/* ================================= */}
          {/* LOGIN LINK                        */}
          {/* ================================= */}

          <div className="auth-footer">

            <p>
              Already have an account?{" "}

              <Link to="/login">
                Sign In
              </Link>

            </p>

          </div>

        </div>

      </div>

    </main>
  );
};


export default Register;