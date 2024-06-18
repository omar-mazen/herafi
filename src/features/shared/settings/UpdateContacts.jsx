import { useEffect, useState } from "react";
import PlusIcon from "../../../icons/PlusIcon";
import Button from "../../../ui/Button";
import SelectOption from "../../../ui/SelectOption";
import Input from "../../../ui/Input";
import PhoneIcon from "../../../icons/PhoneIcon";
import WhatsappIcon from "../../../icons/WhatsappIcon";
import XIcon from "../../../icons/XIcon";
import { useAuth } from "../../../context/Auth";
import WarningIcon from "../../../icons/WarningIcon";
import SmallSpinner from "../../../ui/SmallSpinner";
import { phoneRegex } from "../../../util/constatnt";
import { addPhones, updatePhones } from "../../../services/handyman/phones";
import useUpdateContacts from "./useUpdateContacts";
import FullPageLoading from "../../../ui/FullPageLoading";
const checkDuplicates = (contacts, key, value) => {
  return contacts.filter((contact) => contact[key] === value).length > 0;
};
export default function UpdateContacts() {
  const { user, id } = useAuth();
  const [phones, setPhones] = useState([]);
  const [whatsapp, setWhatsapp] = useState([]);
  const { updateContacts, isLoading } = useUpdateContacts();
  useEffect(
    function () {
      if (user?.phones && user?.whatsapp) {
        setPhones(user.phones);
        setWhatsapp(user.whatsapp);
      }
    },
    [user],
  );
  function addPhone() {
    setPhones((phones) => {
      return [...phones, { phone: "" }];
    });
  }
  function deletePhones(index) {
    setPhones((phones) => [...phones.filter((_, i) => i != index)]);
  }
  function editPhones(index, value) {
    const duplicates =
      phones.length > 1 ? checkDuplicates(phones, "phone", value) : false;
    const phoneMatch = phoneRegex.test(value);
    setPhones(
      phones.map((phone, i) => {
        if (i == index) {
          if (duplicates)
            return { phone: value, error: "رقم الهاتف موجود بالفعل." };
          if (!phoneMatch)
            return { phone: value, error: "رقم الهاتف غير صحيح." };
          if (!duplicates && phoneMatch) return { phone: value };
        } else return phone;
      }),
    );
  }
  function addWhatsapp() {
    setWhatsapp((whatsapp) => {
      return [...whatsapp, { whatsapp: "" }];
    });
  }
  function deleteWhatsapp(index) {
    setWhatsapp((whatsapp) => [...whatsapp.filter((_, i) => i != index)]);
  }
  function editWhatsapp(index, value) {
    const duplicates =
      whatsapp.length > 1
        ? checkDuplicates(whatsapp, "whatsapp", value)
        : false;
    const phoneMatch = phoneRegex.test(value);
    setWhatsapp(
      whatsapp?.map((whatsapp, i) => {
        if (i == index) {
          if (duplicates)
            return { whatsapp: value, error: "رقم الهاتف موجود بالفعل." };
          if (!phoneMatch)
            return { whatsapp: value, error: "رقم الهاتف غير صحيح." };
          if (!duplicates && phoneMatch) return { whatsapp: value };
        } else return whatsapp;
      }),
    );
  }
  // const phones = (user.phones.map((phone) => phone.phone));
  // const whatsapp= (user.whatsapp.map((whatsapp) => whatsapp.whatsapp));
  if (!user?.name) return <FullPageLoading />;

  console.log(phones, whatsapp);
  return (
    <>
      <section>
        <p className="text-h2">ارقام الهاتف</p>
        {phones.length > 0 ? (
          <ContactList
            contacts={phones}
            deleteContact={deletePhones}
            editContact={editPhones}
          />
        ) : (
          <div className="my-10 flex items-center gap-5 text-medium">
            <span className="text-yellow-500">
              <WarningIcon size={30} />
            </span>
            <p className=" text-warning-color">
              يجب ان يكون هناك رقم هاتف واحد علي الأقل.
            </p>
          </div>
        )}
        <div className="flex gap-5">
          <Button
            onClick={addPhone}
            additionalStyle={" text-nowrap w-fit py-2 !px-6"}
          >
            <PlusIcon />
            أضف رقم هاتف
          </Button>
          <Button
            onClick={() => {
              const ph = phones.map((phone) => phone.phone);
              const wh = whatsapp.map((whatsapp) => whatsapp.whatsapp);
              updateContacts({ id, phones: ph, whatsapp: wh });
            }}
            disabled={
              isLoading ||
              phones.length < 1 ||
              phones.reduce(
                (prev, curr) => prev || curr?.error || !curr.phone,
                false,
              )
            }
            size="large"
            additionalStyle={" text-nowrap py-2 !px-6"}
          >
            تحديث
          </Button>
        </div>
      </section>
      <section className=" mt-20">
        <p className="text-h2">ارقام الواتساب</p>
        {whatsapp.length == 0 ? (
          <p className=" my-10">
            يبدو أنك لم تقم بإضافة رقم هاتفك المرتبط بتطبيق واتساب من قبل.
          </p>
        ) : (
          <ContactList
            contacts={whatsapp}
            deleteContact={deleteWhatsapp}
            editContact={editWhatsapp}
          />
        )}
        <div className="flex gap-5">
          <Button
            onClick={addWhatsapp}
            additionalStyle={" text-nowrap w-fit py-2 !px-6"}
          >
            <PlusIcon />
            أضف رقم واتساب
          </Button>
          <Button
            onClick={() => {
              const ph = phones.map((phone) => phone.phone);
              const wh = whatsapp.map((whatsapp) => whatsapp.whatsapp);
              updateContacts({ id, phones: ph, whatsapp: wh });
            }}
            disabled={
              isLoading ||
              phones.length < 1 ||
              whatsapp.reduce(
                (prev, curr) => prev || curr?.error || !curr.whatsapp,
                false,
              )
            }
            size="large"
            additionalStyle={" text-nowrap py-2 !px-6"}
          >
            تحديث
          </Button>
        </div>
      </section>
    </>
  );
}
function ContactList({ contacts, editContact, deleteContact }) {
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
            editContact={editContact}
            deleteContact={deleteContact}
          />
        ) : (
          <Contact
            key={i}
            index={i}
            contactType={"whatsapp"}
            contact={Object.values(contact)[0]}
            error={contact?.error}
            editContact={editContact}
            deleteContact={deleteContact}
          />
        ),
      )}
    </div>
  );
}
function Contact({
  index,
  contactType,
  contact,
  error,
  editContact,
  deleteContact,
}) {
  // console.log(contact);
  return (
    <>
      <div className="grid w-fit grid-cols-[minmax(100px,250px),auto] items-center gap-5">
        <div className="relative w-full">
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
              // console.log(val);
              editContact(index, val);
            }}
          />
          {error && <p className=" absolute text-warning-color">{error}</p>}
        </div>
        <span
          onClick={() => deleteContact(index)}
          className=" cursor-pointer transition-all duration-100 ease-in-out hover:text-warning-color"
        >
          <XIcon />
        </span>
      </div>
    </>
  );
}
