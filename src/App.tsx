import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Logout from'./pages/logout';
import './styles/style.css';
function App() {
  return (
<>

    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/logout" element={<Logout/>} />
      </Routes>

    </>
  );
}
export default App;
