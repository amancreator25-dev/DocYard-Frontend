import { Link } from "react-router-dom";


// ======================================
// FOOTER
// ======================================

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">

      {/* ================================= */}
      {/* FOOTER CONTENT                    */}
      {/* ================================= */}

      <div className="footer-content">

        {/* =============================== */}
        {/* BRAND                            */}
        {/* =============================== */}

        <div className="footer-brand">
          <Link
            to="/"
            className="footer-logo"
          >
            DocYard
          </Link>

          <p className="footer-description">
            Discover, share, and manage
            documents in one place.
          </p>
        </div>


        {/* =============================== */}
        {/* QUICK LINKS                      */}
        {/* =============================== */}

        <div className="footer-section">

          <h3>Quick Links</h3>

          <Link to="/">
            Home
          </Link>

          <Link to="/documents">
            Documents
          </Link>

          <Link to="/contact">
            Contact
          </Link>

        </div>


        {/* =============================== */}
        {/* ACCOUNT                          */}
        {/* =============================== */}

        <div className="footer-section">

          <h3>Account</h3>

          <Link to="/login">
            Login
          </Link>

          <Link to="/register">
            Register
          </Link>

        </div>

      </div>


      {/* ================================= */}
      {/* FOOTER BOTTOM                     */}
      {/* ================================= */}

      <div className="footer-bottom">

        <p>
          © {currentYear} DocYard.
          All rights reserved.
        </p>

      </div>

    </footer>
  );
};


export default Footer;