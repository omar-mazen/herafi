import { useCompleteProfile } from "./CompleteProfileWizard";
import SelectOption from "../../../../ui/SelectOption";
import useGetAllCrafts from "../../../shared/crafts/useGetAllCrafts";

export default function CraftSelectionStep() {
  const { dispatch, craft: selectedCraft, setCraft } = useCompleteProfile();
  const { crafts, isLoading } = useGetAllCrafts();
  return (
    <div className="">
      <h1 className=" mt-5 text-h2">إختار حرفتك لتخبر العالم بما تفعله.</h1>
      <p className="mt-10 text-small">
        إنه أول شيء يراه العملاء. لذا إختر حرفتك بكل دقة ، لتلفت انتباه العملاء
        المحتملين .
      </p>
      <div className=" mt-20 max-w-[700px]">
        <SelectOption
          full={true}
          options={crafts?.map((craft) => craft.name)}
          label={"الحرفة"}
          selectedValue={
            crafts?.filter((craft) => craft?.id == selectedCraft)?.[0]?.name
          }
          setSelectedValue={(option) =>
            dispatch(
              setCraft(crafts.filter((craft) => craft.name == option)[0].id),
            )
          }
        />
      </div>
    </div>
  );
}
