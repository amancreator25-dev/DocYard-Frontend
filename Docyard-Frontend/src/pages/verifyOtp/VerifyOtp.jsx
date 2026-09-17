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
      setError(
        "Your registration session has expired. Please register again."
      );
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

      <section className="flex min-h-screen items-center justify-center px-6 py-16 sm:px-10">

        <div className="w-full max-w-md">

          {/* HEADER */}

          <div className="mb-9">

            <p className="page-eyebrow">
              Account verification
            </p>

            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
              Verify your email
            </h1>

            <p className="mt-4 text-sm leading-6 text-ink-soft">
              Enter the 6-digit code sent to
            </p>

            <p className="mt-1 break-all font-mono text-sm font-semibold text-ink">
              {email || "your email address"}
            </p>

          </div>

          {/* FORM */}

          <form onSubmit={handleSubmit}>

            <label
              htmlFor="otp"
              className="mb-2 block font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink"
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
                setOtp(
                  e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 6)
                )
              }
              placeholder="000000"
              className="h-16 w-full rounded-md border border-line bg-white px-4 text-center font-mono text-2xl font-semibold tracking-[0.45em] text-ink outline-none transition focus:border-[#0A3A63] focus:ring-1 focus:ring-[#0A3A63]"
            />

            {/* ERROR */}

            {error && (
              <p className="mt-3 text-sm leading-6 text-red-600">
                {error}
              </p>
            )}

            {/* SUCCESS */}

            {success && (
              <p className="mt-3 text-sm leading-6 text-green-700">
                {success}
              </p>
            )}

            {/* VERIFY */}

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="mt-6 w-full rounded-md bg-[#0A3A63] px-5 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#082F50] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify email"}
            </button>

            {/* RESEND */}

            <div className="mt-8 text-center">

              <p className="text-sm text-ink-soft">
                Didn't receive the code?
              </p>

              <button
                type="button"
                className="mt-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0A3A63] transition-colors hover:text-[#082F50] hover:underline"
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