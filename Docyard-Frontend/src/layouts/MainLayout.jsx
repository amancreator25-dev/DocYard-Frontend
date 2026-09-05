import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";


// ======================================
// MAIN LAYOUT
// ======================================

const MainLayout = () => {
  return (
    <div className="app-layout">

      {/* ================================= */}
      {/* NAVBAR                            */}
      {/* ================================= */}

      <Navbar />


      {/* ================================= */}
      {/* PAGE CONTENT                      */}
      {/* ================================= */}

      <main className="app-content">
        <Outlet />
      </main>


      {/* ================================= */}
      {/* FOOTER                            */}
      {/* ================================= */}

      <Footer />

    </div>
  );
};


export default MainLayout;