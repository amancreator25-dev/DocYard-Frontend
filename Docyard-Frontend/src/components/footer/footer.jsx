import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-line bg-ink text-black">
      <div className="px-5 py-8 md:px-8 lg:px-10">

        {/* MAIN FOOTER */}
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr]">

          {/* BRAND */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2"
            >
              <img
                src={Logo}
                alt="DocYard logo"
                className="h-9 w-9 object-contain"
              />

              <span className="font-display text-lg font-semibold">
                DocYard
              </span>
            </Link>

            <p className="mt-3 max-w-sm text-xs leading-5 text-black/55">
              A focused platform to discover, share, and organize useful
              documents.
            </p>
          </div>

          {/* EXPLORE */}
          <div>
            <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-black/45">
              Explore
            </span>

            <div className="mt-3 flex flex-col gap-2">
              <Link
                to="/"
                className="w-fit text-xs text-black/65 transition-colors hover:text-black"
              >
                Home
              </Link>

              <Link
                to="/documents"
                className="w-fit text-xs text-black/65 transition-colors hover:text-black"
              >
                Documents
              </Link>

              <Link
                to="/about"
                className="w-fit text-xs text-black/65 transition-colors hover:text-black"
              >
                About
              </Link>

              <Link
                to="/contact"
                className="w-fit text-xs text-black/65 transition-colors hover:text-black"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* ACCOUNT */}
          <div>
            <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-black/45">
              Account
            </span>

            <div className="mt-3 flex flex-col gap-2">
              <Link
                to="/login"
                className="w-fit text-xs text-black/65 transition-colors hover:text-black"
              >
                Sign in
              </Link>

              <Link
                to="/register"
                className="w-fit text-xs text-black/65 transition-colors hover:text-black"
              >
                Create account
              </Link>

            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-8 flex flex-col gap-2 border-t border-black/10 pt-4 sm:flex-row sm:items-center sm:justify-between">

          <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-black/40">
            © {new Date().getFullYear()} DocYard
          </span>

          <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-black/40">
            Document Management Platform
          </span>

        </div>

      </div>
    </footer>
  );
};

export default Footer;