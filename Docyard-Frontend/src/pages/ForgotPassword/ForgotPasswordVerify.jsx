import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { verifyForgotPasswordOTP } from "../../services/auth.service.js";

const ForgotPasswordVerify = () => {
  const navigate = useNavigate();

  const email = sessionStorage.getItem("forgotPasswordEmail");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email) {
      setError(
        "Your password reset session has expired. Please try again."
      );
      return;
    }

    if (otp.length !== 6) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    try {
      setLoading(true);

      const response = await verifyForgotPasswordOTP(
        email,
        otp
      );

      const resetToken = response?.data?.resetToken;

      if (!resetToken) {
        throw new Error("Reset token was not received.");
      }

      sessionStorage.setItem(
        "passwordResetToken",
        resetToken
      );

      navigate("/forgot-password/reset");
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
      <section className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-[430px]">

          <div className="mb-8 border-b border-line pb-6">
            <p className="page-eyebrow">
              Account recovery
            </p>

            <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
              Verify your email
            </h1>

            <p className="mt-4 text-sm leading-6 text-ink/60">
              Enter the 6-digit verification code sent to
              your email address.
            </p>

            <p className="mt-2 break-all font-mono text-xs font-semibold text-[#0A3A63]">
              {email || "Your email address"}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-md border border-line bg-white p-6 sm:p-8"
          >
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
                setOtp(
                  e.target.value.replace(/\D/g, "")
                )
              }
              placeholder="000000"
              className="w-full rounded-md border border-line bg-paper px-4 py-4 text-center font-mono text-2xl tracking-[0.4em] outline-none transition focus:border-[#0A3A63] focus:ring-1 focus:ring-[#0A3A63]/20"
            />

            {error && (
              <p className="mt-3 text-sm leading-5 text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="mt-6 w-full rounded-md bg-[#0A3A63] px-5 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#082F50] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify code"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() =>
                navigate("/forgot-password")
              }
              className="font-mono text-xs font-semibold uppercase tracking-wider text-[#0A3A63] hover:underline"
            >
              Change email
            </button>
          </div>

          <p className="mt-5 text-center text-xs leading-5 text-ink/40">
            The verification code expires after 10 minutes.
          </p>

        </div>
      </section>
    </main>
  );
};

export default ForgotPasswordVerify;