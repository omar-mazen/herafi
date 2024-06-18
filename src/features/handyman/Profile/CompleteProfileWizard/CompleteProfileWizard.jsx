import { createContext, useContext, useReducer } from "react";
import WizardStepper from "../../../../ui/WizardStepper";
import { imgBaseURL } from "../../../../util/constatnt";
import ContactSelectionStep from "./ContactSelectionStep";
import CraftSelectionStep from "./CraftSelectionStep";
import ProfileSetupStep from "./ProfileSetupStep";
import WorkLocationsSelectionStep from "./WorkLocationsSelectionStep";
import { useAuth } from "../../../../context/Auth";
import useAddCities from "../../../shared/Authentication/useAddCities";
import useAddPhones from "../../../shared/Authentication/useAddPhones";
import useCompleteHandymanInfo from "./useCompleteHandymanInfo";

const CompleteProfileContext = createContext();

const initialState = {
  craft: "",
  profilePic: null,
  profilePicPreview: null,
  gov: "",
  city: "",
  street: "",
  bio: "",
  phones: [],
  whatsapp: [],
  workLocations: [],
};

// action creator
const setCraft = (payload) => ({ type: "SET_CRAFT", payload });
const setProfilePic = (payload) => ({ type: "SET_PROFILE_PIC", payload });
const setProfilePicPreview = (payload) => ({
  type: "SET_PROFILE_PIC_PREVIEW",
  payload,
});
const setGovernorates = (payload) => ({
  type: "SET_GOV",
  payload,
});
const setCity = (payload) => ({
  type: "SET_CITY",
  payload,
});
const setStreet = (payload) => ({
  type: "SET_STREET",
  payload,
});
const setBio = (payload) => ({
  type: "SET_BIO",
  payload,
});
const addContact = () => ({ type: "ADD_CONTACTS" });
const editContact = (index, type, value) => ({
  type: "EDIT_CONTACTS",
  payload: { index, type, value },
});
const deleteContact = (index) => ({ type: "DELETE_CONTACTS", payload: index });
const setWorkLocation = (cities) => ({
  type: "SET_WORK_LOCATIONS",
  payload: { cities },
});
const deleteAllCitiesInGovernorate = (payload) => ({
  type: "DELETE_WORK_CITIES",
  payload,
});
const checkDuplicates = (contacts, key, value) => {
  return contacts.filter((contact) => contact[key] === value).length > 1;
};
function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "SET_CRAFT":
      return { ...state, craft: payload };
    case "SET_PROFILE_PIC":
      return { ...state, profilePic: payload };
    case "SET_PROFILE_PIC_PREVIEW":
      return { ...state, profilePicPreview: payload };
    case "SET_GOV":
      return { ...state, gov: payload };
    case "SET_CITY":
      return { ...state, city: payload };
    case "SET_STREET":
      return { ...state, street: payload };
    case "SET_BIO":
      return { ...state, bio: payload };
    case "ADD_CONTACTS":
      return {
        ...state,
        contacts: [...state.contacts, { phone: "" }],
      };
    case "EDIT_CONTACTS": {
      const { type, value, index } = payload;
      const updatedContacts = state.contacts.map((contact, i) => {
        if (i == index) {
          if (checkDuplicates(state.contacts, type, value))
            return {
              [type]: value,
              error: "لقد قمت بإضافة هذا الرقم بالفعل.",
            };
          else return { [type]: value, error: null };
        }
        if (contact[type] === value) {
          return { ...contact, error: "لقد قمت بإضافة هذا الرقم بالفعل." };
        } else {
          return { ...contact, error: null };
        }
      });
      return {
        ...state,
        contacts: updatedContacts,
      };
    }
    case "DELETE_CONTACTS":
      return {
        ...state,
        contacts: [...state.contacts.filter((_, i) => i != payload)],
      };
    case "SET_WORK_LOCATIONS":
      console.log(payload.cities);
      return {
        ...state,
        workLocations: state.workLocations.includes(payload.cities[0])
          ? state.workLocations.filter((city) => city != payload.cities[0])
          : [...state.workLocations, ...payload.cities],
      };
    case "DELETE_WORK_CITIES":
      return {
        ...state,
        workLocations: [
          ...state.workLocations,
          payload?.filter((city) => state.workLocations == city),
        ],
      };
    default:
      throw new Error("Action unkonwn");
  }
}

export default function CompleteProfileWizard({
  craft,
  cities,
  phones,
  information,
}) {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(reducer, {
    craft: user?.craft || null,
    profilePic: null,
    profilePicPreview: user?.image ? imgBaseURL + user?.image : null,
    gov: user?.address?.split(",")[0]?.trim() || "",
    city: user?.address?.split(",")[1]?.trim() || "",
    street: user?.address?.split(",")[2]?.trim() || "",
    bio: user?.description || "",
    contacts: [{ phone: "" }],
    workLocations: [],
    errors: {},
  });
  const { id, role } = useAuth();
  const {
    completeHandymanInfo,
    isLoading: completeHandymanInfoIsLoading,
    isSuccess: completeHandymanInfoIsSuccess,
  } = useCompleteHandymanInfo();
  const {
    addCities,
    isLoading: addCitiesIsLoading,
    isSuccess: addCitiesIsSuccess,
  } = useAddCities();
  const {
    addPhones,
    isLoading: addPhonesIsLoading,
    isSuccess: addPhonesIsSuccess,
  } = useAddPhones();
  console.log(state);
  return (
    <CompleteProfileContext.Provider
      value={{
        craft: state.craft,
        profilePic: state.profilePic,
        profilePicPreview: state.profilePicPreview,
        gov: state.gov,
        city: state.city,
        street: state.street,
        bio: state.bio,
        contacts: state.contacts,
        workLocations: state.workLocations,
        dispatch,
        setCraft,
        setProfilePic,
        setProfilePicPreview,
        setGovernorates,
        setCity,
        setStreet,
        setBio,
        addContact,
        editContact,
        deleteContact,
        setWorkLocation,
        deleteAllCitiesInGovernorate,
      }}
    >
      <WizardStepper
        onSubmit={() => {
          const contacts = state?.contacts?.reduce(
            (prev, curr) => {
              if (curr.phone)
                return { ...prev, phone: [...prev.phone, curr.phone] };
              else if (curr.whatsapp)
                return { ...prev, whatsapp: [...prev.whatsapp, curr.whatsapp] };
            },
            {
              phone: [],
              whatsapp: [],
            },
          );
          const locations = Object.values(state.workLocations)?.reduce(
            (prev, curr) => (Array.isArray(curr) ? [...prev, ...curr] : prev),
            [],
          );
          console.log(contacts);
          if (information)
            completeHandymanInfo({
              id,
              role,
              address: `${state?.gov}${state?.city ? ", " + state?.city : ""}${state?.street ? ", " + state?.street : ""}`,
              description: state.bio,
              image: state.profilePic,
              craftId: state.craft,
            });
          if (phones)
            addPhones({
              id,
              phones: contacts.phone,
              whatsapp: contacts.whatsapp,
            });

          if (cities)
            locations.length > 0
              ? addCities({
                  id,
                  cities,
                })
              : "";
        }}
      >
        <WizardStepper.StepList>
          {craft && (
            <WizardStepper.Step isNextButtonEnabled={state.craft}>
              <CraftSelectionStep />
            </WizardStepper.Step>
          )}
          {information && (
            <WizardStepper.Step
              isNextButtonEnabled={true}
              onClick={() =>
                completeHandymanInfo({
                  id,
                  role,
                  address: state.address,
                  description: state.bio,
                  image: state.profilePic,
                })
              }
            >
              <ProfileSetupStep />
            </WizardStepper.Step>
          )}
          {phones && (
            <WizardStepper.Step
              isNextButtonEnabled={
                !state?.contacts?.reduce(
                  (prev, curr) => prev || Boolean(curr.error),
                  false,
                ) && state?.contacts.length > 0
                  ? Object.values(state?.contacts?.[0])?.[0]
                  : false
              }
            >
              <ContactSelectionStep />
            </WizardStepper.Step>
          )}
          {cities && (
            <WizardStepper.Step>
              <WorkLocationsSelectionStep />
            </WizardStepper.Step>
          )}
        </WizardStepper.StepList>
      </WizardStepper>
    </CompleteProfileContext.Provider>
  );
}
export function useCompleteProfile() {
  const {
    craft,
    profilePic,
    profilePicPreview,
    gov,
    city,
    street,
    bio,
    contacts,
    workLocations,
    dispatch,
    setCraft,
    setProfilePic,
    setProfilePicPreview,
    setGovernorates,
    setCity,
    setStreet,
    setBio,
    addContact,
    editContact,
    deleteContact,
    setWorkLocation,
    deleteAllCitiesInGovernorate,
  } = useContext(CompleteProfileContext);
  return {
    craft,
    profilePic,
    profilePicPreview,
    gov,
    city,
    street,
    bio,
    contacts,
    workLocations,
    dispatch,
    setCraft,
    setProfilePic,
    setProfilePicPreview,
    setGovernorates,
    setCity,
    setStreet,
    setBio,
    addContact,
    editContact,
    deleteContact,
    setWorkLocation,
    deleteAllCitiesInGovernorate,
  };
}
