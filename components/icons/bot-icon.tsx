import React from "react";

function BotIcon() {
  return (
    <svg
      className="absolute left-1 h-14 w-12"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M60 80 Q60 60 80 60 L120 60 Q140 60 140 80 L140 120 Q140 140 120 140 L80 140 Q60 140 60 120 Z"
        fill="white"
        stroke="none"
      />
      <path d="M85 140 L95 155 L105 140 Z" fill="white" stroke="none" />
      <circle cx="100" cy="45" r="8" fill="white" />
      <rect x="98" y="45" width="4" height="15" fill="white" />
      <circle cx="85" cy="85" r="8" fill="#1F479E" />
      <circle cx="115" cy="85" r="8" fill="#1F479E" />
      <path
        d="M85 105 Q100 115 115 105"
        stroke="#1F479E"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default BotIcon;
