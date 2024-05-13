import { useEffect, useState } from "react";
const mobiles = [
  /Android/i,
  /webOS/i,
  /iPhone/i,
  /iPad/i,
  /iPod/i,
  /BlackBerry/i,
  /Windows Phone/i,
];

export default function useScreenType() {
  const [screenType, setScreenType] = useState();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setScreenType("xl");
      else if (window.innerWidth >= 1024 && window.innerWidth < 1280)
        setScreenType("lg");
      else if (window.innerWidth >= 768 && window.innerWidth < 1024)
        setScreenType("md");
      else if (window.innerWidth >= 640 && window.innerWidth < 768)
        setScreenType("sm");
      else if (window.innerWidth < 640 || navigator.userAgent.match(mobiles))
        setScreenType("mobile");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return screenType;
}
