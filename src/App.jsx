import { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import Write from "./pages/Write/Write";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import { Context } from "./context/Context";
import Single from "./components/Single/Single";
import Footer from "./components/Footer/Footer";
import QueryPosts from "./pages/QueryPosts/QueryPosts";
import "./style/global.scss";
import UpdatePassword from "./pages/UpdatePassword/UpdatePassword";
import UserPosts from "./pages/UserPosts/UserPosts";
import ContentPosts from "./pages/ContentPosts/ContentPosts";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import { Toaster } from "react-hot-toast";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

// Function to scroll to the top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to top
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout />
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontFamily: "Dosis, sans-serif",
            fontSize: "18px",
            fontWeight: "600",
          },
        }}
      />
    </Router>
  );
}

function Layout() {
  const { user } = useContext(Context);
  const location = useLocation();

  // const ProtectedRoute = ({ children }) => {
  //   return user ? children : <Navigate to="/login" />;
  // };

  const hideNavbarFooter =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname.startsWith("/reset-password") ||
    (!user && location.pathname === "/forgot-password");

  return (
    <div className="app">
      {!hideNavbarFooter && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />

        {/* Protected Routes */}
        <>
          <Route path="/" element={<Homepage />} />
          <Route path="/single/:id" element={<Single />} />
          <Route path="/posts/content/:type" element={<ContentPosts />} />
          <Route path="/write" element={<Write />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/posts/query" element={<QueryPosts />} />
          <Route path="/user/:id/posts" element={<UserPosts />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/change-password" element={<UpdatePassword />} />
          <Route path="/*" element={<NotFoundPage />} />
        </>
      </Routes>

      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;
