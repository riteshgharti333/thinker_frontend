// App.jsx

import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import Singlpost from "./pages/Singlpost/Singlpost";
import Write from "./pages/Write/Write";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import toast, { Toaster } from "react-hot-toast";
import PostUpdate from "./components/PostUpdate/PostUpdate";
import Profile from "./pages/Profile/Profile";
import { Context } from "./context/Context";
import Single from "./components/Single/Single";

function App() {
  const { user } = useContext(Context);
  
  return (
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
          <Route path="/update" element={<PostUpdate />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </>
    )}

    <Toaster />
  </Router>
  );
}

export default App;
