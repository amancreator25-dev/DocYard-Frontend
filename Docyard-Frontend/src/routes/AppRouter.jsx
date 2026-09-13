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
import Login from "../pages/Auth/Login.jsx";
import Register from "../pages/Auth/Register.jsx";
import About from "../pages/About/About.jsx";


import Documents from "../pages/Documents/Documents.jsx";
import DocumentDetails from "../pages/Documents/DocumentDetails.jsx";
import SearchDocument from "../pages/Documents/SearchDocuments.jsx";

import Profile from "../pages/Profile/Profile.jsx";

import Contact from "../pages/Contact/Contact.jsx";

import PageNotFound from "../pages/PageNotFound/PageNotFound.jsx";

// ======================================
// PROTECTED PAGES
// ======================================

import MyDocuments from "../pages/Documents/MyDocuments.jsx";
import Bookmarks from "../pages/Documents/Bookmarks.jsx";
import UploadDocument from "../pages/Documents/UploadDocument.jsx";

// ======================================
// ADMIN PAGES
// ======================================

import AdminDashboard from "../pages/Admin/Dashboard.jsx";

// ======================================
// APP ROUTER
// ======================================

const AppRouter = () => {
  return (
    <BrowserRouter>

      <Routes>

        {/* ==================================
            MAIN LAYOUT
        ================================== */}

        <Route element={<MainLayout />}>

          {/* ==================================
              PUBLIC ROUTES
          ================================== */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          {/* ==================================
              DOCUMENTS
          ================================== */}

          {/* Main Documents Feed */}
          <Route
            path="/documents"
            element={<Documents />}
          />

          {/* Search Documents */}
          <Route
            path="/documents/search"
            element={<SearchDocument />}
          />

          {/* Individual Document */}
          <Route
            path="/documents/:slug"
            element={<DocumentDetails />}
          />

          {/* ==================================
              PROFILE
          ================================== */}

          <Route
            path="/profile/:username"
            element={<Profile />}
          />

          {/* ==================================
              CONTACT
          ================================== */}

          <Route
            path="/contact"
            element={<Contact />}
          />


          {/* ==================================
              PROTECTED ROUTES
          ================================== */}

          <Route element={<ProtectedRoute />}>

            {/* MY DOCUMENTS */}

            <Route
              path="/my-documents"
              element={<MyDocuments />}
            />

            {/* BOOKMARKS */}

            <Route
              path="/bookmarks"
              element={<Bookmarks />}
            />

            {/* UPLOAD */}

            <Route
              path="/upload"
              element={<UploadDocument />}
            />

          </Route>


          {/* ==================================
              ADMIN ROUTES
          ================================== */}

          <Route element={<AdminRoute />}>

            <Route
              path="/admin"
              element={<AdminDashboard />}
            />

          </Route>


          {/* ==================================
              404
          ================================== */}

          <Route
            path="*"
            element={<PageNotFound />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
};

export default AppRouter;