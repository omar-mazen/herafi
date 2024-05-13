import Button from "../../../../ui/Button";
import PlusIcon from "../../../../icons/PlusIcon";
import SelectOption from "../../../../ui/SelectOption";
import Input from "../../../../ui/Input";
import PhoneIcon from "../../../../icons/PhoneIcon";
import WhatsappIcon from "../../../../icons/WhatsappIcon";
import XIcon from "../../../../icons/XIcon";
import { useCompleteProfile } from "./CompleteProfileWizard";
import { useForm } from "react-hook-form";

export default function ContactSelectionStep() {
  const { addContact, dispatch } = useCompleteProfile();
  return (
    <>
      <div className="">
        <h1 className=" mt-5 text-h2">
          قم بإضافة طرق الاتصال ليتواصل معك العملاء المحتملين بسهوله.
        </h1>
        <p className=" mt-5 text-small sm:mt-10">
          معلومات الاتصال الخاصة بك تمثل فرصة لتوسيع دائرة عملك وتحقيق المزيد من
          الفرص المهنية. دعنا نبني معًا مستقبلًا مشرقًا لعملك !
        </p>
      </div>
      <ContactList />
      <Button
        onClick={() => dispatch(addContact())}
        additionalStyle={" text-nowrap w-fit py-2 !px-6"}
      >
        <PlusIcon />
        أضف جهة اتصال
      </Button>
    </>
  );
}
function ContactList() {
  const { contacts } = useCompleteProfile();
  console.log(contacts);
  return (
    <div className="my-10 grid gap-5 lg:grid-cols-2">
      {contacts?.map((contact, i) =>
        Object.keys(contact)[0] == "phone" ? (
          <Contact
            key={i}
            index={i}
            contactType={"phone"}
            contact={Object.values(contact)[0]}
            error={contact?.error}
          />
        ) : (
          <Contact
            key={i}
            index={i}
            contactType={"whatsapp"}
            contact={Object.values(contact)[0]}
            error={contact?.error}
          />
        ),
      )}
    </div>
  );
}
function Contact({ index, contactType, contact, error }) {
  const { editContact, deleteContact, dispatch } = useCompleteProfile();
  return (
    <>
      <div className="grid w-fit grid-cols-[minmax(50px,150px),minmax(100px,250px),auto] items-center gap-5">
        <SelectOption
          search={false}
          selectedValue={contactType}
          setSelectedValue={(option) => {
            dispatch(editContact(index, option, contact));
          }}
          options={["phone", "whatsapp"]}
          full={true}
        />
        <div className=" relative">
          <Input
            direction="ltr"
            type="number"
            icon={
              <>
                {contactType == "phone" ? (
                  <PhoneIcon />
                ) : contactType == "whatsapp" ? (
                  <WhatsappIcon />
                ) : (
                  ""
                )}
              </>
            }
            required
            value={contact}
            setValue={(val) => {
              dispatch(editContact(index, contactType, val));
            }}
          />
          {error && <p className=" absolute text-warning-color">{error}</p>}
        </div>
        <span
          onClick={() => dispatch(deleteContact(index))}
          className=" cursor-pointer transition-all duration-100 ease-in-out hover:text-warning-color"
        >
          <XIcon />
        </span>
      </div>
    </>
  );
}
