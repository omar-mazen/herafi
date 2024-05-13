import { useState } from "react";
import useClickOutside from "../hooks/useClickOutside";
import ArrowDropUpIcon from "../icons/ArrowDownIcon";
import SearchIcon from "../icons/SearchIcon";

export default function SelectOption({
  label,
  selectedValue,
  setSelectedValue,
  options = [],
  disable,
  full,
  search = true,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchString, setSearchString] = useState("");
  const ref = useClickOutside("click", () => setIsOpen(false));
  return (
    <div
      ref={ref}
      className={` ${disable ? "  opacity-50" : ""} relative h-[4rem] ${full ? "w-full" : "w-60 sm:w-72"}  select-none space-y-3 text-small `}
    >
      <div
        onClick={() => (disable ? "" : setIsOpen((status) => !status))}
        className={` ${disable ? "cursor-not-allowed" : "cursor-pointer"} flex h-full items-center justify-between bg-secondary-background px-6 py-3 ${
          isOpen ? "rounded-t-lg" : "rounded-lg"
        }`}
      >
        <span
          className={` overflow-hidden overflow-ellipsis text-nowrap ${
            selectedValue
              ? " font-medium capitalize opacity-100"
              : " text-small opacity-75"
          }`}
        >
          {selectedValue || label}
        </span>
        <span className={`${isOpen ? "rotate-180" : ""} opacity-75`}>
          <ArrowDropUpIcon />
        </span>
      </div>
      {isOpen && (
        <ul className="absolute left-0 z-10 max-h-60 w-full overflow-y-auto rounded-b-lg bg-secondary-background">
          {search && (
            <div className="relative">
              <input
                type="text"
                className=" w-full border-b border-text-color/20 bg-secondary-background py-2 pl-11 pr-2 outline-none focus:ring-[1px] focus:ring-primary-color"
                placeholder={`إبحث عن ${label}`}
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
              />
              <span className=" absolute left-6 top-1/2 translate-x-[-50%] translate-y-[-50%] ">
                <SearchIcon size={13} />
              </span>
            </div>
          )}
          {options
            .filter((option) => option.startsWith(searchString))
            .map((option, i) => (
              <li
                key={i}
                className="cursor-pointer border-b border-text-color/20 px-6 py-2 transition-all duration-100 ease-in-out last:border-b-0 hover:bg-primary-color"
                onClick={() => {
                  setSelectedValue(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
