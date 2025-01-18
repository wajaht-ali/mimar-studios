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
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Docs from "./components/pages/Docs";
import About from "./components/pages/About";
import ForgotPassword from "./components/pages/ForgotPassword";

function App() {
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  return (
    <>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/about" element={<About />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
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
              theme="light"
              transition={Bounce}
            />
          </AuthProvider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
