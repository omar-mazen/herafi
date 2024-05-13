import SelectOption from "../../../ui/SelectOption";
import { useCallback, useEffect, useState } from "react";
import {
  getCities,
  getGovernorates,
  imgBaseURL,
} from "../../../util/constatnt";
import ProfilePic from "../../../ui/ProfilePic";
import Input from "../../../ui/Input";
import TextArea from "../../../ui/TextArea";
import { useAuth } from "../../../context/Auth";
import Button from "../../../ui/Button";
import PenIcon from "../../../icons/PenIcon";
import useUpdateUser from "./useUpdateUser";

export default function AccountSettings() {
  const { user, role, id } = useAuth();
  const [account, setAccount] = useState({});
  useEffect(
    () =>
      setAccount({
        profilePic: null,
        profilePicPreview: user?.image,
        gov: user?.address?.split(",")[0]?.trim() || "",
        city: user?.address?.split(",")[1]?.trim() || "",
        street: user?.address?.split(",")[2]?.trim() || "",
        bio: user?.description || "",
      }),
    [user],
  );
  const { profilePic, profilePicPreview, gov, city, street, bio } = account;
  const { updateInfo, isLoading } = useUpdateUser();
  const governorates = useCallback(getGovernorates, []);
  function setImg(profilePic, profilePicPreview) {
    setAccount((account) => {
      return { ...account, profilePic, profilePicPreview };
    });
  }
  function setGov(gov) {
    setAccount((account) => {
      return { ...account, gov };
    });
  }
  function setCity(city) {
    setAccount((account) => {
      return { ...account, city };
    });
  }
  function setStreet(street) {
    setAccount((account) => {
      return { ...account, street };
    });
  }
  function setBio(bio) {
    setAccount((account) => {
      return { ...account, bio };
    });
  }
  function handleSubmit() {
    updateInfo({
      id,
      role,
      address: `${gov}, ${city}, ${street}`,
      image: profilePic,
      description: bio,
    });
  }
  return (
    <div className="grid w-fit grid-cols-1 justify-items-start gap-5">
      <div className=" relative h-fit w-fit rounded-full border-2 border-primary-color">
        <ProfilePic
          size="xl"
          src={profilePicPreview ? `${imgBaseURL}${profilePicPreview}` : null}
        />
        <div className=" absolute  bottom-3 right-3 flex cursor-pointer items-center justify-center rounded-full bg-primary-color">
          <input
            type="file"
            accept="image/png, image/jpeg"
            style={{ opacity: "0" }}
            className=" absolute left-0 top-0 h-full w-full !cursor-pointer overflow-hidden opacity-0"
            title=""
            onChange={(e) => {
              const file = e.target.files[0];
              setImg(file, URL.createObjectURL(file));
            }}
          />
          <span className="p-2">
            <PenIcon size={15} />
          </span>
        </div>
      </div>
      <p className=" mt-5 justify-self-start text-medium font-semibold tracking-wider">
        عنوان العمل :
      </p>
      {/* address */}
      <div className="grid grid-cols-2 grid-rows-2 gap-5 sm:grid-cols-3 sm:grid-rows-1">
        <SelectOption
          selectedValue={gov}
          setSelectedValue={(gov) => setGov(gov)}
          label={"المحافظة"}
          options={governorates}
        />
        <SelectOption
          selectedValue={city}
          setSelectedValue={(city) => setCity(city)}
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
            setValue={(st) => setStreet(st)}
            disabled={!gov || !city}
          />
        </div>
      </div>
      <p className="mt-5  justify-self-start text-medium font-semibold tracking-wider">
        اكتب نبذة عنك :
      </p>
      <TextArea
        value={bio}
        setValue={(e) => setBio(e.target.value)}
        placeholder="اكتب نبذة عنك..."
      />
      <Button
        disabled={isLoading}
        additionalStyle={`justify-self-end mt-5`}
        onClick={handleSubmit}
      >
        تحديث
      </Button>
    </div>
  );
}
