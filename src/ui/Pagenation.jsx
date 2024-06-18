import { useSearchParams } from "react-router-dom";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import { useEffect, useRef, useState } from "react";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import useWindowSize from "../hooks/useWindowResize";

export default function Pagenation({ total }) {
  const size = useWindowSize();
  const [searchParams, setSearchParams] = useSearchParams();
  const containerRef = useRef();
  const [available, setAvailable] = useState();
  const pageRef = useRef();
  useEffect(
    () =>
      setAvailable(
        Math.floor(
          (containerRef.current?.getBoundingClientRect().right -
            containerRef.current?.getBoundingClientRect().left) /
            pageRef.current?.getBoundingClientRect().width,
        ),
      ),
    [containerRef.current, pageRef.current, size],
  );
  const currPage = Number(searchParams.get("page")) || 1;
  function setPage(page) {
    if (page < 1 || page > total) return;
    searchParams.set("page", page);
    setSearchParams(searchParams);
  }
  return (
    <div
      style={{ direction: "ltr" }}
      className="flex items-center rounded-lg drop-shadow-md"
    >
      <span
        ref={pageRef}
        style={{ direction: "ltr" }}
        onClick={() => setPage(currPage - 1)}
        className={`flex min-h-20 min-w-20 items-center justify-center rounded-l-lg bg-secondary-background ${currPage == 1 ? " cursor-not-allowed text-text-color/20" : ""}`}
      >
        <ArrowLeftIcon />
      </span>
      <ul
        className="flex h-fit w-full content-center items-center bg-secondary-background text-medium"
        ref={containerRef}
      >
        {Array.from({ length: available }, (_, i) => {
          const c = Math.floor((currPage - 1) / available);
          const p = c * available + i + 1;
          if (p > total) return;
          return (
            <li
              key={p}
              onClick={() => setPage(p)}
              className={`flex min-h-20 min-w-20 cursor-pointer items-center justify-center rounded-lg ${currPage == p ? " relative z-[2]  before:absolute before:right-1/2 before:top-1/2 before:z-[-1] before:h-12 before:w-12 before:translate-x-[50%] before:translate-y-[-50%] before:rounded-full before:bg-primary-color" : ""}`}
            >
              {p}
            </li>
          );
        })}
      </ul>
      <span
        style={{ direction: "ltr" }}
        className={`flex h-20 w-20 items-center justify-center rounded-r-lg bg-secondary-background ${currPage == total ? " cursor-not-allowed text-text-color/20" : ""}`}
        onClick={() => setPage(currPage + 1)}
      >
        <ArrowRightIcon />
      </span>
    </div>
  );
}
