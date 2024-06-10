import MapPinIcon from "../../../icons/MapPinIcon";
import OutlineClockIcon from "../../../icons/OutlineClockIcon";
import { DayPicker } from "react-day-picker";
import { ar } from "date-fns/locale";
import { addDays, format } from "date-fns";
import PhoneIcon from "../../../icons/PhoneIcon";
import UserIcon from "../../../icons/UserIcon";
import StaticRatingStars from "../../../ui/StaticRatingStars";
import FullPageLoading from "../../../ui/FullPageLoading";
import useGetDoneJob from "./useGetDoneJob";

export default function DoneJob() {
  const { isLoading, data } = useGetDoneJob();
  if (isLoading) return <FullPageLoading />;
  console.log(data);
  return (
    <div className="container mt-10 grid h-full items-start space-y-10 divide-text-color/20 md:mt-0 md:grid-cols-[1fr,300px] md:space-y-0 md:divide-x">
      <AboutClient client={data?.client_data[0]} />
      <div className="relative grid h-full content-baseline border-2 border-text-color/20 px-6 pt-8 md:col-start-1 md:row-start-1 md:border-0 md:px-0 md:pb-0 md:pl-6 md:pt-10">
        <p className="mb-5 bg-primary-background px-2 text-medium md:hidden md:text-h3 mb:absolute mb:right-6 mb:top-0 mb:translate-y-[-50%]">
          تفاصيل المهمه
        </p>
        <p className=" text-h2 ">{data?.title}</p>
        <div className=" mt-2 flex items-center gap-10 text-gray">
          <span className="flex items-center gap-2">
            <OutlineClockIcon size={15} />
            <span className=" text-small">
              تم الانهاء يوم {`${format(data?.created_at, "dd/MM/yyyy")}`}
            </span>
          </span>
        </div>
        <div className="my-5">
          <span className="text-gray">الوصف:</span>
          <p className="mt-5">{data?.description}</p>
        </div>
        <div className="flex gap-5 overflow-scroll pb-5 pt-2">
          <div className="w-32 min-w-32">
            <figure className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-primary-background bg-[url('/defaultImg.png')] bg-center bg-no-repeat text-text-color">
              <img
                src="/public/work1.jpeg"
                alt=""
                className=" h-full w-full object-cover object-center"
              />
            </figure>
          </div>
          <div className="w-32 min-w-32">
            <figure className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-primary-background bg-[url('/defaultImg.png')] bg-center bg-no-repeat text-text-color">
              <img
                src="/public/work2.webp"
                alt=""
                className=" h-full w-full object-cover object-center"
              />
            </figure>
          </div>
          <div className="w-32 min-w-32">
            <figure className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-primary-background bg-[url('/defaultImg.png')] bg-center bg-no-repeat text-text-color">
              <img
                src="/public/work3.jpeg"
                alt=""
                className=" h-full w-full object-cover object-center"
              />
            </figure>
          </div>
          <div className="w-32 min-w-32">
            <figure className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-primary-background bg-[url('/defaultImg.png')] bg-center bg-no-repeat text-text-color">
              <img
                src="/public/work4.jpg"
                alt=""
                className=" h-full w-full object-cover object-center"
              />
            </figure>
          </div>
        </div>
        <div className=" border-b border-t border-text-color/20 py-5">
          <p className="mb-5 text-h3">تقييم العميل لك</p>
          <div className="flex max-w-[600px] flex-col items-center rounded-lg bg-secondary-background px-6 py-4">
            <StaticRatingStars
              ratingPercentage={data?.craftsman_rating[0]?.rating / 5}
              size={20}
            />
            <p className=" mt-5">{data?.craftsman_rating[0]?.comment}</p>
          </div>
        </div>
        <div className="pb-5">
          <p className="my-5 text-h3">تقييمك للعميل</p>
          <div className="flex max-w-[600px] flex-col items-center rounded-lg bg-secondary-background px-6 py-4">
            <StaticRatingStars
              ratingPercentage={data?.clint_rating[0]?.rating / 5}
              size={20}
            />
            <p className=" mt-5">{data?.clint_rating[0]?.comment}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
function AboutClient({ client }) {
  return (
    <div className="relative h-full rounded-lg border-2 border-text-color/20 px-6 pb-4 pt-8 md:col-start-2 md:row-start-1 md:border-0 md:px-8 md:pb-0 md:pt-10">
      <p className="absolute right-6 top-0 mb-5 translate-y-[-50%] bg-primary-background px-2 text-medium md:relative md:right-0 md:translate-y-0 md:pl-0 md:text-h3">
        معلومات عن العميل
      </p>
      <div className=" space-y-3">
        <div className=" flex  items-center gap-3 text-gray">
          <span className=" flex items-center gap-3">
            <UserIcon />
            <span>الاسم :</span>
          </span>
          <span className=" text-small text-text-color">{client.name}</span>
        </div>
        <div className=" flex  items-center gap-3 text-gray">
          <span className=" flex items-center gap-3">
            <MapPinIcon />
            <span className=" text-nowrap">العنوان :</span>
          </span>
          <span className=" text-small text-text-color">
            الدقهليه ,المنصورة ,احمد ماهر
          </span>
        </div>
        <div className=" flex  items-center gap-3 text-gray">
          <span
            style={{ scale: "-1", rotate: "90deg" }}
            className=" flex items-center gap-3"
          >
            <PhoneIcon />
          </span>
          <span>رقم الهاتف :</span>

          <a href="tel:+201095424911" className=" text-small text-text-color">
            01095424911
          </a>
        </div>
      </div>
    </div>
  );
}
