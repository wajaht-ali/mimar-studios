import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/mimar_Logo-nobg.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [nav, setNav] = useState<boolean>(false);
  const handleNavIcon = () => {
    setNav(!nav);
  };
  const handleClick = () => setNav(!nav);

  return (
    <div
      id="navbar"
      className="sticky w-full h-[80px] flex justify-between items-center px-4 text-dark shadow-sm shadow-gray-300 z-10"
    >
      <div>
        <Link to={"/"} className="cursor-pointer outline-none border-none">
          <img src={logo} alt="img_logo" />
        </Link>
      </div>
      <div className="hidden md:block blockNav">
        <ul className="flex justify-between items-center w-full">
          <li className="py-2 px-4 hover:text-blue-500 cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="py-2 px-4 hover:bg-[#0fd9a] hover:text-blue-500 cursor-pointer">
            <Link to="/docs">Docs</Link>
          </li>
          <li>
            {user ? (
              <button
                onClick={logout}
                className="bg-primary hover:bg-primary/80 text-white mr-2 rounded-md py-2 px-4 outline-none"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-primary hover:bg-primary/80 text-white mr-2 rounded-md py-2 px-4 outline-none"
              >
                Signin
              </button>
            )}
          </li>
        </ul>
      </div>

      <div
        onClick={handleNavIcon}
        className="block md:hidden z-10 hover:cursor-pointer mx-4 text-gray-100"
        id="icons"
      >
        {!nav ? <FaBars fill="#333" size={25} /> : <FaTimes size={25} />}
      </div>

      <ul
        className={
          !nav
            ? "hidden"
            : "absolute top-0 left-0 w-full h-screen flex flex-col justify-center items-center bg-[#0a192f]"
        }
      >
        <li className="py-6 text-3xl cursor-pointer text-light">
          <Link onClick={handleClick} to="/">
            Home
          </Link>
        </li>
        <li className="py-6 text-3xl cursor-pointer text-light">
          <Link onClick={handleClick} to="/docs">
            Docs
          </Link>
        </li>
        <li>
          {user ? (
            <button
              onClick={logout}
              className="bg-primary hover:bg-primary/80 text-white mr-2 rounded-md py-2 px-4 outline-none"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-primary hover:bg-primary/80 text-white mr-2 rounded-md py-2 px-4 outline-none"
            >
              Signin
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
