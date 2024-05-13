import SelectOption from "../../../../ui/SelectOption";
import { useCallback } from "react";
import { getCities, getGovernorates } from "../../../../util/constatnt";
import ProfilePic from "../../../../ui/ProfilePic";
import PlusIcon from "../../../../icons/PlusIcon";
import { useCompleteProfile } from "./CompleteProfileWizard";
import Input from "../../../../ui/Input";
import TextArea from "../../../../ui/TextArea";

export default function ProfileSetupStep() {
  const {
    setProfilePic,
    profilePicPreview,
    setProfilePicPreview,
    gov,
    setGovernorates,
    city,
    setCity,
    street,
    setStreet,
    bio,
    setBio,
    dispatch,
  } = useCompleteProfile();
  const governorates = useCallback(getGovernorates, []);
  return (
    <div className="mx-auto my-5 grid h-full w-fit grid-cols-1 items-center justify-items-center">
      <div className=" relative h-fit w-fit rounded-full border-2 border-primary-color">
        <ProfilePic
          size="xl"
          src={profilePicPreview ? profilePicPreview : null}
        />
        <div className=" absolute bottom-3 right-3 flex cursor-pointer items-center justify-center rounded-full bg-primary-color">
          <input
            type="file"
            accept="image/png, image/jpeg"
            style={{ opacity: "0" }}
            className=" absolute left-0 top-0 h-full w-full !cursor-pointer overflow-hidden opacity-0"
            title=""
            onChange={(e) => {
              const file = e.target.files[0];
              dispatch(setProfilePic(file));
              dispatch(setProfilePicPreview(URL.createObjectURL(file)));
            }}
          />
          <PlusIcon />
        </div>
      </div>
      <p className=" mt-5 justify-self-start text-medium font-semibold tracking-wider">
        عنوان العمل :
      </p>
      {/* address */}
      <div className="grid grid-cols-2 grid-rows-2 gap-5 sm:grid-cols-3 sm:grid-rows-1">
        <SelectOption
          selectedValue={gov}
          setSelectedValue={(gov) => dispatch(setGovernorates(gov))}
          label={"المحافظة"}
          options={governorates}
        />
        <SelectOption
          selectedValue={city}
          setSelectedValue={(city) => dispatch(setCity(city))}
          label={"المدينة"}
          options={getCities(gov)}
          disable={!gov}
        />
        <div className=" col-start-1 col-end-3 min-w-72 sm:col-start-3 sm:col-end-4">
          <Input
            required={true}
            autoComplete="street-address"
            label="الشارع"
            value={street}
            setValue={(st) => dispatch(setStreet(st))}
            disabled={!gov || !city}
          />
        </div>
      </div>
      <p className="mt-5 justify-self-start text-medium font-semibold tracking-wider">
        اكتب نبذة عنك :
      </p>
      <TextArea
        value={bio}
        setValue={(e) => dispatch(setBio(e.target.value))}
        placeholder="اكتب نبذة عنك..."
      />
    </div>
  );
}
