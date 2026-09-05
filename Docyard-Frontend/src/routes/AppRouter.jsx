import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


// ======================================
// ROUTE GUARDS
// ======================================

import ProtectedRoute from "./ProtectedRoute.jsx";
import AdminRoute from "./AdminRoute.jsx";


// ======================================
// LAYOUT
// ======================================

import MainLayout from "../layouts/MainLayout.jsx";


// ======================================
// PUBLIC PAGES
// ======================================

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Documents from "../pages/Documents.jsx";
import DocumentDetails from "../pages/DocumentDetails.jsx";
import Profile from "../pages/Profile.jsx";
import Contact from "../pages/Contact.jsx";
import NotFound from "../pages/NotFound.jsx";


// ======================================
// PROTECTED PAGES
// ======================================

import MyDocuments from "../pages/MyDocuments.jsx";
import Bookmarks from "../pages/Bookmarks.jsx";


// ======================================
// ADMIN PAGES
// ======================================

import AdminDashboard from "../pages/admin/AdminDashboard.jsx";


// ======================================
// APP ROUTER
// ======================================

const AppRouter = () => {
  return (
    <BrowserRouter>

      <Routes>

        {/* ================================== */}
        {/* MAIN LAYOUT                         */}
        {/* ================================== */}

        <Route element={<MainLayout />}>

          {/* ================================ */}
          {/* PUBLIC ROUTES                    */}
          {/* ================================ */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/documents"
            element={<Documents />}
          />

          <Route
            path="/documents/:slug"
            element={<DocumentDetails />}
          />

          <Route
            path="/profile/:username"
            element={<Profile />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />


          {/* ================================ */}
          {/* PROTECTED ROUTES                 */}
          {/* ================================ */}

          <Route element={<ProtectedRoute />}>

            <Route
              path="/my-documents"
              element={<MyDocuments />}
            />

            <Route
              path="/bookmarks"
              element={<Bookmarks />}
            />

          </Route>


          {/* ================================ */}
          {/* ADMIN ROUTES                     */}
          {/* ================================ */}

          <Route element={<AdminRoute />}>

            <Route
              path="/admin"
              element={<AdminDashboard />}
            />

          </Route>


          {/* ================================ */}
          {/* 404                              */}
          {/* ================================ */}

          <Route
            path="*"
            element={<NotFound />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
};


export default AppRouter;