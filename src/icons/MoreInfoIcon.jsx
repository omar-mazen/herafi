export default function MoreInfoIcon({ size = 20 }) {
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
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      ></path>
    </svg>
  );
}
