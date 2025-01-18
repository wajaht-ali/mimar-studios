import React from "react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Docs = () => {
  return (
    <div className="flex flex-col items-center justify-center text-dark text-center w-full h-screen bg-light/60">
      <span className="text-dark font-bold text-5xl">Documentaion</span>
      <h2 className="font-heading my-2 text-2xl font-bold">
        Please find the detail Documentaion in the{" "}
        <code className="font-semibold text-primary">Readme.md</code> file.
      </h2>
      <p>You may find the link below.</p>
      <div className="mt-8 flex justify-center gap-2">
        <button className="bg-blue-500 rounded-md p-2 outline-none hover:bg-blue-400 text-white flex flex-row items-center gap-x-2">
          <FaGithub fill="white" />
          <Link
            to="https://github.com/wajaht-ali/mimar-studios"
            target="_blank"
          >
            Readme
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Docs;
