import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center text-center bg-dark w-full h-screen">
      <span className="text-gray-400 font-bold text-5xl">
        404
      </span>
      <h2 className="font-heading my-2 text-2xl font-bold text-white">
        Something&apos;s went wrong!
      </h2>
      <p className="text-white">
        Sorry, the page you are looking for doesn&apos;t exist.
      </p>
      <div className="mt-8 flex justify-center gap-2">
        <button onClick={() => navigate("/")} className="bg-blue-500 rounded-md p-2 outline-none hover:bg-blue-400 text-white">
          Go back
        </button>
        <button onClick={() => navigate("/")} className="bg-blue-500 rounded-md p-2 outline-none hover:bg-blue-400 text-white">
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
