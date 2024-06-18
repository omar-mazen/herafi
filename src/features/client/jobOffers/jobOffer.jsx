import ProfilePic from "../../../ui/ProfilePic";
import StaticRatingStars from "../../../ui/StaticRatingStars";
import Button from "../../../ui/Button";
// import { useSearchParams } from "react-router-dom";
import MapPinIcon from "../../../icons/MapPinIcon";
import OutlineClockIcon from "../../../icons/OutlineClockIcon";
import Pagenation from "../../../ui/Pagenation";
import useGetJobOffer from "./useGetJobOffer";
import FullPageLoading from "../../../ui/FullPageLoading";
import { formatISO } from "date-fns";
import { imgBaseURL, smallPageSize } from "../../../util/constatnt";
import useGetJobOfferReplies from "./useGetJobOfferReplies";
import SmallSpinner from "../../../ui/SmallSpinner";
import NotFound from "../../../ui/NotFound";
import useAcceptJobOffer from "./useAcceptOffer";
import { useParams } from "react-router-dom";

export default function JobOffer() {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const price = searchParams.get("price") || "lte";
  const { id } = useParams();
  const { isLoading: isJobOfferLoading, data: jobOffer } = useGetJobOffer();
  const { isLoading: isJobOfferRepliesLoading, data: jobOfferReplies } =
    useGetJobOfferReplies({ pageSize: smallPageSize });
  if (isJobOfferLoading) return <FullPageLoading />;
  if (!jobOffer?.title && !jobOfferReplies?.data?.description)
    return <NotFound message={"هذا الطلب غير موجود او تم حذفة."} />;
  console.log(jobOfferReplies);
  return (
    <div className=" container my-10 divide-y divide-text-color/20">
      <section className="pb-10">
        <p className="text-h2">{jobOffer?.title}</p>
        <div className=" mt-2 flex items-center gap-10 text-gray">
          <span className="flex items-center gap-2">
            <MapPinIcon size={15} />
            <span className=" text-small">{jobOffer?.city}</span>
          </span>
          <span className="flex items-center gap-2">
            <OutlineClockIcon size={15} />
            <span className=" text-small">
              تم النشر{" "}
              {formatISO(jobOffer?.created_at, { representation: "date" })}
            </span>
          </span>
        </div>
        <div className="my-10 grid w-fit grid-cols-[auto,auto] items-center gap-5">
          {jobOffer?.start_date && (
            <>
              <span className="text-gray">تاريخ البدأ</span>
              <input
                type="date"
                placeholder="dd-mm-yyyy"
                disabled
                value={formatISO(jobOffer.start_date, {
                  representation: "date",
                })}
                className="!cursor-default appearance-none rounded-lg bg-secondary-background px-4 py-2 text-medium text-opacity-100 !opacity-100"
              />
            </>
          )}
          {jobOffer?.end_date && (
            <>
              <span className="text-gray">تاريخ الانتهاء</span>
              <input
                type="date"
                placeholder="dd-mm-yyyy"
                disabled
                value={formatISO(jobOffer.end_date, {
                  representation: "date",
                })}
                className="!cursor-default appearance-none rounded-lg bg-secondary-background px-4 py-2 text-medium text-opacity-100  !opacity-100 "
              />
            </>
          )}
        </div>
        <div className="mb-5">
          <span className="text-gray">الوصف:</span>
          <p className="mt-5 max-w-[600px]">{jobOffer?.description}</p>
        </div>
        {jobOffer?.images?.length > 0 && (
          <div className="flex gap-5 overflow-scroll py-2">
            {jobOffer?.images.map((img, i) => (
              <div key={i} className="w-32 min-w-32">
                <figure className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-primary-background bg-[url('/defaultImg.png')] bg-center bg-no-repeat text-text-color">
                  <img
                    src={`${imgBaseURL}${img?.image}`}
                    alt=""
                    className=" h-full w-full object-cover object-center"
                  />
                </figure>
              </div>
            ))}
          </div>
        )}
      </section>
      <section className="pt-10">
        <h1 className=" mb-10 text-h2">الردود علي طلبك</h1>
        <div className="w-full">
          {/* <ul className="mb-10 flex gap-5">
            <li
              className={` cursor-pointer px-4 pb-2  ${price == "lte" ? "rounded-t-lg border-b-2 text-primary-color" : ""}`}
              onClick={() => {
                searchParams.set("price", "lte");
                setSearchParams(searchParams);
              }}
            >
              اقل من السعر الذي حددته
            </li>
            <li
              className={`cursor-pointer px-4 pb-2  ${price == "gte" ? "rounded-t-lg border-b-2 text-primary-color" : ""}`}
              onClick={() => {
                searchParams.set("price", "gte");
                setSearchParams(searchParams);
              }}
            >
              اكثر من السعر الذي حددته
            </li>
          </ul> */}
          {isJobOfferRepliesLoading ? (
            <SmallSpinner />
          ) : jobOfferReplies?.data?.length > 0 ? (
            <div className="max-w-[600px] space-y-5 md:space-y-10">
              {jobOfferReplies.data.map((reply, i) => (
                // console.log(reply),
                <ReplyCard
                  key={i}
                  handymanName={reply.craftsman_name}
                  handymanImg={reply.image}
                  avgRating={reply.average_rating}
                  numberOfRating={reply.number_of_ratings}
                  description={reply.description}
                  price={reply.offered_price}
                  unit={reply?.type_of_pricing}
                  handymanId={reply.craftsman_id}
                  jobOfferId={id}
                />
              ))}
              <Pagenation total={jobOfferReplies?.latestPage} />
            </div>
          ) : (
            <p className="text-medium text-warning-color">
              لا يوجد ردود علي طلبك حتي الان.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

function ReplyCard({
  description,
  price,
  unit,
  avgRating,
  numberOfRating,
  handymanImg,
  handymanName,
  jobOfferId,
  handymanId,
}) {
  const { isLoading, acceptJobOffer } = useAcceptJobOffer();
  return (
    <div className="rounded-lg bg-secondary-background px-6 py-8">
      <div className="flex items-center gap-5 ">
        <ProfilePic
          size="md"
          src={handymanImg ? `${imgBaseURL}${handymanImg}` : null}
        />
        <div className=" space-y-1">
          <p>{handymanName}</p>
          <span className=" flex items-center gap-3">
            <StaticRatingStars ratingPercentage={avgRating / 5} />
            <span>{numberOfRating ? numberOfRating : "لا يوجد تقييم"}</span>
          </span>
        </div>
      </div>
      <p className="mt-5">{description}</p>
      <div className="mt-5 text-medium">
        <span className=" pl-3 text-gray">السعر :</span>
        <span className=" pl-2 font-bold text-primary-color">{price}</span>
        <span className="pl-2">لكل</span>
        <span>{unit}</span>
      </div>
      <div className="mt-5 flex items-center justify-end gap-5">
        <Button
          onClick={() => acceptJobOffer({ jobOfferId, handymanId })}
          additionalStyle={` !bg-success-color`}
          disabled={isLoading}
        >
          {isLoading ? <SmallSpinner /> : "قبول"}
        </Button>
        {/* <Button additionalStyle={` !bg-warning-color`}>رفض</Button> */}
      </div>
    </div>
  );
}
