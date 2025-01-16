import React from "react";

const CardSkeleton = () => {
  return (
    <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg p-6 animate-pulse">
      <div className="text-gray-300 text-sm mb-4">
        <div className="h-6 bg-gray-300 rounded-md w-3/4 mx-auto mb-2"></div>{" "}
        <div className="h-4 bg-gray-300 rounded-md w-1/3 mx-auto"></div>{" "}
      </div>

      <div className="flex justify-center my-6">
        <div className="h-16 w-16 bg-gray-300 rounded-full"></div>{" "}
      </div>

      <div className="text-center">
        <div className="h-10 bg-gray-300 rounded-md w-2/3 mx-auto mb-2"></div>{" "}
        <div className="h-4 bg-gray-300 rounded-md w-1/2 mx-auto"></div>{" "}
      </div>

      <div className="flex justify-between text-gray-300 mt-6">
        <div className="text-center">
          <div className="h-4 bg-gray-300 rounded-md w-10 mx-auto mb-1"></div>{" "}
          <div className="h-6 bg-gray-300 rounded-md w-12 mx-auto"></div>{" "}
        </div>
        <div className="text-center">
          <div className="h-4 bg-gray-300 rounded-md w-14 mx-auto mb-1"></div>{" "}
          <div className="h-6 bg-gray-300 rounded-md w-12 mx-auto"></div>{" "}
        </div>
        <div className="text-center">
          <div className="h-4 bg-gray-300 rounded-md w-14 mx-auto mb-1"></div>{" "}
          <div className="h-6 bg-gray-300 rounded-md w-12 mx-auto"></div>{" "}
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
