export default function TextArea({
  placeholder,
  value,
  setValue,
  required = false,
  min = 30,
  max = 1000,
}) {
  return (
    <textarea
      value={value}
      onChange={setValue}
      required={required}
      minLength={min}
      maxLength={max}
      placeholder={placeholder}
      className="h-72 w-full resize-none overflow-y-auto rounded-lg border border-text-color/50 bg-primary-background px-6 py-4 focus:outline focus:outline-1 focus:outline-primary-color"
    ></textarea>
  );
}
