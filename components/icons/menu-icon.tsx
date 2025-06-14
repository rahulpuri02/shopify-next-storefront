import React from "react";

function MenuIcon() {
  return (
    <div className="relative flex cursor-pointer items-center justify-center">
      <div className="relative size-4">
        <span className="absolute top-1 left-0 block h-0.5 w-5 bg-white transition-all duration-100"></span>
        <span className="absolute top-3 left-0 block h-0.5 w-5 bg-white transition-all duration-100"></span>
      </div>
      <span className="sr-only" />
    </div>
  );
}

export default MenuIcon;
