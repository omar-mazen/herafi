import { useState } from "react";
import ArrowDownIcon from "../../../../icons/ArrowDownIcon";
import { getCities, getGovernorates } from "../../../../util/constatnt";
import { useCompleteProfile } from "./CompleteProfileWizard";

export default function WorkLocationsSelectionStep() {
  const [expandedGov, setExpandedGov] = useState();
  const [selectAll, setSelectAll] = useState();
  const {
    workLocations,
    setWorkLocation,
    dispatch,
    deleteAllCitiesInGovernorate,
  } = useCompleteProfile();
  console.log(workLocations);
  return (
    <div className="">
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
                <li className="flex items-center gap-3 font-semibold text-primary-color">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    value={selectAll}
                    onChange={() => {
                      const allCities = getCities(gov);
                      if (!selectAll) dispatch(setWorkLocation(allCities));
                      else dispatch(deleteAllCitiesInGovernorate(allCities));
                      setSelectAll((status) => !status);
                    }}
                    className="accent-success-color"
                  />
                  <label>كل الأحياء</label>
                </li>
                {/* list of cities for current gov */}
                {getCities(gov).map((city, i) => (
                  <li key={i} className="flex gap-3">
                    <input
                      type="checkbox"
                      name="city"
                      defaultChecked={workLocations?.includes(city)}
                      checked={workLocations?.includes(city)}
                      value={city}
                      onChange={() => dispatch(setWorkLocation([city]))}
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
    </div>
  );
}
