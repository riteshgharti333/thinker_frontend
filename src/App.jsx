
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import Write from "./pages/Write/Write";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import  toast, { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile/Profile";
import { Context } from "./context/Context";
import Single from "./components/Single/Single";
import Foooter from "./components/Foooter/Foooter";
import QueryPosts from "./pages/QueryPosts/QueryPosts";
import "./style/global.scss"

function App() {
  const { user } = useContext(Context);


  return (
    <div className="app">
    <Router>
    {!user ? (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    ) : (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/posts/:id" element={<Single />} />
          <Route path="/write" element={<Write />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/posts" element={<QueryPosts />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Foooter />
      </>
    )}

    <Toaster
    toastOptions={{
      className:'',
      style: {
        fontFamily: "Dosis, sans-serif",
        fontSize: "24px",
        fontWeight: "600",
      },
    }}
    />
  </Router>
  </div>
  );
}

export default App;
