import { useNavigate, useSearchParams } from "react-router-dom";
import FilterIcon from "../../icons/FilterIcon";
import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import Modal from "../../ui/Modal";
import useScreenType from "../../hooks/useScreenType";
import { useEffect } from "react";
import useGetSearchReasult from "../../features/client/search/useGetSearchReasult";
import CalendarIcon from "../../icons/CalendarIcon";
import CheckIcon from "../../icons/CheckIcon";
import HandymanIcon from "../../icons/HandymanIcon";
import SandOfTime from "../../icons/SandOfTime";
import Label from "../../ui/Label";
import ProfilePic from "../../ui/ProfilePic";
import StaticRatingStars from "../../ui/StaticRatingStars";
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from "date-fns";
import { imgBaseURL } from "../../util/constatnt";
import FullPageLoading from "../../ui/FullPageLoading";
import StarIcon from "../../icons/StarIcon";

export default function Search() {
  const [searchParams] = useSearchParams();
  const { results, isLoading } = useGetSearchReasult();
  const navigate = useNavigate();
  const screen = useScreenType();
  const query = searchParams.get("query");
  useEffect(() => {
    if (query.length == 0) navigate("/client");
  });
  if (isLoading) return <FullPageLoading />;
  return (
    <Modal modalCloseScreenSize={["xl"]}>
      <div className=" container grid gap-x-20 lg:grid-cols-[minmax(auto,250px),1fr] lg:grid-rows-[auto,1fr]">
        <div className=" my-5 flex items-center justify-between sm:my-7 md:my-10 lg:col-start-1 lg:col-end-3 lg:row-start-1">
          <h1 className=" text-h2">نتائج البحث عن {`" ${query} "`}</h1>
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
        <section className="w-full space-y-5 overflow-x-hidden md:space-y-10 lg:col-start-2 lg:row-start-2">
          {results?.data ? (
            results?.data?.map((handyman, i) => (
              <SearchCard key={i} handyman={handyman} />
            ))
          ) : (
            <p>لا يوجد نتائج</p>
          )}
        </section>
      </div>
    </Modal>
  );
}
function FilterAndSort() {
  return (
    <div className="h-[calc(100vh-16rem)] w-full space-y-5 rounded-md p-1 sm:mt-24 md:col-start-1 md:row-start-2 lg:sticky lg:top-5 lg:mt-0 lg:overflow-y-scroll">
      <SortBy />
      <Filter />
    </div>
  );
}

function SearchCard({ handyman }) {
  const navigate = useNavigate();
  const {
    id,
    name,
    image: profilePic,
    created_at: joinDate,
    description,
    average_rating: rating,
    number_of_ratings: numberOfRatings,
    done_jobs_num: numberOfActiveJobs,
    active_jobs_num: numberOfDoneJobs,
    search_images: specialImages,
    craft: { name: craft },
  } = handyman;

  const join = {
    inYear: differenceInYears(Date.now(), joinDate),
    inMonth: differenceInMonths(Date.now(), joinDate),
    inDay: differenceInDays(Date.now(), joinDate),
  };
  return (
    <div
      onClick={() => navigate(`/handyman/${id}`)}
      className="cursor-pointer rounded-lg bg-secondary-background p-6 shadow-md dark:shadow-lg"
    >
      {/* الاسم و الصورة و الوظيفه */}
      <div className="flex items-center gap-6">
        <span>
          <ProfilePic
            size="md"
            src={profilePic ? `${imgBaseURL}${profilePic}` : null}
          />
        </span>
        <div className="space-y-1">
          <p className="">{name}</p>
          <div className=" flex gap-5">
            <div className="flex items-center gap-2 text-xsmall">
              <span>
                <HandymanIcon size={15} />
              </span>
              <p className="font-semibold tracking-wider">{craft}</p>
            </div>
          </div>
        </div>
      </div>
      {/* تاريخ الانضمام و التقييم و المهام المكتمله و المهام النشطه */}
      <div className="flex gap-5 overflow-x-scroll text-nowrap px-2 py-5">
        <Label>
          <CalendarIcon />
          منضم منذ{" "}
          {join.inYear
            ? `${join.inYear} سنه`
            : join.inMonth
              ? `${join.inMonth} شهر`
              : `${join.inDay} يوم`}
        </Label>
        <Label>
          {rating ? (
            <>
              <StaticRatingStars ratingPercentage={rating / 5} size={13} />
              {`(${numberOfRatings})`}
            </>
          ) : (
            <>
              <span className=" text-[#FFBA49]">
                <StarIcon />
              </span>
              <p>لايوجد تقييم</p>
            </>
          )}
        </Label>
        <Label>
          <span className="text-success-color">
            <CheckIcon size={15} />
          </span>
          {numberOfDoneJobs} مهام مكتملة
        </Label>
        <Label>
          <span className=" text-success-color">
            <SandOfTime size={15} />
          </span>
          {numberOfActiveJobs} مهام نشطة
        </Label>
      </div>
      {/* عن الحرفي */}
      {description && (
        <p className="line-clamp-3 pt-5 text-xsmall font-light">
          {description}
        </p>
      )}
      {/* ابرز الاعمال */}
      {specialImages.length > 0 && (
        <div className="flex gap-5 overflow-scroll py-5">
          {specialImages.map((img, i) => (
            <div className="w-32 min-w-32" key={i}>
              <figure className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-primary-background bg-[url('/defaultImg.png')] bg-center bg-no-repeat text-text-color">
                <img
                  src={`${imgBaseURL}${img.image}`}
                  alt=""
                  className=" h-full w-full object-cover object-center"
                />
              </figure>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
