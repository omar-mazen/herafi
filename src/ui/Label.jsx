export default function Label({ children }) {
  return (
    <div className="flex items-center gap-2 text-nowrap rounded-full border border-text-color/20 px-5 py-2 text-xsmall shadow-md dark:shadow-lg md:text-small">
      {children}
    </div>
  );
}
