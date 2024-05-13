import { useState } from "react";

export default function useSwipe({
  minDistance = 50,
  onSwipeToRight,
  onSwipeToLeft,
}) {
  const [startTouch, setStartTouch] = useState(null);
  const [endTouch, setEndTouch] = useState(null);
  function onTouchStart(e) {
    setStartTouch(e.targetTouches[0].clientX);
    setEndTouch(null);
  }

  function onTouchMove(e) {
    setEndTouch(e.targetTouches[0].clientX);
  }

  function onTouchEnd() {
    if (!(startTouch && endTouch)) return;
    endTouch - startTouch > minDistance
      ? onSwipeToRight?.()
      : endTouch - startTouch < -minDistance
      ? onSwipeToLeft?.()
      : "";
  }

  return { onTouchStart, onTouchMove, onTouchEnd };
}
