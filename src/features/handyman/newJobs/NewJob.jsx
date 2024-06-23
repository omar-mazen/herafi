import MapPinIcon from "../../../icons/MapPinIcon";
import UserClockIcon from "../../../icons/UserClockIcon";
import StarIcon from "../../../icons/StarIcon";
import CheckCircle from "../../../icons/CheckCircle";
import OutlineClockIcon from "../../../icons/OutlineClockIcon";
import ProfilePic from "../../../ui/ProfilePic";
import Button from "../../../ui/Button";
import { DayPicker } from "react-day-picker";
import { ar } from "date-fns/locale";
import {
  addDays,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  formatISO,
  min,
} from "date-fns";
import Modal from "../../../ui/Modal";
import FormInput from "../../../ui/FormInput";
import FormTextArea from "../../../ui/FormTextArea";
import SelectOption from "../../../ui/SelectOption";
import useAddJobOffer from "./useAddJobOffer";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useGetNewJob from "./useGetNewJob";
import FullPageLoading from "../../../ui/FullPageLoading";
import { imgBaseURL } from "../../../util/constatnt";
import { Link } from "react-router-dom";

const options = ["متر طولي", "متر مربع", "نقطة", "المشروع"];
export default function NewJob() {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const { isLoading: isJobOfferLoading, giveOffer } = useAddJobOffer();
  const { isLoading, data, isFetched } = useGetNewJob();
  const {
    formState: { errors },
    getValues,
    watch,
    register,
  } = useForm({ mode: "onChange" });
  if (isLoading) return <FullPageLoading />;
  console.log(data);
  return (
    <Modal>
      <div className="container mt-10 grid h-full items-start space-y-10 divide-text-color/20 md:mt-0 md:grid-cols-[1fr,300px] md:space-y-0 md:divide-x">
        <AboutClient client={data?.client_data?.[0]} />
        <div className="relative grid h-full content-baseline justify-start rounded-lg border-2 border-text-color/20 px-6 pt-8 md:col-start-1 md:row-start-1 md:border-0 md:px-0 md:pb-0 md:pl-6 md:pt-10">
          <p className="mb-5 bg-primary-background px-2 text-medium md:hidden md:text-h3 mb:absolute mb:right-6 mb:top-0 mb:translate-y-[-50%]">
            تفاصيل المهمه
          </p>
          <div className="flex items-center justify-between">
            <p className=" text-h2 ">{data?.title}</p>
            <Modal.Open opens={"makeOffer"}>
              <Button additionalStyle={` text-nowrap py-2`}>تقديم عرض</Button>
            </Modal.Open>
          </div>
          <div className=" mt-5 flex items-center gap-10 text-gray">
            <span className="flex items-center gap-2">
              <MapPinIcon size={15} />
              <span className=" text-small">{data?.city}</span>
            </span>
            <span className="flex items-center gap-2">
              <OutlineClockIcon size={15} />
              <span className=" text-small">
                تم النشر{" "}
                {data?.created_at &&
                  formatISO(data?.created_at, {
                    representation: "date",
                  })}
              </span>
            </span>
          </div>
          <div className="my-10 grid w-fit grid-cols-[auto,auto] items-center gap-5">
            <span className="text-gray">تاريخ البدأ</span>
            <input
              type="date"
              disabled
              value={
                data?.created_at &&
                formatISO(data?.created_at, {
                  representation: "date",
                })
              }
              className="!cursor-default appearance-none rounded-lg bg-secondary-background px-4 py-2 text-medium text-opacity-100 !opacity-100"
            />
            {data?.end_date && (
              <>
                <span className="text-gray">تاريخ الانتهاء</span>
                <input
                  type="date"
                  placeholder="dd-mm-yyyy"
                  disabled
                  value={formatISO(data?.end_date, {
                    representation: "date",
                  })}
                  className="!cursor-default appearance-none rounded-lg bg-secondary-background px-4 py-2 text-medium text-opacity-100  !opacity-100 "
                />
              </>
            )}
          </div>
          <div className="mb-5">
            <span className="text-gray">الوصف:</span>
            <p className="mt-5">{data?.description}</p>
          </div>
          <div className="flex gap-5 overflow-scroll py-2">
            {data?.images?.map((img, i) => {
              const imageUrl = `${imgBaseURL}${img.image}`;

              return (
                <div key={i} className="w-32 min-w-32">
                  <figure className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-primary-background bg-[url('/defaultImg.png')] bg-center bg-no-repeat text-text-color">
                    <img
                      src={imageUrl}
                      alt=""
                      className=" h-full w-full object-cover object-center"
                    />
                  </figure>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Modal.Window name={"makeOffer"}>
        <div className="">
          <p className=" mb-10 text-center text-h2">تقديم عرض</p>
          <div className=" space-y-5">
            <FormInput
              label="عنوان"
              register={{
                ...register("title", {
                  required: { value: true, message: "العنوان مطلوب ." },
                  minLength: 20 || "يجب الا يقل العنوان عن 20 حرف",
                  maxLength: 100 || "يجب الا يزيد العنوان عن 100 حرف",
                }),
              }}
              error={errors?.title}
              value={watch("title")}
              required
            />
            <FormTextArea
              label="الوصف"
              register={{
                ...register("desc", {
                  required: { value: true, message: "الوصف مطلوب ." },
                  minLength: 100 || "يجب الا يقل الوصف عن 100 حرف",
                  maxLength: 500 || "يجب الا يزيد الوصف عن 500 حرف",
                }),
              }}
              error={errors?.desc}
              value={watch("desc")}
              required
            />
            <div className=" flex items-center justify-between gap-5">
              <div className=" flex-1">
                <FormInput
                  label="السعر"
                  register={{
                    ...register("price", {
                      required: { value: true, message: "السعر مطلوب ." },
                    }),
                  }}
                  error={errors?.price}
                  value={watch("price")}
                  type="number"
                  required
                />
              </div>
              <SelectOption
                search={false}
                selectedValue={selectedOption}
                setSelectedValue={setSelectedOption}
                options={options}
              />
            </div>
          </div>
          <Button
            onClick={() =>
              giveOffer({
                description: getValues("desc"),
                type_of_pricing: selectedOption,
                offered_price: getValues("price"),
              })
            }
            size="block"
            additionalStyle={`mt-10 mx-auto`}
          >
            ارسال
          </Button>
        </div>
      </Modal.Window>
    </Modal>
  );
}
function AboutClient({ client }) {
  const joinDate = {
    inYear: differenceInYears(Date.now(), client?.created_at),
    inMonth: differenceInMonths(Date.now(), client?.created_at),
    inDay: differenceInDays(Date.now(), client?.created_at),
  };
  return (
    <div className="relative h-full rounded-lg border-2 border-text-color/20 px-6 pb-4 pt-8 md:col-start-2 md:row-start-1 md:border-0 md:px-8 md:pb-0 md:pt-10">
      <p className="absolute right-6 top-0 mb-5 translate-y-[-50%] bg-primary-background px-2 text-medium md:relative md:right-0 md:translate-y-0 md:pl-0 md:text-h3">
        معلومات عن العميل
      </p>
      <div className="space-y-3">
        <div className=" flex  items-center gap-3 text-gray">
          <span className=" flex items-center gap-3">
            <UserClockIcon />
            <span> منضم منذ :</span>
          </span>
          <span className=" text-small text-text-color">
            {joinDate?.inYear
              ? `${joinDate?.inYear} سنه`
              : joinDate?.inMonth
                ? `${joinDate?.inMonth} شهر`
                : `${joinDate?.inDay} يوم`}
          </span>
        </div>
        <Link
          to={`/client/rating/${client?.id}`}
          className=" flex  items-center gap-3 text-gray"
        >
          <span className=" flex items-center gap-3">
            <StarIcon />
            <span>التقييم :</span>
          </span>
          <span className=" text-small text-text-color">
            {client?.average_rating
              ? `${client?.average_rating.toFixed(1)} (${client?.ratings_num})`
              : "لا يوجد"}
          </span>
        </Link>
        <div className=" flex  items-center gap-3 text-gray">
          <span className=" flex items-center gap-3">
            <CheckCircle />
            <span>المهام المتكلة :</span>
          </span>
          <span className=" text-small text-text-color">
            {client?.doneJobs_num || 0}
          </span>
        </div>
      </div>
    </div>
  );
}
