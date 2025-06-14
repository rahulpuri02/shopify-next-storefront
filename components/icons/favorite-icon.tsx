import clsx from "clsx";
import React from "react";

type ComponentProps = {
  className?: string;
};
function FavoriteIcon({ className }: ComponentProps) {
  return (
    <svg
      className={clsx("h-5 w-4 cursor-pointer fill-none stroke-1", className)}
      stroke="white"
      viewBox="0 0 13 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="stroke-white"
        viewBox="0 0 13 16"
        d="M6.12633 8.91907 1 14.6851V.5h11v14.1851L6.87367 8.91907 6.5 8.49876l-.37367.42031Z"
      ></path>
    </svg>
  );
}

export default FavoriteIcon;
