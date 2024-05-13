import { useSearchParams } from "react-router-dom";
import SortIcon from "../icons/SortIcon";

/**
 * @param {["joinDate", "rating", "completedJob"]} options "joinDate" || "joinDate-asc" || "joinDate-desc" || "rating" || "completedJob"
 */
export default function SortBy({
  options = ["joinDate", "rating", "completedJob"],
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = searchParams.get("sort_by") || "join_date";
  function handleSort(param) {
    if (searchParams.get(param)) searchParams.delete(param);
    else {
      searchParams.set("sort_by", param);
      setSearchParams(searchParams);
    }
  }
  return (
    <>
      <div className="flex items-center gap-2 bg-primary-color p-2">
        <SortIcon />
        <span className=" font-semibold">ترتيب حسب</span>
      </div>
      <ul className="mt-3 select-none px-2 font-light">
        {options.includes("joinDate") && (
          <li className={`flex cursor-pointer items-center gap-4 px-2  py-2`}>
            <input
              type="radio"
              className="accent-success-color"
              name="sort"
              id={"join_date"}
              value={"join_date"}
              defaultChecked={selected == "join_date"}
              onClick={() => handleSort("join_date")}
            />
            {
              <label htmlFor="join_date" className=" cursor-pointer">
                تاريخ الانضمام
              </label>
            }
          </li>
        )}
        {options.includes("joinDate-asc") && (
          <li className={`flex cursor-pointer items-center gap-4 px-2  py-2`}>
            <input
              type="radio"
              className="accent-success-color"
              name="sort"
              id={"join_date"}
              value={"join_date"}
              defaultChecked={selected == "join_date"}
              onClick={() => handleSort("join_date")}
            />
            {
              <label htmlFor="join_date" className=" cursor-pointer">
                تاريخ الانضمام - من الاحدث للاقدم
              </label>
            }
          </li>
        )}
        {options.includes("joinDate-desc") && (
          <li className={`flex cursor-pointer items-center gap-4 px-2  py-2`}>
            <input
              type="radio"
              className="accent-success-color"
              name="sort"
              id={"join_date"}
              value={"join_date"}
              defaultChecked={selected == "join_date"}
              onClick={() => handleSort("join_date")}
            />
            {
              <label htmlFor="join_date" className=" cursor-pointer">
                تاريخ الانضمام - من الاقدم للاحدث
              </label>
            }
          </li>
        )}
        {options.includes("date-asc") && (
          <li className={`flex cursor-pointer items-center gap-4 px-2  py-2`}>
            <input
              type="radio"
              className="accent-success-color"
              name="sort"
              id={"join_date"}
              value={"join_date"}
              defaultChecked={selected == "join_date"}
              onClick={() => handleSort("join_date")}
            />
            {
              <label htmlFor="join_date" className=" cursor-pointer">
                التاريخ - من الاحدث للاقدم
              </label>
            }
          </li>
        )}
        {options.includes("date-desc") && (
          <li className={`flex cursor-pointer items-center gap-4 px-2  py-2`}>
            <input
              type="radio"
              className="accent-success-color"
              name="sort"
              id={"join_date"}
              value={"join_date"}
              defaultChecked={selected == "join_date"}
              onClick={() => handleSort("join_date")}
            />
            {
              <label htmlFor="join_date" className=" cursor-pointer">
                التاريخ - من الاقدم للاحدث
              </label>
            }
          </li>
        )}
        {options.includes("rating") && (
          <li className={`flex cursor-pointer items-center gap-4 px-2  py-2`}>
            <input
              type="radio"
              className="accent-success-color"
              name="sort"
              id={"rating"}
              value={"rating"}
              defaultChecked={selected == "rating"}
              onClick={() => handleSort("rating")}
            />
            <label htmlFor="rating" className=" cursor-pointer">
              التقييم
            </label>
          </li>
        )}
        {options.includes("completedJob") && (
          <li className={`flex cursor-pointer items-center gap-4 px-2  py-2`}>
            <input
              type="radio"
              className="accent-success-color"
              name="sort"
              id={"done_jobs"}
              value={"done_jobs"}
              defaultChecked={selected == "done_jobs"}
              onClick={() => handleSort("done_jobs")}
            />
            <label htmlFor="done_jobs" className=" cursor-pointer">
              الاعمال المكتملة
            </label>
          </li>
        )}
      </ul>
    </>
  );
}
