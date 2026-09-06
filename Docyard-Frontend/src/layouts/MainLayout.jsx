import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/footer/footer.jsx";

const MainLayout = ({ user, onLogout }) => {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <Navbar
        user={user}
        onLogout={onLogout}
      />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-7xl px-5 py-8 md:px-8 md:py-12">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;