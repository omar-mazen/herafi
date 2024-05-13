export default function Input({
  type = "text",
  required = false,
  label = "",
  autoComplete = "off",
  icon,
  direction = "rtl",
  value,
  setValue,
  disabled,
}) {
  return (
    <div className={`relative`}>
      {icon && (
        <span
          className={`absolute ${direction == "rtl" ? "right-7 translate-x-[50%]" : "left-7 translate-x-[-50%]"} top-1/2  translate-y-[-50%]`}
        >
          {icon}
        </span>
      )}
      <input
        type={type}
        placeholder={label}
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ direction: direction }}
        disabled={disabled}
        className={`h-[4rem] w-full rounded-lg border border-text-color/50 bg-primary-background ${icon ? "px-14" : "px-6"} focus:outline focus:outline-1 focus:outline-primary-color`}
      />
    </div>
  );
}
