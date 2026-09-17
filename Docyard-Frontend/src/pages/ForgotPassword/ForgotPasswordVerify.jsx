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

      navigate("/forgotPassword/resetPassword");
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
    <main className="min-h-[calc(100vh-78px)] bg-paper text-ink">
      <section className="grid min-h-[calc(100vh-78px)] grid-cols-1 lg:grid-cols-2">

        {/* LEFT PANEL */}
        <div className="flex flex-col justify-between border-b border-line px-8 py-12 sm:px-12 lg:border-b-0 lg:border-r lg:px-16 xl:px-24">

          <div />

          <div className="max-w-xl">
            <p className="page-eyebrow">
              Account recovery
            </p>

            <h1 className="mt-5 max-w-lg font-display text-5xl leading-[0.95] sm:text-6xl xl:text-7xl">
              Verify your
              <br />
              identity.
            </h1>

            <p className="mt-8 max-w-lg text-sm leading-7 text-ink/60">
              Enter the verification code sent to your
              registered email address to continue
              resetting your DocYard password.
            </p>

            <div className="mt-10 flex gap-3">
              <span className="rounded-md border border-ink bg-paper px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-wider">
                Secure
              </span>

              <span className="rounded-md border border-ink bg-paper px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-wider">
                10 Min
              </span>
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
              The document archive
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex items-center px-8 py-12 sm:px-12 lg:px-16 xl:px-24">
          <div className="w-full max-w-xl">

            <div className="mb-8">
              <p className="page-eyebrow">
                Verification
              </p>

              <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                Enter your code.
              </h2>

              <p className="mt-4 text-sm leading-6 text-ink/60">
                We sent a 6-digit verification code to:
              </p>

              <p className="mt-2 break-all font-mono text-xs font-semibold text-[#0A3A63]">
                {email || "Your email address"}
              </p>
            </div>

            {/* FORM CARD */}
            <form
              onSubmit={handleSubmit}
              className="rounded-md border border-ink bg-white p-6 sm:p-8"
            >
              <div className="mb-7">
                <p className="font-mono text-xs font-semibold uppercase tracking-wider">
                  Verification code
                </p>

                <p className="mt-2 text-sm text-ink/60">
                  Enter the 6-digit code from your email.
                </p>
              </div>

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
                className="w-full rounded-md border border-line bg-paper px-4 py-4 text-center font-mono text-2xl tracking-[0.4em] outline-none transition placeholder:text-ink/25 focus:border-[#0A3A63] focus:ring-1 focus:ring-[#0A3A63]/10"
              />

              {error && (
                <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-sm leading-5 text-red-600">
                    {error}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="mt-6 w-full rounded-md bg-[#0A3A63] px-5 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#082F50] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Verifying..."
                  : "Verify code"}
              </button>

              <div className="mt-6 border-t border-line pt-5">
                <button
                  type="button"
                  onClick={() =>
                    navigate("/forgotPassword")
                  }
                  className="font-mono text-xs font-semibold uppercase tracking-wider text-[#0A3A63] transition hover:underline"
                >
                  Change email
                </button>
              </div>
            </form>

            {/* BOTTOM INFO */}
            <div className="mt-6 flex items-center justify-between rounded-md border border-line px-5 py-4">
              <p className="text-sm text-ink/60">
                Code expires in 10 minutes.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/forgotPassword")
                }
                className="rounded-md border border-ink bg-paper px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-wider transition hover:bg-[#0A3A63] hover:text-[#ffffff]"
              >
                Start over
              </button>
            </div>

          </div>
        </div>

      </section>
    </main>
  );
};

export default ForgotPasswordVerify;