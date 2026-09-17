import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { sendForgotPasswordOTP } from "../../services/auth.service.js";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      await sendForgotPasswordOTP(normalizedEmail);

      sessionStorage.setItem(
        "forgotPasswordEmail",
        normalizedEmail
      );

      setSuccess("Verification code sent successfully.");

      setTimeout(() => {
        navigate("/forgot-password/verify");
      }, 800);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to send verification code. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-78px)] bg-paper text-ink">
      <section className="grid min-h-[calc(100vh-78px)] grid-cols-1 lg:grid-cols-2">

        <div className="flex flex-col justify-between border-b border-line px-8 py-12 sm:px-12 lg:border-b-0 lg:border-r lg:px-16 xl:px-24">

          <div />

          <div className="max-w-xl">
            <p className="page-eyebrow">
              Account recovery
            </p>

            <h1 className="mt-5 max-w-lg font-display text-5xl leading-[0.95] sm:text-6xl xl:text-7xl">
              Your account,
              <br />
              restored.
            </h1>

            <p className="mt-8 max-w-lg text-sm leading-7 text-ink/60">
              Reset your DocYard password securely and
              continue accessing your saved documents,
              research, and contributions.
            </p>

            <div className="mt-10 flex gap-3">
              <span className="rounded-md border border-ink bg-paper px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-wider">
                Secure
              </span>

              <span className="rounded-md border border-ink bg-paper px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-wider">
                Verified
              </span>
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
              The document archive
            </p>
          </div>
        </div>

        <div className="flex items-center px-8 py-12 sm:px-12 lg:px-16 xl:px-24">
          <div className="w-full max-w-xl">

            <div className="mb-8">
              <p className="page-eyebrow">
                Account recovery
              </p>

              <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                Reset your password.
              </h2>

              <p className="mt-4 text-sm leading-6 text-ink/60">
                Enter your email address to receive a
                verification code.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-md border border-ink bg-white p-6 sm:p-8"
            >
              <div className="mb-7">
                <p className="font-mono text-xs font-semibold uppercase tracking-wider">
                  Account recovery
                </p>

                <p className="mt-2 text-sm text-ink/60">
                  Enter your registered email below.
                </p>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-mono text-xs font-semibold uppercase tracking-wider"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-md border border-line bg-paper px-4 py-3.5 text-sm outline-none transition placeholder:text-ink/30 focus:border-[#0A3A63] focus:ring-1 focus:ring-[#0A3A63]/10"
                />
              </div>

              {error && (
                <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-sm leading-5 text-red-600">
                    {error}
                  </p>
                </div>
              )}

              {success && (
                <div className="mt-4 rounded-md border border-green-200 bg-green-50 px-4 py-3">
                  <p className="text-sm leading-5 text-green-700">
                    {success}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !email.trim()}
                className="mt-6 w-full rounded-md bg-[#0A3A63] px-5 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#082F50] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Sending code..." : "Continue"}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between rounded-md border border-line px-5 py-4">
              <p className="text-sm text-ink/60">
                Remember your password?
              </p>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="rounded-md border border-ink bg-paper px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-wider transition hover:bg-ink hover:text-white"
              >
                Sign in
              </button>
            </div>

          </div>
        </div>

      </section>
    </main>
  );
};

export default ForgotPassword;