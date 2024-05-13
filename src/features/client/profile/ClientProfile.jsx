import { Link, useParams } from "react-router-dom";
import PhoneIcon from "../../../icons/PhoneIcon";
import ProfilePic from "../../../ui/ProfilePic";
import { useEffect } from "react";
import UserClockIcon from "../../../icons/UserClockIcon";
import StarIcon from "../../../icons/StarIcon";
import CheckCircle from "../../../icons/CheckCircle";
import StaticRatingStars from "../../../ui/StaticRatingStars";
import useGetUser from "../../shared/Authentication/useGetUser";
import SmallSpinner from "../../../ui/SmallSpinner";
import NotFound from "../../../ui/NotFound";
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from "date-fns";
import { imgBaseURL } from "../../../util/constatnt";
import FullPageLoading from "../../../ui/FullPageLoading";

export default function ClientProfile() {
  const { id } = useParams();

  const { isLoading, getUser, user } = useGetUser();
  useEffect(() => {
    if (!id) return;
    getUser({ id, role: "client" });
  }, [id]);
  if ((!id && !user?.name) || isLoading) return <FullPageLoading />;
  if (id && !user?.status && !isLoading)
    return <NotFound message={"هذا المستخد غير موجود"} />;
  return (
    <div className=" container my-10 h-full space-y-10">
      <div className=" grid grid-cols-[auto,1fr,auto]  grid-rows-1 items-center gap-5">
        <ProfilePic
          size="md"
          src={user?.image ? `${imgBaseURL}${user.image}` : null}
        />
        <div className=" space-y-5">
          <h1 className=" text-large font-semibold">{user?.name}</h1>
        </div>
      </div>
      <div className=" grid grid-cols-1 grid-rows-[repeat(3,auto)] gap-5 md:grid-cols-[minmax(150px,300px),minmax(350px,1fr)] md:grid-rows-[repeat(2,auto)] md:gap-10 ">
        <ul className="10 flex items-center gap-2 border-b border-text-color/20  md:col-start-1 md:col-end-3">
          <li
            className={`relative cursor-pointer content-center text-text-color/100 after:absolute after:bottom-0 after:left-1/2 after:h-1 after:w-full after:translate-x-[-50%] after:translate-y-[50%] after:border-b-2 after:border-primary-color`}
          >
            <Link className=" block w-full p-4" to={"work_history"}>
              الأعمال السابقه
            </Link>
          </li>
        </ul>
        <aside className="col-start-1 col-end-2 row-start-1 row-end-3 mt-10 rounded-lg bg-secondary-background px-6 py-6 md:row-start-2 md:px-12 md:py-8">
          <About
            joinDate={{
              inYear: differenceInYears(Date.now(), user?.created_at),
              inMonth: differenceInMonths(Date.now(), user?.created_at),
              inDay: differenceInDays(Date.now(), user?.created_at),
            }}
            rating={user?.rating}
            numberOfRating={user?.number_of_ratings}
          />
        </aside>
        <section className=" mt-10 w-full rounded-lg bg-secondary-background px-6 py-6 md:col-start-2 md:col-end-3 md:row-start-2 md:row-end-4 md:px-12 md:py-8">
          <WorkHistory />
        </section>
      </div>
    </div>
  );
}
export function About({ joinDate, rating, numberOfRating }) {
  return (
    <>
      <div className="space-y-8">
        <div className=" flex flex-col items-start gap-5">
          <div className=" flex  items-center gap-3 text-gray">
            <span className=" flex items-center gap-3">
              <UserClockIcon />
              <span> منضم منذ :</span>
            </span>
            <span className=" text-small text-text-color">
              {joinDate.inYear
                ? `${joinDate.inYear} سنه`
                : joinDate.inMonth
                  ? `${joinDate.inMonth} شهر`
                  : `${joinDate.inDay} يوم`}
            </span>
          </div>
          <div className=" flex  items-center gap-3 text-gray">
            <span className=" flex items-center gap-3">
              <StarIcon />
              <span>التقييم :</span>
            </span>
            <span className=" text-small text-text-color">
              {rating ? `${rating.toFixed(1)} (${numberOfRating})` : "لا يوجد"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
function WorkHistory() {
  return (
    <div className="w-full space-y-8">
      <p className=" mb-10 text-h2 tracking-wider">سجل الأعمال</p>
      <div className=" space-y-10">
        <WorkHistoryElement
          title={"برجولة خشبية مصنوعة من خشب الزان"}
          review={
            "قمت بشراء هذه البرجولة الخشبية لتزيين فناء منزلي، وأنا فعلاً سعيد جداً بالنتيجة. تصميمها الأنيق وجودتها العالية جعلتها إضافة رائعة للمساحة الخارجية. يبدو أن خشب الزان المستخدم في صناعتها يتمتع بمتانة فائقة ويبدو أنه سيدوم لسنوات قادمة دون التأثر بالظروف الجوية."
          }
          rating={0.8}
          imgs={[
            "/public/work1.jpeg",
            "/public/work2.webp",
            "/public/work3.jpeg",
          ]}
          date={"12/2/2023"}
        />
        <WorkHistoryElement
          title={"برجولة خشبية مصنوعة من خشب الزان"}
          review={
            "قمت بشراء هذه البرجولة الخشبية لتزيين فناء منزلي، وأنا فعلاً سعيد جداً بالنتيجة. تصميمها الأنيق وجودتها العالية جعلتها إضافة رائعة للمساحة الخارجية. يبدو أن خشب الزان المستخدم في صناعتها يتمتع بمتانة فائقة ويبدو أنه سيدوم لسنوات قادمة دون التأثر بالظروف الجوية."
          }
          rating={0.8}
          imgs={[
            "/public/work1.jpeg",
            "/public/work2.webp",
            "/public/work3.jpeg",
          ]}
          date={"12/2/2023"}
        />
        <WorkHistoryElement
          title={"برجولة خشبية مصنوعة من خشب الزان"}
          review={
            "قمت بشراء هذه البرجولة الخشبية لتزيين فناء منزلي، وأنا فعلاً سعيد جداً بالنتيجة. تصميمها الأنيق وجودتها العالية جعلتها إضافة رائعة للمساحة الخارجية. يبدو أن خشب الزان المستخدم في صناعتها يتمتع بمتانة فائقة ويبدو أنه سيدوم لسنوات قادمة دون التأثر بالظروف الجوية."
          }
          rating={0.8}
          imgs={[
            "/public/work1.jpeg",
            "/public/work2.webp",
            "/public/work3.jpeg",
          ]}
          date={"12/2/2023"}
        />
      </div>
    </div>
  );
}
function WorkHistoryElement({ title, date, review, rating }) {
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
    </div>
  );
}
