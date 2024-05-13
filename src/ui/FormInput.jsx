export default function FormInput({
  type = "text",
  required = false,
  label = "",
  autoComplete = "off",
  value,
  error,
  register,
  icon,
}) {
  return (
    <div>
      <div className={`relative`}>
        {value?.length > 0 && (
          <label
            className={`absolute ${icon ? "right-12" : "right-6"} top-[2px] text-base`}
          >
            {label}
          </label>
        )}
        {icon && (
          <span className=" absolute right-7 top-1/2 translate-x-[50%] translate-y-[-50%]">
            {icon}
          </span>
        )}
        <input
          type={type}
          placeholder={label}
          autoComplete={autoComplete}
          required={required}
          className={`h-[4.5rem] w-full rounded-lg border border-text-color/50 bg-primary-background ${icon ? "px-12" : "px-6"} focus:outline focus:outline-1 focus:outline-primary-color`}
          {...register}
        />
      </div>
      {error && (
        <p className=" mt-2 text-small text-warning-color">{error.message}</p>
      )}
    </div>
  );
}
