import React, { useState } from "react";
// import img from "../assets/images/portfolioLogNoBg.png";
import { FaBars, FaTimes } from "react-icons/fa";
// import "../styles/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleNavIcon = () => {
    setNav(!nav);
  };

  const handleClick = () => setNav(!nav);

  return (
    <div
      id="navbar"
      className="sticky w-full h-[80px] flex justify-between items-center px-4 text-lightShaded bg-darkShaded z-10"
    >
      <div>
        <Link to={"home"} className="cursor-pointer">
          <p>Logo</p>
        </Link>
      </div>
      <div className="hidden md:block blockNav">
        <ul className="flex justify-between items-center w-full">
          <li className="py-2 px-4 hover:text-blue-500 cursor-pointer">
            <Link to="home">Home</Link>
          </li>
          <li className="py-2 px-4 hover:text-blue-500 cursor-pointer">
            <Link to="about">About</Link>
          </li>
          <li className="py-2 px-4 hover:bg-[#0fd9a] hover:text-blue-500 cursor-pointer">
            <Link to="skills">Skills</Link>
          </li>
          <li className="py-2 px-4 hover:bg-[#0fd9a] hover:text-blue-500 cursor-pointer">
            <Link to="work">Work</Link>
          </li>
          <li className="py-2 px-4 hover:bg-[#0fd9a] hover:text-blue-500 cursor-pointer">
            <Link to="contact">Contact</Link>
          </li>
        </ul>
      </div>

      {/* Hambuger */}
      <div
        onClick={handleNavIcon}
        className="block md:hidden z-10 hover:cursor-pointer mx-4 text-gray-100"
        id="icons"
      >
        {!nav ? <FaBars size={25} /> : <FaTimes size={25} />}
      </div>

      {/* Mobile Menu */}
      <ul
        className={
          !nav
            ? "hidden"
            : "absolute top-0 left-0 w-full h-screen flex flex-col justify-center items-center bg-[#0a192f]"
        }
      >
        <li className="py-6 text-3xl cursor-pointer">
          {/* <Link to='contact' smooth={true} duration={500}>Home</Link> */}
          <Link onClick={handleClick} to="home">
            Home
          </Link>
        </li>
        <li className="py-6 text-3xl cursor-pointer">
          <Link onClick={handleClick} to="about">
            About
          </Link>
        </li>
        <li className="py-6 text-3xl cursor-pointer">
          <Link onClick={handleClick} to="skills">
            Skills
          </Link>
        </li>
        <li className="py-6 text-3xl cursor-pointer">
          <Link onClick={handleClick} to="work">
            Work
          </Link>
        </li>
        <li className="py-6 text-3xl cursor-pointer">
          <Link onClick={handleClick} to="contact">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
