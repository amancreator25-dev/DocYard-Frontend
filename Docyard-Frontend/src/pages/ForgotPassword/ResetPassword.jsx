import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { resetPassword } from "../../services/auth.service.js";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const resetToken = sessionStorage.getItem(
      "passwordResetToken"
    );

    if (!resetToken) {
      setError(
        "Your password reset session has expired. Please start again."
      );
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("Please enter and confirm your new password.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await resetPassword(
        resetToken,
        newPassword
      );

      sessionStorage.removeItem(
        "passwordResetToken"
      );

      sessionStorage.removeItem(
        "forgotPasswordEmail"
      );

      setSuccess(
        "Password reset successfully."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to reset your password. Please try again."
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
              Create a new
              <br />
              password.
            </h1>

            <p className="mt-8 max-w-lg text-sm leading-7 text-ink/60">
              Choose a new password for your DocYard
              account. Once updated, you can sign in
              normally with your new credentials.
            </p>

            <div className="mt-10 flex gap-3">
              <span className="rounded-md border border-ink bg-paper px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-wider">
                Secure
              </span>

              <span className="rounded-md border border-ink bg-paper px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-wider">
                Final step
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
                New password
              </p>

              <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                Set your password.
              </h2>

              <p className="mt-4 text-sm leading-6 text-ink/60">
                Enter a new password below to secure
                your account.
              </p>
            </div>

            {/* FORM CARD */}
            <form
              onSubmit={handleSubmit}
              className="rounded-md border border-ink bg-white p-6 sm:p-8"
            >
              <div className="mb-7">
                <p className="font-mono text-xs font-semibold uppercase tracking-wider">
                  Account security
                </p>

                <p className="mt-2 text-sm text-ink/60">
                  Use at least 8 characters.
                </p>
              </div>

              {/* NEW PASSWORD */}
              <div>
                <label
                  htmlFor="newPassword"
                  className="mb-2 block font-mono text-xs font-semibold uppercase tracking-wider"
                >
                  New password
                </label>

                <input
                  id="newPassword"
                  type="password"
                  autoComplete="new-password"
                  autoFocus
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(e.target.value)
                  }
                  placeholder="Enter new password"
                  className="w-full rounded-md border border-line bg-paper px-4 py-3.5 text-sm outline-none transition placeholder:text-ink/30 focus:border-[#0A3A63] focus:ring-1 focus:ring-[#0A3A63]/10"
                />
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="mt-5">
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block font-mono text-xs font-semibold uppercase tracking-wider"
                >
                  Confirm password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Confirm new password"
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
                disabled={
                  loading ||
                  !newPassword ||
                  !confirmPassword
                }
                className="mt-6 w-full rounded-md bg-[#0A3A63] px-5 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#ffffff] transition hover:bg-[#082F50] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Updating password..."
                  : "Reset password"}
              </button>
            </form>

            {/* BOTTOM ACTION */}
            <div className="mt-6 flex items-center justify-between rounded-md border border-line px-5 py-4">
              <p className="text-sm text-ink/60">
                Remember your password?
              </p>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="rounded-md border border-ink bg-paper px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-wider transition hover:bg-[#0A3A63] hover:text-[#ffffff]"
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

export default ResetPassword;