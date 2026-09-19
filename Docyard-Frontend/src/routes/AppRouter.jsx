import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute.jsx";
import AdminRoute from "./AdminRoute.jsx";

import MainLayout from "../layouts/MainLayout.jsx";

import Home from "../pages/Home.jsx";
import Login from "../pages/Auth/Login.jsx";
import Register from "../pages/Auth/Register.jsx";
import About from "../pages/About/About.jsx";

import Documents from "../pages/Documents/Documents.jsx";
import DocumentDetails from "../pages/Documents/DocumentDetails.jsx";
import SearchDocument from "../pages/Documents/SearchDocuments.jsx";

import Profile from "../pages/Profile/Profile.jsx";
import Contact from "../pages/Contact/Contact.jsx";

import MyDocuments from "../pages/Documents/MyDocuments.jsx";
import Bookmarks from "../pages/Documents/Bookmarks.jsx";
import UploadDocument from "../pages/Documents/UploadDocument.jsx";

import AdminDashboard from "../pages/Admin/Dashboard.jsx";
import AdminUsers from "../pages/Admin/Users.jsx";
import AdminDocuments from "../pages/Admin/Documents.jsx";
import AdminContacts from "../pages/Admin/Contacts.jsx";

import VerifyOTP from "../pages/verifyOtp/VerifyOtp.jsx";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword.jsx"
import ForgotPasswordVerify from "../pages/ForgotPassword/ForgotPasswordVerify.jsx";
import ResetPassword from "../pages/ForgotPassword/ResetPassword.jsx";
import VerifyAdminOTP from "../pages/AdminOtp/VerifyAdminOtp.jsx";

import PageNotFound from "../pages/PageNotFound/PageNotFound.jsx";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>

          {/* Public Routes */}

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

          <Route
            path="/verifyAdminOtp"
            element={<VerifyAdminOTP />}
          />

          <Route
            path="/verifyOtp"
            element={<VerifyOTP />}
          />

          <Route
            path="/forgotPassword"
            element={<ForgotPassword />}
          />

          <Route
            path="/forgotPassword/forgotPasswordVerify"
            element={<ForgotPasswordVerify />}
          />

          <Route
            path="/forgotPassword/resetPassword"
            element={<ResetPassword />}
          />

          {/* Documents */}

          <Route
            path="/documents"
            element={<Documents />}
          />

          <Route
            path="/documents/search"
            element={<SearchDocument />}
          />

          <Route
            path="/documents/:slug"
            element={<DocumentDetails />}
          />

          {/* Profile */}

          <Route
            path="/profile/:username"
            element={<Profile />}
          />

          {/* Contact */}

          <Route
            path="/contact"
            element={<Contact />}
          />

          {/* Protected Routes */}

          <Route element={<ProtectedRoute />}>
            <Route
              path="/my-documents"
              element={<MyDocuments />}
            />

            <Route
              path="/bookmarks"
              element={<Bookmarks />}
            />

            <Route
              path="/upload"
              element={<UploadDocument />}
            />
          </Route>

          {/* Admin Routes */}

          <Route element={<AdminRoute />}>
            <Route
              path="/admin"
              element={<AdminDashboard />}
            />

            <Route
              path="/admin/users"
              element={<AdminUsers />}
            />

            <Route
              path="/admin/documents"
              element={<AdminDocuments />}
            />

            <Route
              path="/admin/contacts"
              element={<AdminContacts />}
            />
          </Route>

          {/* 404 */}

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