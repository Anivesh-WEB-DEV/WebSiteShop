import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './component/navbar';
import Home from './Home';
import Cart from './component/cart';
import NotFound from './component/NotFound';
import Signup from './component/PositionMenu/PositionLogo';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import Cards from './component/cards';


const App = () => {
  return (
    <div>
      <BrowserRouter  >
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/card" element={<Cards />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/error" element={<NotFound />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
