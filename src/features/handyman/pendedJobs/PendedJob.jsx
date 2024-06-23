import MapPinIcon from "../../../icons/MapPinIcon";
import UserClockIcon from "../../../icons/UserClockIcon";
import StarIcon from "../../../icons/StarIcon";
import CheckCircle from "../../../icons/CheckCircle";
import OutlineClockIcon from "../../../icons/OutlineClockIcon";
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  formatISO,
} from "date-fns";
import useGetPendedJob from "./usePendedJob";
import FullPageLoading from "../../../ui/FullPageLoading";
import NotFound from "../../../ui/NotFound";
import { imgBaseURL } from "../../../util/constatnt";
import Button from "../../../ui/Button";
import { Link } from "react-router-dom";
import useCancelPendedJob from "./useCancelPendedJob";
import SmallSpinner from "../../../ui/SmallSpinner";

export default function PendedJob() {
  const { data, isLoading, isFetched } = useGetPendedJob();
  const { isLoading: isCanceling, cancelPendedJob } = useCancelPendedJob();
  if (isLoading) return <FullPageLoading />;
  if (isLoading && isFetched && !data[0]?.id)
    return <NotFound message={"هذه المهمه ليست موجوده."} />;
  return (
    <div className="container mt-10 grid h-full items-start space-y-10 divide-text-color/20 md:mt-0 md:grid-cols-[1fr,300px] md:space-y-0 md:divide-x">
      <AboutClient client={data?.[0]?.client_data?.[0]} />
      <div className="relative grid h-full content-baseline rounded-lg border-2 border-text-color/20 px-6 pt-8 md:col-start-1 md:row-start-1 md:border-0 md:px-0 md:pb-0 md:pl-6 md:pt-10">
        <p className="mb-5 bg-primary-background px-2 text-medium md:hidden md:text-h3 mb:absolute mb:right-6 mb:top-0 mb:translate-y-[-50%]">
          تفاصيل المهمه
        </p>
        <div className="flex items-center justify-between">
          <p className=" text-h2 ">{data[0]?.title}</p>
          <Button
            onClick={() => cancelPendedJob()}
            disabled={isCanceling}
            additionalStyle={` text-nowrap py-2`}
          >
            {isCanceling ? <SmallSpinner /> : "إلغاء"}
          </Button>
        </div>
        <div className=" mt-5 flex items-center gap-10 text-gray">
          <span className="flex items-center gap-2">
            <MapPinIcon size={15} />
            <span className=" text-small">{data[0]?.city}</span>
          </span>
          <span className="flex items-center gap-2">
            <OutlineClockIcon size={15} />
            <span className=" text-small">
              تم النشر{" "}
              {data[0]?.created_at &&
                formatISO(data[0]?.created_at, {
                  representation: "date",
                })}
            </span>
          </span>
        </div>
        <div className="mt-10">
          <span className="inline-block text-gray">السعر:</span>
          <span className=" inline-block pr-3 text-primary-color">
            {data?.price}
            <span className=" text-gray"> لكل {data?.type_of_pricing}</span>
          </span>
        </div>
        <div className="my-10 grid w-fit grid-cols-[auto,auto] items-center gap-5">
          <span className="text-gray">تاريخ البدأ</span>
          <input
            type="date"
            disabled
            value={
              data[0]?.created_at &&
              formatISO(data[0]?.created_at, {
                representation: "date",
              })
            }
            className="!cursor-default appearance-none rounded-lg bg-secondary-background px-4 py-2 text-medium text-opacity-100 !opacity-100"
          />
          {data[0]?.end_date && (
            <>
              <span className="text-gray">تاريخ الانتهاء</span>
              <input
                type="date"
                placeholder="dd-mm-yyyy"
                disabled
                value={formatISO(data[0]?.end_date, {
                  representation: "date",
                })}
                className="!cursor-default appearance-none rounded-lg bg-secondary-background px-4 py-2 text-medium text-opacity-100  !opacity-100 "
              />
            </>
          )}
        </div>
        <div className="mb-5">
          <span className="text-gray">الوصف:</span>
          <p className="mt-5">{data[0]?.description}</p>
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
            {/* 3.5 (4) */}
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
            {client?.doneJobs_num}
          </span>
        </div>
      </div>
    </div>
  );
}
