import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { useAuth } from "../../context/AuthContext.jsx";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) => {
    const baseClasses = `
      inline-flex
      min-h-[36px]
      items-center
      justify-center
      rounded
      px-4
      font-mono
      text-[11.5px]
      uppercase
      tracking-[0.1em]
      transition-all
      duration-200
    `;

    const activeClasses = `
      border
      border-line-strong
      bg-white
      text-blue
      shadow-sm
    `;

    const inactiveClasses = `
      border
      border-transparent
      text-ink-soft
      hover:bg-white/60
      hover:text-blue
    `;

    return `${baseClasses} ${
      isActive ? activeClasses : inactiveClasses
    }`;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-[#F6F1E6]">

      <div className="flex min-h-[76px] items-center justify-between bg-[#F6F1E6] px-5 md:px-8 lg:px-10 xl:px-12">

        <Link
          to="/"
          className="group flex items-center gap-0"
        >
          <span
            className="
              flex
              h-18
              w-18
              items-center
              justify-center
              rounded
              font-display
              text-lg
              font-bold
              text-white
            "
          >
            <img
              src={Logo}
              alt="DocYard logo"
              className="h-15 w-15 object-contain"
            />
          </span>

          <span className="font-display text-2xl font-bold tracking-tight text-blue">
            DocYard<span className="italic text-ai-gold">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">

          <NavLink
            to="/"
            end
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

        <div className="flex items-center gap-3">

          {user ? (
            <>
              <NavLink
                to={
                  user.username
                    ? `/profile/${user.username}`
                    : "/profile"
                }
                className="
                  hidden
                  min-h-[38px]
                  items-center
                  gap-2
                  rounded
                  border
                  border-line-strong
                  bg-white
                  px-3
                  transition-colors
                  hover:border-blue/40
                  hover:bg-blue-light
                  sm:flex
                "
              >
                <span
                  className="
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-sm
                    border
                    border-line
                    bg-paper
                    font-mono
                    text-[10px]
                    uppercase
                    text-blue
                  "
                >
                  {(user.username || "U")
                    .charAt(0)
                    .toUpperCase()}
                </span>

                <span
                  className="
                    max-w-[100px]
                    truncate
                    font-mono
                    text-[11.5px]
                    uppercase
                    tracking-wide
                    text-ink-soft
                  "
                >
                  {user.username || "Profile"}
                </span>
              </NavLink>

              <button
                type="button"
                onClick={handleLogout}
                className="
                  inline-flex
                  min-h-[38px]
                  items-center
                  justify-center
                  rounded
                  border
                  border-line-strong
                  bg-paper-raised
                  px-4
                  font-mono
                  text-[11.5px]
                  uppercase
                  tracking-[0.1em]
                  text-ink-soft
                  transition-all
                  duration-150
                  hover:border-blue
                  hover:bg-white
                  hover:text-blue
                "
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="
                  hidden
                  min-h-[38px]
                  items-center
                  justify-center
                  rounded
                  border
                  border-line-strong
                  bg-white
                  px-4
                  font-mono
                  text-[11.5px]
                  uppercase
                  tracking-[0.1em]
                  text-ink-soft
                  transition-all
                  duration-150
                  hover:border-blue
                  hover:text-blue
                  sm:inline-flex
                "
              >
                Sign in
              </Link>

              <Link
                to="/register"
                className="
                  inline-flex
                  min-h-[38px]
                  items-center
                  justify-center
                  rounded
                  border
                  border-blue
                  bg-blue
                  px-5
                  font-mono
                  text-[13px]
                  font-medium
                  uppercase
                  tracking-[0.08em]
                  text-white
                  transition-all
                  duration-150
                  hover:bg-blue-dark
                  active:scale-[0.98]
                "
              >
                Join &rarr;
              </Link>
            </>
          )}

        </div>
      </div>

      <div className="border-t border-line bg-[#F6F1E6] md:hidden">

        <nav className="flex items-center gap-2 overflow-x-auto px-5 py-3">

          <NavLink
            to="/"
            end
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
              to={
                user.username
                  ? `/profile/${user.username}`
                  : "/profile"
              }
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