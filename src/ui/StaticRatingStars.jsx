import Star from "./Star";
const STARS_NUMBER = 5;
export default function StaticRatingStars({ ratingPercentage = 0, size }) {
  return (
    <ul className="flex w-fit justify-center">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          size={size}
          key={i}
          fill={i + 1 <= Math.round(ratingPercentage * STARS_NUMBER)}
        />
      ))}
    </ul>
  );
}
