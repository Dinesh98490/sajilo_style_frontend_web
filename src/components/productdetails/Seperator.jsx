import React from "react";

function Separator({ className = "" }) {
  return (
    <div className={`w-full h-px bg-gray-200 my-4 ${className}`} />
  );
}

export default Separator;
