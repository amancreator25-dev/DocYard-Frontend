import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { verifyRegistrationOTP } from "../../services/auth.service.js";

const VerifyOTP = () => {
  const navigate = useNavigate();

  const email = sessionStorage.getItem("registrationEmail");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email) {
      setError("Your registration session has expired. Please register again.");
      return;
    }

    if (otp.length !== 6) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    try {
      setLoading(true);

      await verifyRegistrationOTP(email, otp);

      sessionStorage.removeItem("registrationEmail");

      setSuccess("Email verified successfully.");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "The verification code is invalid or has expired."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-paper text-ink">

      {/* CONTENT */}
      <section className="flex min-h-[calc(100vh-78px)] items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">

          {/* INTRO */}
          <div className="mb-10">
            <p className="page-eyebrow">
              Account verification
            </p>

            <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
              Verify your email
            </h1>

            <p className="mt-4 text-sm leading-6 text-ink/60">
              We've sent a 6-digit verification code to
            </p>

            <p className="mt-1 font-mono text-sm font-semibold">
              {email || "your email address"}
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit}>

            <label
              htmlFor="otp"
              className="mb-2 block font-mono text-xs font-semibold uppercase tracking-wider"
            >
              Verification code
            </label>

            <input
              id="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              autoFocus
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, ""))
              }
              placeholder="000000"
              className="w-full rounded-md border border-line bg-white px-4 py-4 text-center font-mono text-2xl tracking-[0.45em] outline-none transition focus:border-[#0A3A63]"
            />

            {/* ERROR */}
            {error && (
              <p className="mt-3 text-sm text-red-600">
                {error}
              </p>
            )}

            {/* SUCCESS */}
            {success && (
              <p className="mt-3 text-sm text-green-700">
                {success}
              </p>
            )}

            {/* VERIFY */}
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="mt-6 w-full rounded-md bg-[#0A3A63] px-5 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#082F50] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify email"}
            </button>

            {/* RESEND */}
            <div className="mt-6 text-center">
              <p className="text-sm text-ink/50">
                Didn't receive the code?
              </p>

              <button
                type="button"
                className="mt-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#0A3A63] hover:underline"
              >
                Resend code
              </button>
            </div>

          </form>

        </div>
      </section>
    </main>
  );
};

export default VerifyOTP;