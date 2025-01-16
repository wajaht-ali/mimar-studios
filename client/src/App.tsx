/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import "./styles/App.css";
import Login from "./components/pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/pages/Signup";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Navbar from "./components/layouts/Navbar";
import { ToastContainer, Bounce } from "react-toastify";
import UpdateUser from "./components/pages/UpdateUser";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/update-user/:id" element={<UpdateUser />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
