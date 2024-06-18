import { formatISO } from "date-fns";
import FullPageLoading from "../../../ui/FullPageLoading";
import StaticRatingStars from "../../../ui/StaticRatingStars";
import useGetAllClientRatings from "./useGetAllClientRatings";
import Pagenation from "../../../ui/Pagenation";
import SmallSpinner from "../../../ui/SmallSpinner";

export default function ClientRating() {
  const { data, isLoading } = useGetAllClientRatings();
  console.log(data);
  if (isLoading) <FullPageLoading />;
  return (
    <div className=" container grid h-full grid-rows-[auto,1fr] gap-x-20 pt-5">
      <div className=" my-5 flex items-center justify-between sm:my-7 md:my-10 lg:row-start-1">
        <h1 className=" text-h2">تقييم الحرفيين للعميل</h1>
      </div>
      <section className="grid h-full w-[300px] max-w-[800px] grid-rows-[1fr,auto] space-y-5 justify-self-center pb-5 sm:w-[500px]  md:w-[600px] md:space-y-10 lg:row-start-2 lg:w-[800px]">
        {isLoading && <SmallSpinner />}
        {data?.data.length > 0 ? (
          <>
            <div className=" space-y-5">
              {data?.data.map((review, i) => (
                <RatingCard
                  key={i}
                  review={review.comment}
                  date={formatISO(review.created_at, {
                    representation: "date",
                  })}
                  rating={review.rating}
                />
              ))}
            </div>
            <Pagenation total={data.latestPage} />
          </>
        ) : (
          !isLoading && <p>لايوجد تقييمات لهذا العميل.</p>
        )}
      </section>
    </div>
  );
}
function RatingCard({ date, review, rating, imgs = [] }) {
  return (
    <div className="rounded-lg bg-secondary-background px-6 py-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className=" mt-2">
          <StaticRatingStars ratingPercentage={rating / 5} />
        </div>
        <span className=" text-gray">{date}</span>
      </div>
      <p
        onClick={(e) => e.currentTarget.classList.toggle("line-clamp-3")}
        className=" group my-5 line-clamp-3 font-light"
      >
        {review}
      </p>
      {imgs.length > 0 && (
        <div
          style={{
            gridTemplateColumns: `repeat(${imgs.length},100px)`,
          }}
          className="grid grid-rows-[100px] gap-5 overflow-y-hidden overflow-x-scroll pb-5 "
        >
          {imgs?.map((img, i) => (
            <img
              key={i}
              src={img}
              className=" h-[100px] w-[100px] rounded-xl object-cover object-center"
            />
          ))}
        </div>
      )}
    </div>
  );
}
