// App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import Navbar from './components/Navbar/Navbar';
import Singlpost from './pages/Singlpost/Singlpost';
import Write from './pages/Write/Write';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import {Toaster} from 'react-hot-toast'
import PostUpdate from './components/PostUpdate/PostUpdate';
import Profile from './pages/Profile/Profile';


function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path="/" element={<Homepage />} />
        <Route path="/posts/:id" element={<Singlpost />} />
        <Route path="/write" element={<Write />} />
        <Route path="/update" element={<PostUpdate />} />
        <Route path="/profile" element={<Profile />} />


      </Routes>
      
      {/* <Toaster /> */}
    </Router>
  );
}

export default App;
