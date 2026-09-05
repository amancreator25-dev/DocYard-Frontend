import { Link, NavLink, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth.js";


// ======================================
// NAVBAR
// ======================================

const Navbar = () => {
  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  const navigate = useNavigate();


  // ====================================
  // LOGOUT
  // ====================================

  const handleLogout = async () => {
    await logout();

    navigate("/login");
  };


  // ====================================
  // NAV LINK CLASS
  // ====================================

  const getNavLinkClass = ({
    isActive,
  }) => {
    return isActive
      ? "nav-link active"
      : "nav-link";
  };


  return (
    <header className="navbar">

      {/* ================================= */}
      {/* LOGO                             */}
      {/* ================================= */}

      <Link
        to="/"
        className="navbar-logo"
      >
        DocYard
      </Link>


      {/* ================================= */}
      {/* NAVIGATION                        */}
      {/* ================================= */}

      <nav className="navbar-links">

        <NavLink
          to="/"
          className={getNavLinkClass}
        >
          Home
        </NavLink>

        <NavLink
          to="/documents"
          className={getNavLinkClass}
        >
          Documents
        </NavLink>

        <NavLink
          to="/contact"
          className={getNavLinkClass}
        >
          Contact
        </NavLink>


        {/* =============================== */}
        {/* AUTHENTICATED LINKS              */}
        {/* =============================== */}

        {isAuthenticated && (
          <>
            <NavLink
              to="/my-documents"
              className={getNavLinkClass}
            >
              My Documents
            </NavLink>

            <NavLink
              to="/bookmarks"
              className={getNavLinkClass}
            >
              Bookmarks
            </NavLink>
          </>
        )}

      </nav>


      {/* ================================= */}
      {/* USER SECTION                      */}
      {/* ================================= */}

      <div className="navbar-user">

        {isAuthenticated ? (
          <>
            <NavLink
              to={`/profile/${user?.username}`}
              className={getNavLinkClass}
            >
              {user?.fullname ||
                user?.username ||
                "Profile"}
            </NavLink>


            {/* =========================== */}
            {/* ADMIN                       */}
            {/* =========================== */}

            {user?.role === "admin" && (
              <NavLink
                to="/admin"
                className={getNavLinkClass}
              >
                Admin
              </NavLink>
            )}


            {/* =========================== */}
            {/* LOGOUT                      */}
            {/* =========================== */}

            <button
              type="button"
              onClick={handleLogout}
              className="navbar-logout"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="navbar-login"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="navbar-register"
            >
              Register
            </Link>
          </>
        )}

      </div>

    </header>
  );
};


export default Navbar;