import { formatISO } from "date-fns";
import Pagenation from "../../../../ui/Pagenation";
import SmallSpinner from "../../../../ui/SmallSpinner";
import StaticRatingStars from "../../../../ui/StaticRatingStars";
import { imgBaseURL } from "../../../../util/constatnt";
import useGetWorkHistory from "./useGetWorkHistory";

export function WorkHistory() {
  const { workHistory, isLoading } = useGetWorkHistory();
  return (
    <div className="w-full space-y-8">
      <p className=" mb-10 text-h2 tracking-wider">سجل الأعمال</p>
      <div className=" space-y-10">
        {isLoading && (
          <div className="flex items-center justify-center">
            <SmallSpinner />
          </div>
        )}
        {workHistory?.workHistory.length > 0 ? (
          <>
            {workHistory?.workHistory.map((job, i) => (
              <WorkHistoryElement
                key={i}
                title={job?.title}
                review={job?.clint_rating?.[0]?.comment}
                rating={job?.clint_rating?.[0]?.rating / 5}
                imgs={job?.images?.map((img) => imgBaseURL + img.image)}
                date={formatISO(job?.created_at, { representation: "date" })}
              />
            ))}
            <Pagenation total={workHistory?.latestPage} />
          </>
        ) : (
          !isLoading && <p className=" text-medium">لا يوجد اعمال سابقه</p>
        )}
      </div>
    </div>
  );
}
function WorkHistoryElement({ title, date, review, rating, imgs }) {
  return (
    <div className="rounded-lg px-6 py-4 shadow-md backdrop-brightness-110">
      <p className=" text-large font-semibold text-primary-color">{title}</p>
      <div className="flex items-center justify-between">
        <div className=" mt-2">
          <StaticRatingStars ratingPercentage={rating} />
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
