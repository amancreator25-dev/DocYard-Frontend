import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { verifyAdminOTP } from "../../services/auth.service.js";
import { useAuth } from "../../context/AuthContext.jsx";

const VerifyAdminOTP = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const email = sessionStorage.getItem(
    "adminLoginEmail"
  );

  const handleChange = (event) => {
    const value = event.target.value
      .replace(/\D/g, "")
      .slice(0, 6);

    setOtp(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (otp.length !== 6) {
      setError("Enter the 6-digit verification code.");
      return;
    }

    if (!email) {
      setError(
        "Admin login session expired. Please login again."
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await verifyAdminOTP(
        email,
        otp
      );

      const responseData =
        response?.data?.data ||
        response?.data ||
        response;

      const loggedInUser =
        responseData?.user;

      if (!loggedInUser) {
        throw new Error(
          "Admin login successful, but user information was not received."
        );
      }

      login(loggedInUser);

      sessionStorage.removeItem(
        "adminLoginEmail"
      );

      navigate("/admin", {
        replace: true,
      });
    } catch (err) {
      console.error(
        "Admin OTP Verification Error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Invalid or expired OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    sessionStorage.removeItem(
      "adminLoginEmail"
    );

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <main className="min-h-screen bg-paper text-ink">

      <section className="flex min-h-screen items-center justify-center px-6 py-16 sm:px-10">

        <div className="w-full max-w-md">

          {/* HEADER */}

          <div className="mb-9">

            <p className="page-eyebrow">
              Admin verification
            </p>

            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
              Verify your access
            </h1>

            <p className="mt-4 text-sm leading-6 text-ink-soft">
              Enter the 6-digit verification code sent to
            </p>

            <p className="mt-1 break-all font-mono text-sm font-semibold text-ink">
              {email || "your administrator email"}
            </p>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="rounded-md border border-line bg-white p-6 sm:p-7"
          >

            <label
              htmlFor="otp"
              className="mb-2 block font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink"
            >
              Verification code
            </label>

            <input
              id="otp"
              name="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              autoFocus
              value={otp}
              onChange={handleChange}
              placeholder="000000"
              maxLength={6}
              className="h-16 w-full rounded-md border border-line bg-paper px-4 text-center font-mono text-2xl font-semibold tracking-[0.45em] text-ink outline-none transition focus:border-[#0A3A63] focus:ring-1 focus:ring-[#0A3A63]"
              required
            />

            {/* ERROR */}

            {error && (
              <p className="mt-3 text-sm leading-6 text-red-600">
                {error}
              </p>
            )}

            {/* VERIFY */}

            <button
              type="submit"
              disabled={
                loading || otp.length !== 6
              }
              className="mt-6 w-full rounded-md bg-[#0A3A63] px-5 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#082F50] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Verifying..."
                : "Verify access"}
            </button>

            {/* BACK */}

            <button
              type="button"
              onClick={handleBackToLogin}
              disabled={loading}
              className="mt-3 w-full rounded-md border border-ink bg-paper px-5 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-50"
            >
              Back to login
            </button>

          </form>

        </div>

      </section>

    </main>
  );
};

export default VerifyAdminOTP;