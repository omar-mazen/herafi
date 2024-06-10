import { useState } from "react";
import Star from "./Star";

export default function Rating({
  rating = 0,
  setRating,
  stars = 5,
  size,
  color,
}) {
  const [tempRating, setTempRating] = useState(0);
  return (
    <ul className="flex justify-center gap-1" style={{ direction: "ltr" }}>
      {Array.from({ length: stars }, (_, i) => (
        <Star
          key={i}
          fill={tempRating ? i + 1 <= tempRating : i + 1 <= Math.round(rating)}
          onClick={() => setRating(rating == i + 1 ? 0 : i + 1)}
          onHoverIn={() => setTempRating(i + 1)}
          onHoverOut={() => setTempRating(0)}
          size={size}
          color={color}
        />
      ))}
    </ul>
  );
}
