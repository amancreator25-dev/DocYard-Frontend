import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-line bg-ink text-white">

      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">

        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">

          {/* BRAND */}

          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
              <span className="flex h-9 w-9 items-center justify-center bg-white font-display text-sm font-semibold text-ink">
                D
              </span>

              <span className="font-display text-2xl font-semibold">
                DocYard
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-white/60">
              A focused space to discover, share,
              and organize useful documents.
            </p>
          </div>


          {/* EXPLORE */}

          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">
              Explore
            </span>

            <div className="mt-5 flex flex-col gap-3">

              <Link
                to="/"
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/documents"
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                Documents
              </Link>

              <Link
                to="/about"
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                About
              </Link>

              <Link
                to="/contact"
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                Contact
              </Link>

            </div>
          </div>


          {/* ACCOUNT */}

          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">
              Account
            </span>

            <div className="mt-5 flex flex-col gap-3">

              <Link
                to="/login"
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                Sign in
              </Link>

              <Link
                to="/register"
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                Create account
              </Link>

              <Link
                to="/profile"
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                Profile
              </Link>

            </div>
          </div>

        </div>


        {/* BOTTOM */}

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">

          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/40">
            © {new Date().getFullYear()} DocYard
          </span>

          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/40">
            Built for the archive.
          </span>

        </div>

      </div>

    </footer>
  );
};

export default Footer;