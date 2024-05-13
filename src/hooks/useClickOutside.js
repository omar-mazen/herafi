import { useEffect, useRef } from "react";

export default function useClickOutside(
  event = "click",
  handler,
  listenCapturing = true
) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) handler?.();
      }
      document.addEventListener(event, handleClick, listenCapturing);
      return () =>
        document.removeEventListener(event, handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );
  return ref;
}
