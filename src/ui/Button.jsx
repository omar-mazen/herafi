export default function Button({
  type,
  style = "primary",
  size = "medium",
  disabled = false,
  children,
  onClick,
  additionalStyle,
  capitalize = false,
}) {
  const base =
    " bg-primary-color text-white rounded-full flex items-center justify-center drop-shadow-lg ";

  const btnSize = {
    small:
      "w-[48px] h-[24px] px-[16px] py-1 text-small tracking-wide box-content ",
    medium:
      "w-[56px] h-[24px] px-[24px] py-1 text-medium tracking-wide box-content ",
    large:
      "w-[66px] h-[24px] px-[32px] py-1 text-medium tracking-wide font-medium box-content ",
    block: " w-full h-[44px] px-[16px] text-medium",
  };

  const btnStyle = {
    primary: base + btnSize[size],
    round: base + "h-[28px] aspect-square p-[4px] text-small",
    outline:
      "flex items-center justify-center drop-shadow-lg box-content border border-1 rounded-full " +
      btnSize[size],
  };
  return (
    <button
      type={type || "button"}
      disabled={disabled}
      className={`relative cursor-pointer ${btnStyle[style]}  ${
        additionalStyle ? additionalStyle : ""
      }  ${capitalize ? "capitalize" : ""}`}
      onClick={() => {
        onClick?.();
      }}
    >
      {children}
    </button>
  );
}
