import { useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useClickOutside from "../hooks/useClickOutside";
import SearchIcon from "../icons/SearchIcon";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function SearchBar() {
  const queryClient = useQueryClient();
  const crafts = queryClient
    .getQueryData(["crafts"])
    ?.map((craft) => craft?.name);
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [isActive, setIsActive] = useState();
  const outsideRef = useClickOutside("click", () => {
    setIsActive(false);
  });
  const enterRef = useRef();
  const filteredCrafts = crafts?.filter((craft) => craft?.startsWith(query));
  return (
    <>
      <div ref={outsideRef} className=" relative w-full ">
        <input
          ref={enterRef}
          value={query}
          onChange={(e) => {
            if (e.target.value.length > 0) setIsActive(true);
            setQuery(e.target.value);
          }}
          placeholder="إبحث عن حرفي ..."
          type="text"
          onFocus={(e) => {
            if (e.target.value.length > 1) setIsActive(true);
          }}
          className={`h-16 w-full rounded-lg border border-text-color/50 bg-secondary-background pl-24 pr-6 focus:outline focus:outline-1  focus:outline-primary-color ${isActive ? "rounded-b-none" : ""} `}
        />
        <span
          className={`absolute left-0 top-1/2 flex h-full w-16 translate-y-[-50%] cursor-pointer items-center justify-center rounded-e-lg bg-text-color text-primary-background ${isActive ? " rounded-bl-none" : ""}`}
        >
          <SearchIcon />
        </span>
        {isActive && filteredCrafts.length > 0 && query.length > 0 && (
          <ul className=" has-[li]: absolute left-0 top-16 h-[200px] w-full divide-y divide-text-color/50 overflow-y-auto rounded-b-lg border border-t-0 border-text-color/50 bg-secondary-background">
            {filteredCrafts.map((filterdCrafts, i) => (
              <li
                key={i}
                className="w-full text-xsmall duration-200 hover:bg-primary-color hover:transition-all"
              >
                <Link
                  to={`client/search?query=${filterdCrafts}`}
                  className={`block w-full px-6 py-3 `}
                  onClick={() => {
                    setIsActive(false);
                    setQuery(filterdCrafts);
                  }}
                >
                  {filterdCrafts}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
