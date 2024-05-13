export default function OutlineClockIcon({ size = 20 }) {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      aria-hidden="true"
      dataSlot="icon"
      height={`${size}px`}
      width={`${size}px`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      ></path>
    </svg>
  );
}
