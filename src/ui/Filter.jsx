import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCities, getGovernorates } from "../util/constatnt";
import FilterShapeIcon from "../icons/FilterShapeIcon";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import StaticRatingStars from "./StaticRatingStars";
import { useAuth } from "../context/Auth";

/**
 * @param {["joinDate", "rating", "location"]} options "joinDate" || "rating" || "location"
 */

export default function Filter({
  options = ["joinDate", "rating", "location"],
}) {
  return (
    <div>
      <div className="flex items-center gap-2 bg-primary-color p-2">
        <FilterShapeIcon />
        <span className=" font-semibold">تصنيف</span>
      </div>
      <div className="divide-y divide-text-color/20 px-2">
        {options.includes("joinDate") && <JoinDate />}
        {options.includes("rating") && <Rating />}
        {options.includes("location") && <Governorates />}
      </div>
    </div>
  );
}
function Rating() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedMinStars = searchParams.get("min_rating");
  const { role } = useAuth();
  function handleMinRating(number) {
    searchParams.set("min_rating", number);
    setSearchParams(searchParams, { replace: true });
  }

  return (
    <div className="py-5">
      <span className=" font-medium">
        {role == "client" ? " تقييم الحرفي" : " تقييم العميل"}
      </span>
      <ul className=" mt-4 space-y-2 px-4">
        <li className="flex items-center gap-2">
          <input
            id="5star"
            value="5star"
            type="radio"
            className="accent-success-color"
            name="rating"
            onClick={() => handleMinRating(5)}
            defaultChecked={selectedMinStars == 5}
          />
          <label className="flex items-center gap-2">
            <StaticRatingStars ratingPercentage={1} />
            <span className=" text-xsmall font-semibold">فقط</span>
          </label>
        </li>
        <li className="flex items-center gap-2">
          <input
            id="4star"
            value="4star"
            type="radio"
            className="accent-success-color"
            name="rating"
            onClick={() => handleMinRating(4)}
            defaultChecked={selectedMinStars == 4}
          />
          <label className="flex items-center gap-2">
            <StaticRatingStars ratingPercentage={0.8} />
            <span className=" text-xsmall font-semibold">وأكثر</span>
          </label>
        </li>
        <li className="flex items-center gap-2">
          <input
            id="3star"
            value="3star"
            type="radio"
            className="accent-success-color"
            name="rating"
            onClick={() => handleMinRating(3)}
            defaultChecked={selectedMinStars == 3}
          />
          <label className="flex items-center gap-2">
            <StaticRatingStars ratingPercentage={0.6} />
            <span className=" text-xsmall font-semibold">فقط</span>
          </label>
        </li>
        <li className="flex items-center gap-2">
          <input
            id="2star"
            value="2star"
            type="radio"
            className="accent-success-color"
            name="rating"
            onClick={() => handleMinRating(2)}
            defaultChecked={selectedMinStars == 2}
          />
          <label className="flex items-center gap-2">
            <StaticRatingStars ratingPercentage={0.4} />
            <span className=" text-xsmall font-semibold">وأكثر</span>
          </label>
        </li>
        <li className="flex items-center gap-2">
          <input
            id="1star"
            value="1star"
            type="radio"
            className="accent-success-color"
            name="rating"
            onClick={() => handleMinRating(1)}
            defaultChecked={selectedMinStars == 1}
          />
          <label className="flex items-center gap-2">
            <StaticRatingStars ratingPercentage={0.2} />
            <span className=" text-xsmall font-semibold">وأكثر</span>
          </label>
        </li>
      </ul>
    </div>
  );
}
function Governorates() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [expandGovernorates, setExpandGovernorates] = useState(true);
  const [expandCity, setExpandCity] = useState(true);
  const selectedGovernorates = searchParams.get("governorate");
  const selectedCities = searchParams.getAll("city");
  // const selectAll = selectedCities.includes("all");
  const allCities = selectedGovernorates ? getCities(selectedGovernorates) : []; // all cities for selected governorate

  function handleGovernorate(e) {
    searchParams.set("governorate", e.target.value);
    setSearchParams(searchParams, { replace: true });
    searchParams.delete("city");
    setSearchParams(searchParams, { replace: true });
  }

  function handleAddCities(e) {
    // if (selectedCities.includes("all")) {
    //   searchParams.delete("city", "all");
    //   allCities
    //     .filter((city) => city != e.target.value)
    //     ?.map((city) => searchParams.append("city", city));
    // }
    if (selectedCities.includes(e.target.value)) {
      searchParams.delete("city", e.target.value);
    } else {
      searchParams.append("city", e.target.value);
    }
    setSearchParams(searchParams, { replace: true });
  }

  // function handleSellectAll() {
  //   if (selectAll) {
  //     searchParams.delete("city");
  //   } else {
  //     searchParams.set("city", "all");
  //   }
  //   setSearchParams(searchParams, { replace: true });
  //   window.location.reload();
  // }

  return (
    <div className=" py-5">
      <div className="flex items-center justify-between ">
        <span className=" font-medium">المحافظة</span>
        <span
          className={`cursor-pointer ${expandGovernorates ? "" : " -rotate-90"}`}
          onClick={() => setExpandGovernorates((status) => !status)}
        >
          <ArrowDownIcon size={15} />
        </span>
      </div>
      {expandGovernorates && (
        <ul className=" px-4 pt-3">
          {getGovernorates.map((governorate, i) => (
            <li key={i} className="flex flex-col items-start">
              <div className="flex w-full justify-between">
                <div className="flex items-center gap-5">
                  <input
                    id={governorate}
                    value={governorate}
                    type="radio"
                    className="accent-success-color"
                    name="governorate"
                    onClick={handleGovernorate}
                    defaultChecked={governorate == selectedGovernorates}
                  />
                  <label htmlFor={governorate}>{governorate}</label>
                </div>
                {selectedGovernorates == governorate && (
                  <div className="flex items-center gap-2">
                    <span
                      className={`cursor-pointer ${expandCity ? "" : " -rotate-90"}`}
                      onClick={() => setExpandCity((status) => !status)}
                    >
                      <ArrowDownIcon size={15} />
                    </span>
                  </div>
                )}
              </div>
              {selectedGovernorates == governorate && expandCity && (
                <ul className="my-5">
                  {/* <li className="mb-5 flex items-center gap-4 px-4">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={(e) => {
                        handleSellectAll(governorate, e);
                      }}
                      className={`${selectAll ? " accent-success-color" : ""}`}
                    />
                    <label
                      className={`text-xsmall font-bold tracking-wider  ${selectAll ? " text-success-color" : "text-primary-color"}`}
                    >
                      كل المدن
                    </label>
                  </li> */}
                  {allCities?.map((city, i) => (
                    <li key={i} className="flex items-center gap-4 px-4">
                      <input
                        type="checkbox"
                        name="city"
                        checked={
                          selectedCities.includes(city) ||
                          selectedCities.includes("all")
                        }
                        value={city}
                        onChange={handleAddCities}
                        className="accent-success-color"
                      />
                      <label>{city}</label>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
function JoinDate() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedJoinDate = searchParams.get("min_join_years") || "all";
  function handleJoinDate(e) {
    searchParams.set("min_join_years", e.target.value);
    setSearchParams(searchParams, { replace: true });
  }
  return (
    <div className="py-5">
      <span className="">سنوات الانضمام</span>
      <ul className=" mt-4 space-y-2 px-4">
        <li className="flex items-center gap-4">
          <input
            type="radio"
            className="accent-success-color"
            value={"1"}
            name="min_join_years"
            defaultChecked={selectedJoinDate === "1"}
            onClick={handleJoinDate}
          />
          <label>+1 سنه وأكثر</label>
        </li>
        <li className="flex items-center gap-4">
          <input
            type="radio"
            className="accent-success-color"
            value={"2"}
            name="min_join_years"
            defaultChecked={selectedJoinDate === "2"}
            onClick={handleJoinDate}
          />
          <label>+2 سنوات وأكثر</label>
        </li>
        <li className="flex items-center gap-4">
          <input
            type="radio"
            className="accent-success-color"
            value={"3"}
            name="min_join_years"
            defaultChecked={selectedJoinDate === "3"}
            onClick={handleJoinDate}
          />
          <label>+3 سنوات وأكثر</label>
        </li>
        <li className="flex items-center gap-4">
          <input
            type="radio"
            className="accent-success-color"
            value={"4"}
            name="min_join_years"
            defaultChecked={selectedJoinDate === "4"}
            onClick={handleJoinDate}
          />
          <label>+4 سنوات وأكثر</label>
        </li>
        <li className="flex items-center gap-4">
          <input
            type="radio"
            className="accent-success-color"
            value={"5"}
            name="min_join_years"
            defaultChecked={selectedJoinDate === "5"}
            onClick={handleJoinDate}
          />
          <label>+5 سنوات وأكثر</label>
        </li>
      </ul>
    </div>
  );
}
