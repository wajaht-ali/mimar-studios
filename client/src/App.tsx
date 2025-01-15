/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import "./styles/App.css";
import Login from "./components/pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/pages/Signup";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Navbar from "./components/layouts/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
