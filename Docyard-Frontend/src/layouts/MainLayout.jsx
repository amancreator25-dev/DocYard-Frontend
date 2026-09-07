import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/footer/footer.jsx";

const MainLayout = ({ user, onLogout }) => {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">

      {/* NAVBAR */}

      <Navbar
        user={user}
        onLogout={onLogout}
      />

      {/* PAGE CONTENT */}

      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER */}

      <Footer />

    </div>
  );
};

export default MainLayout;