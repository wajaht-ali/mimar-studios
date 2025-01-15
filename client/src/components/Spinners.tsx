import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Spinners = ({ color }: { color: string }) => {
  return (
    <RotatingLines
      visible={true}
      width="30"
      strokeColor={`${color}`}
      strokeWidth="3"
      animationDuration="1"
      ariaLabel="rotating-lines-loading"
    />
  );
};

export default Spinners;
