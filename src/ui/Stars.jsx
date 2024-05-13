import Star from "./Star";

export default function Stars({ count = 5 }) {
  return (
    <li className=" flex">
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} fill={true} />
      ))}
    </li>
  );
}
