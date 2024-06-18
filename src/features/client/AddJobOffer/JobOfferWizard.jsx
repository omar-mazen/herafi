import { useForm } from "react-hook-form";
import FormInput from "../../../ui/FormInput";
import WizardStepper from "../../../ui/WizardStepper";
import FormTextArea from "../../../ui/FormTextArea";
import { useCallback, useState } from "react";
import CameraIcon from "../../../icons/CameraIcon";
import XIcon from "../../../icons/XIcon";
import SelectOption from "../../../ui/SelectOption";
import { getCities, getGovernorates } from "../../../util/constatnt";
import Input from "../../../ui/Input";
import { DayPicker } from "react-day-picker";
import { ar } from "date-fns/locale";
import { useQueryClient } from "@tanstack/react-query";
import useAddJobOffer from "./useAddJobOffer";
import { useAuth } from "../../../context/Auth";
import { formatISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import FullPageLoading from "../../../ui/FullPageLoading";

export default function JobOfferWizard() {
  const { id } = useAuth();
  const queryClient = useQueryClient();
  const crafts = queryClient.getQueryData(["crafts"]);
  const {
    register,
    watch,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [images, setImages] = useState([]);
  const [craft, setCraft] = useState();
  const [date, setDate] = useState();
  const [address, setAddress] = useState({ city: "", gov: "", st: "" });
  const governorates = useCallback(getGovernorates, []);
  const { addJobOffer, isLoading } = useAddJobOffer();
  const navigate = useNavigate();
  function handelSubmit() {
    addJobOffer(
      {
        id,
        title: getValues("title"),
        images: images.map((img) => img.img),
        description: getValues("desc"),
        client_price: getValues("price"),
        craft_id: craft?.id,
        start_date: date?.from
          ? formatISO(date.from, { representation: "date" })
          : null,
        end_date: date?.to
          ? formatISO(date.to, { representation: "date" })
          : null,
        city: address?.city,
      },
      { onSuccess: () => navigate("/client/job-offers") },
    );
  }
  if (isLoading) return <FullPageLoading />;
  return (
    <WizardStepper onSubmit={handelSubmit}>
      <WizardStepper.StepList>
        <WizardStepper.Step
          isNextButtonEnabled={
            craft &&
            getValues("title")?.length > 1 &&
            getValues("desc")?.length > 1 &&
            !errors?.title &&
            !errors?.desc
          }
        >
          <div className="mx-auto mt-10 max-w-[600px] space-y-5">
            <form className=" space-y-5 overflow-hidden">
              <FormInput
                label="عنوان المهمه"
                value={watch("title")}
                error={errors?.title}
                register={{
                  ...register("title", {
                    required: true || "عنوان المهمه مطلوب.",
                    minLength: {
                      value: 8,
                      message: "يجب الا يقل العنوان عن 8 حروف.",
                    },
                    maxLength: {
                      value: 50,
                      message: "يجب الا يزيد العنوان عن 50 حرف.",
                    },
                  }),
                }}
              />
              <FormTextArea
                label="الوصف"
                error={errors?.desc}
                register={{
                  ...register("desc", {
                    required: true || "عنوان المهمه مطلوب.",
                    minLength: {
                      value: 100,
                      message: "يجب الا يقل الوصف عن 100 حرف.",
                    },
                    maxLength: {
                      value: 1000,
                      message: "يجب الا يزيد العنوان عن 1000 حرف.",
                    },
                  }),
                }}
              />
            </form>
            <SelectOption
              full={true}
              options={crafts?.map((craft) => craft.name)}
              label={"الحرفة"}
              selectedValue={craft?.name}
              setSelectedValue={(option) =>
                setCraft(crafts.filter((craft) => craft.name == option)[0])
              }
            />
            <div>
              <p className=" mb-5 text-large">أضف صور</p>
              <div
                style={{
                  gridTemplateColumns: `repeat(${images.length + 1},100px)`,
                }}
                className="grid grid-rows-[100px] gap-5 overflow-y-hidden overflow-x-scroll pb-5 "
              >
                <div
                  className=" relative h-full w-full cursor-pointer overflow-hidden rounded-lg bg-secondary-background "
                  disabled={images.length >= 5}
                  style={{ opacity: `${images.length >= 5 ? "50%" : "100%"}` }}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="flex aspect-square h-16 items-center justify-center rounded-full bg-primary-color">
                      <CameraIcon size={15} />
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    style={{ opacity: "0" }}
                    className=" absolute left-0 top-0 h-full w-full cursor-pointer overflow-hidden opacity-0"
                    title=""
                    disabled={images.length >= 5}
                    onChange={(e) => {
                      const files = e.target.files;
                      for (const file of files) {
                        if (images.length >= 5) return;
                        setImages((imgs) => {
                          if (imgs?.length < 5)
                            return [
                              ...imgs,
                              {
                                img: file,
                                imgPreview: URL.createObjectURL(file),
                              },
                            ];
                          else return imgs;
                        });
                      }
                    }}
                  />
                </div>
                {images?.map((img, i) => (
                  <div key={i} className="relative px-1">
                    <img
                      src={img.imgPreview}
                      className=" h-[100px] w-[100px] rounded-xl object-cover"
                    />
                    <span
                      className=" absolute right-1 top-1 cursor-pointer rounded-full bg-[rgb(0,0,0,0.5)] p-1 text-white"
                      onClick={() => {
                        setImages((imgs) =>
                          imgs.filter((x) => x.imgPreview != img.imgPreview),
                        );
                      }}
                    >
                      <XIcon size={15} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </WizardStepper.Step>
        <WizardStepper.Step isNextButtonEnabled={date?.from}>
          <div className="mx-auto my-10 max-w-[600px]">
            <p className=" mb-5 justify-self-start text-large">
              اختر تاريخ المهمه
            </p>
            <p className=" mb-10 justify-self-start text-small text-gray">
              اختر تاريخ البدء والانتهاء للمهمة التي ترغب في تنفيذها. تاريخ
              البدء هو التاريخ الذي ترغب فيه بوصول الحرفي إليك لبدء العمل. بينما
              يُعتبر تاريخ الانتهاء اختياريًا. إذا كانت المهمة تستغرق أكثر من
              يوم واحد، فسيكون هذا هو التاريخ الذي يجب فيه إكمال المهمة.
            </p>
            <DayPicker
              style={{ margin: 0 }}
              showOutsideDays
              locale={ar}
              dir="rtl"
              fromDate={""}
              weekStartsOn={6}
              mode="range"
              onSelect={setDate}
              selected={date}
              disabled={{ before: new Date() }}
            />
          </div>
        </WizardStepper.Step>
        <WizardStepper.Step
          isNextButtonEnabled={
            address.city && address.gov && address.st && getValues("price")
          }
        >
          <div className="mx-auto my-10 grid w-fit max-w-[600px] grid-cols-1 justify-items-start gap-10 ">
            <div>
              <p className=" mb-5 justify-self-start text-large">اضف عنوان</p>
              <p className=" mb-10 justify-self-start text-small text-gray">
                لن يظهر عنوانك الا للحرفي الذي سيقبل لتنفيذ المهمه
              </p>
              <div className="grid grid-cols-2 grid-rows-2 gap-5 sm:grid-cols-3 sm:grid-rows-1">
                <SelectOption
                  selectedValue={address.gov}
                  setSelectedValue={(gov) =>
                    setAddress((state) => {
                      return { ...state, gov };
                    })
                  }
                  label={"المحافظة"}
                  options={governorates}
                />
                <SelectOption
                  selectedValue={address.city}
                  setSelectedValue={(city) =>
                    setAddress((state) => {
                      return { ...state, city };
                    })
                  }
                  label={"المدينة"}
                  options={getCities(address.gov)}
                  disable={!address.gov}
                />
                <div className=" col-start-1 col-end-3 min-w-72 sm:col-start-3 sm:col-end-4">
                  <Input
                    required={true}
                    autoComplete="street-address"
                    label="الشارع"
                    value={address.st}
                    setValue={(st) =>
                      setAddress((state) => {
                        return { ...state, st };
                      })
                    }
                    disabled={!address.gov || !address.city}
                  />
                </div>
              </div>
            </div>
            <div>
              <p className=" mb-5 justify-self-start text-large">اضف سعر</p>
              <p className="mb-10 max-w-[600px] text-gray">
                يرجى ملاحظة أن السعر الذي ستقوم بكتابته لن يظهر لأي حرفي. إنما
                سيتم استخدامه لتصفية العروض إلى جزئين، الجزء الأول يشمل العروض
                التي تكون أقل من أو تساوي السعر الذي حددته، والجزء الآخر يشمل
                العروض التي تكون أعلى من السعر الذي حددته. شكرًا لتفهمك
              </p>
              <FormInput
                label="السعر"
                type="number"
                value={watch("price")}
                register={{
                  ...register("price", {
                    required: { value: true, message: "السعر مطلوب." },
                  }),
                }}
              />
            </div>
          </div>
        </WizardStepper.Step>
        <WizardStepper.Step isNextButtonEnabled={true}>
          <div className=" my-5 space-y-10">
            <h1 className=" text-h1">مراجعة طلبك</h1>
            <div className=" max-w-[800px]">
              <div className="py-4">
                <span className="pl-3 text-medium text-gray">
                  عنوان الطلب :
                </span>
                <span>{getValues("title")}</span>
              </div>
              <div className="py-4">
                <span className=" pl-3 text-medium text-gray">الوصف :</span>
                <p className="max-w-[600px]">{getValues("desc")}</p>
              </div>
              <div className="py-4">
                <span className=" pl-3 text-medium text-gray">الحرفة :</span>
                <span>{craft?.name}</span>
              </div>

              <div className="py-4">
                <span className=" pl-3 text-medium text-gray">العنوان :</span>
                <span>{`${address.gov}, ${address.city}, ${address.st}`}</span>
              </div>
              <div className="py-4">
                <span className=" pl-3 text-medium text-gray">السعر :</span>
                <span>{getValues("price")}</span>
              </div>
              <div className=" flex items-start py-4">
                <span className=" pl-3 text-medium text-gray">الصور :</span>
                <div
                  style={{
                    gridTemplateColumns: `repeat(${images.length},100px)`,
                  }}
                  className="grid grid-rows-[100px] gap-5 overflow-y-hidden overflow-x-scroll pb-5 "
                >
                  {images?.map((img, i) => (
                    <div key={i} className="relative px-1">
                      <img
                        src={img.imgPreview}
                        className=" h-[100px] w-[100px] rounded-xl object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </WizardStepper.Step>
      </WizardStepper.StepList>
    </WizardStepper>
  );
}
