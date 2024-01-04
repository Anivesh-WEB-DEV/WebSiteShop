import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './component/navbar';
import Home from './Home';
import Cart from './component/cart';
import Login from './component/login/login';
import NotFound from './component/NotFound';
import Signup from './component/signup/signup';
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";


const App = () =>{
  return (
    <div>
      <BrowserRouter basename='/subdirectory'>
      <ToastContainer/>
        <Navbar />
        <Routes>
          <Route path="/cart" element={<Cart/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/error" element={<NotFound/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
