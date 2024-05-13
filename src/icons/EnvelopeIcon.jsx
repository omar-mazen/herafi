import React from "react";

export default function EnvelopeIcon({ size = 20 }) {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      aria-hidden="true"
      height={`${size}px`}
      width={`${size}px`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      ></path>
    </svg>
  );
}
