import { useEffect, useState } from "react";
import ArrowDownIcon from "../../../icons/ArrowDownIcon";
import { getCities, getGovernorates } from "../../../util/constatnt";
import { useAuth } from "../../../context/Auth";
import useUpdateWorkLocations from "./useUpdateWorkLocations";
import Button from "../../../ui/Button";

export default function UpdateWorkLocations() {
  const { user, id } = useAuth();
  const [expandedGov, setExpandedGov] = useState();
  // const [selectAll, setSelectAll] = useState([]);
  const [cities, setCities] = useState([]);
  useEffect(
    () =>
      setCities(user?.cities?.reduce((prev, curr) => [...prev, curr.city], [])),
    [user],
  );
  const { updateCities, isLoading } = useUpdateWorkLocations();
  function addCity(city) {
    setCities((cities) => [...cities, city]);
  }
  function addCities(cities) {
    setCities((oldCities) => [
      ...oldCities,
      ...cities.reduce(
        (prev, curr) =>
          oldCities.includes(curr) ? [...prev] : [...prev, curr],
        [],
      ),
    ]);
  }
  function deleteCities(cities) {
    setCities((oldCities) =>
      oldCities.filter((oldCity) => !cities?.includes(oldCity)),
    );
  }
  return (
    <div className="mx-5">
      <h1 className=" mt-5 text-h2">
        إختار المدن التي تناسبك وتكون متاح للعمل فيها.
      </h1>
      <p className="mt-10 text-small">
        يرجى اختيار المدن التي يمكنك العمل فيها من القائمة أدناه. هذا سيساعدنا
        في تحديد العملاء الذين يحتاجون إلى الخدمات في هذه المدن بشكل أفضل، مما
        يمكنك من تقديم خدماتك بكفاءة أكبر والوصول إلى فرص عمل متنوعة في مدن
        .متعددة
      </p>
      <div className="mt-5">
        {getGovernorates.map((gov, i) => (
          <div
            key={i}
            className="border-t border-text-color/20 first:border-t-0"
          >
            <div
              className="flex cursor-pointer items-center justify-between  py-3 text-h3"
              onClick={() =>
                setExpandedGov((oldGov) => (oldGov == gov ? "" : gov))
              }
            >
              <span>{gov}</span>
              <span>
                <ArrowDownIcon />
              </span>
            </div>
            {expandedGov == gov && (
              <ul className=" space-y-3 border-t border-text-color/20 py-5 text-medium ">
                {/* <li className="flex items-center gap-3 font-semibold text-primary-color">
                  <input
                    type="checkbox"
                    checked={selectAll?.includes[gov]}
                    value={selectAll?.includes[gov]}
                    onChange={() => {
                      const allCities = getCities(gov);
                      if (selectAll?.includes(gov)) deleteCities(allCities);
                      else addCities(allCities);
                      setSelectAll((selectedGov) =>
                        selectedGov?.includes(gov)
                          ? selectedGov?.filter(
                              (selectedGov) => selectedGov != gov,
                            )
                          : [...selectedGov, gov],
                      );
                    }}
                    className="accent-success-color"
                  />
                  <label>كل الأحياء</label>
                </li> */}
                {/* list of cities for current gov */}
                {getCities(gov).map((city, i) => (
                  <li key={i} className="flex gap-3">
                    <input
                      type="checkbox"
                      name="city"
                      defaultChecked={cities?.includes(city)}
                      checked={cities?.includes(city)}
                      value={city}
                      onChange={() => addCity(city)}
                      className="accent-success-color"
                    />
                    <label>{city}</label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <Button
        disabled={isLoading}
        additionalStyle={` float-left mt-10`}
        onClick={() => updateCities({ id, cities })}
      >
        تحديث
      </Button>
    </div>
  );
}
