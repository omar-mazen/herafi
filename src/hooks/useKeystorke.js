import { useEffect } from "react";

export default function useKeystroke(key, handler, trargetElement = document) {
  useEffect(
    function () {
      function handleClick(e) {
        if (e.key === key) handler();
      }
      trargetElement.addEventListener("keydown", handleClick);
      return () => trargetElement.removeEventListener("keydown", handleClick);
    },
    [handler, key],
  );
}
