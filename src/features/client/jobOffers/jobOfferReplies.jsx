import Modal from "../../../ui/Modal";
import FilterIcon from "../../../icons/FilterIcon";
import SortBy from "../../../ui/SortBy";
import Filter from "../../../ui/Filter";
import useScreenType from "../../../hooks/useScreenType";
import ProfilePic from "../../../ui/ProfilePic";
import StaticRatingStars from "../../../ui/StaticRatingStars";
import Button from "../../../ui/Button";
// import { useSearchParams } from "react-router-dom";
import Pagenation from "../../../ui/Pagenation";
import useGetJobOfferReplies from "./useGetJobOfferReplies";
import { bigPageSize, imgBaseURL } from "../../../util/constatnt";
import FullPageLoading from "../../../ui/FullPageLoading";

export default function JobOfferReplies() {
  const screen = useScreenType();
  // const [searchParams, setSearchParams] = useSearchParams();
  // const price = searchParams.get("price") || "lte";
  const { isLoading, data } = useGetJobOfferReplies({ pageSize: bigPageSize });
  if (isLoading) return <FullPageLoading />;
  return (
    <Modal modalCloseScreenSize={["xl"]}>
      <div className=" container grid gap-x-20 lg:grid-cols-[minmax(auto,250px),1fr] lg:grid-rows-[auto,1fr]">
        <div className=" my-5 flex items-center justify-between sm:my-7 md:my-10 lg:col-start-1 lg:col-end-3 lg:row-start-1">
          <h1 className=" mb-10 text-h2">الردود علي {data?.title} </h1>
          {(screen == "mobile" || screen == "sm" || screen == "md") && (
            <Modal.Open opens={"filter"}>
              <span className=" cursor-pointer rounded-full bg-text-color p-2 text-primary-background">
                <FilterIcon />
              </span>
            </Modal.Open>
          )}
        </div>
        {screen == "lg" || screen == "xl" ? (
          <FilterAndSort />
        ) : (
          <Modal.Window name={"filter"}>
            <FilterAndSort />
          </Modal.Window>
        )}
        <section className="w-full overflow-x-hidden lg:col-start-2 lg:row-start-2">
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
          <div className="space-y-5 md:space-y-10">
            {data?.data?.length > 0 ? (
              <div className="max-w-[600px] space-y-5 md:space-y-10">
                {data.data.map((reply, i) => (
                  <ReplyCard
                    key={i}
                    handymanName={reply.craftsman_name}
                    handymanImg={reply.image}
                    avgRating={reply.average_rating}
                    numberOfRating={reply.number_of_ratings}
                    description={reply.description}
                    price={reply.offered_price}
                    unit={reply?.type_of_pricing}
                  />
                ))}
                <Pagenation total={data?.latestPage} />
              </div>
            ) : (
              <p className="text-medium text-warning-color">
                لا يوجد ردود علي طلبك حتي الان.
              </p>
            )}
          </div>
        </section>
      </div>
    </Modal>
  );
}
function FilterAndSort() {
  return (
    <div className="sticky top-5 h-[calc(100vh-16rem)] w-full space-y-5 overflow-y-scroll rounded-md p-1 md:col-start-1 md:row-start-2">
      <SortBy />
      <Filter options={["joinDate", "rating"]} />
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
}) {
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
        <Button additionalStyle={` !bg-success-color`}>قبول</Button>
        <Button additionalStyle={` !bg-warning-color`}>رفض</Button>
      </div>
    </div>
  );
}
