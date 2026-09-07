import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-line bg-ink !text-black">

      {/* ==========================================
          MAIN FOOTER
      ========================================== */}

      <div className="px-6 py-14 md:px-10 lg:px-12">

        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">

          {/* BRAND */}

          <div>
            <Link
              to="/"
              className="group inline-flex items-center gap-1"
            >
              <span className="flex h-15 w-15 items-center justify-center font-display text-sm font-semibold text-ink transition-colors group-hover:bg-blue group-hover:text-white">
                <img
                  src={Logo}
                  alt="DocYard logo"
                  className="h-15 w-15 object-contain"
                />
              </span>

              <span className=" font-display text-2xl font-semibold">
                DocYard
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-6 !text-black/60">
              A focused space to discover, share,
              and organize useful documents.
            </p>
          </div>


          {/* EXPLORE */}

          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] !text-black/40">
              Explore
            </span>

            <div className="mt-5 flex flex-col gap-3">

              <Link
                to="/"
                className="w-fit text-sm !text-black/70 transition-colors hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/documents"
                className="w-fit text-sm !text-black/70 transition-colors hover:text-white"
              >
                Documents
              </Link>

              <Link
                to="/about"
                className="w-fit text-sm !text-black/70 transition-colors hover:text-white"
              >
                About
              </Link>

              <Link
                to="/contact"
                className="w-fit text-sm !text-black/70 transition-colors hover:text-white"
              >
                Contact
              </Link>

            </div>
          </div>


          {/* ACCOUNT */}

          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] !text-black/40">
              Account
            </span>

            <div className="mt-5 flex flex-col gap-3">

              <Link
                to="/login"
                className="w-fit text-sm !text-black/70 transition-colors hover:text-white"
              >
                Sign in
              </Link>

              <Link
                to="/register"
                className="w-fit text-sm !text-black/70 transition-colors hover:text-white"
              >
                Create account
              </Link>

              <Link
                to="/profile"
                className="w-fit text-sm !text-black/70 transition-colors hover:text-white"
              >
                Profile
              </Link>

            </div>
          </div>

        </div>


        {/* ==========================================
            BOTTOM BAR
        ========================================== */}

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">

          <span className="font-mono text-[9px] uppercase tracking-[0.12em] !text-black/40">
            © {new Date().getFullYear()} DocYard
          </span>

          <span className="font-mono text-[9px] uppercase tracking-[0.12em] !text-black/40">
            Built for the archive.
          </span>

        </div>

      </div>

    </footer>
  );
};

export default Footer;