import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/footer/footer.jsx";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">

      <Navbar />

      <main className="flex flex-1 items-center justify-center px-5 py-12 md:px-8 md:py-16">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>

      <Footer />

    </div>
  );
};

export default AuthLayout;