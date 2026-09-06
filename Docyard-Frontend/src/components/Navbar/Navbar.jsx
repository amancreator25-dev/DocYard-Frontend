import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await onLogout?.();
    } finally {
      navigate("/login");
    }
  };

  const navLinkClass = ({ isActive }) =>
    `font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
      isActive
        ? "text-blue"
        : "text-ink-faint hover:text-ink"
    }`;

  return (
    <header className="border-b border-line bg-paper">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between px-5 md:px-8">

        {/* LOGO */}

        <Link
          to="/"
          className="group flex items-center gap-3"
        >
          <span className="flex h-8 w-8 items-center justify-center bg-ink font-display text-sm font-semibold text-white transition-colors group-hover:bg-blue">
            D
          </span>

          <span className="font-display text-xl font-semibold tracking-tight">
            DocYard
          </span>
        </Link>


        {/* DESKTOP NAVIGATION */}

        <nav className="hidden items-center gap-7 md:flex">
          <NavLink
            to="/"
            className={navLinkClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/documents"
            className={navLinkClass}
          >
            Documents
          </NavLink>

          <NavLink
            to="/about"
            className={navLinkClass}
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={navLinkClass}
          >
            Contact
          </NavLink>
        </nav>


        {/* RIGHT SIDE */}

        <div className="flex items-center gap-4">

          {user ? (
            <>
              <NavLink
                to="/profile"
                className="hidden items-center gap-2 sm:flex"
              >
                <span className="flex h-7 w-7 items-center justify-center border border-line bg-white font-mono text-[9px] uppercase text-blue">
                  {(
                    user.username ||
                    user.name ||
                    "U"
                  ).charAt(0)}
                </span>

                <span className="max-w-[100px] truncate font-mono text-[9px] uppercase tracking-wide text-ink-faint">
                  {user.username ||
                    user.name ||
                    "Profile"}
                </span>
              </NavLink>

              <button
                type="button"
                onClick={handleLogout}
                className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint transition-colors hover:text-blue"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint transition-colors hover:text-ink sm:block"
              >
                Sign in
              </Link>

              <Link
                to="/register"
                className="btn btn-primary"
              >
                Join →
              </Link>
            </>
          )}

        </div>

      </div>


      {/* MOBILE NAVIGATION */}

      <div className="border-t border-line md:hidden">
        <nav className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-5 py-3">

          <NavLink
            to="/"
            className={navLinkClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/documents"
            className={navLinkClass}
          >
            Documents
          </NavLink>

          <NavLink
            to="/about"
            className={navLinkClass}
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={navLinkClass}
          >
            Contact
          </NavLink>

          {user && (
            <NavLink
              to="/profile"
              className={navLinkClass}
            >
              Profile
            </NavLink>
          )}

        </nav>
      </div>
    </header>
  );
};

export default Navbar;