import { useNavigate } from "react-router-dom";
import useHomeStats from "../../features/shared/useHomeStats";
import CheckIcon from "../../icons/CheckIcon";
import MoneyIcon from "../../icons/MoneyIcon";
import ScrewdriverIcon from "../../icons/ScrewdriverIcon";
import UserIcon from "../../icons/UserIcon";
import Button from "../../ui/Button";
import FullPageLoading from "../../ui/FullPageLoading";
import Logo from "../../ui/Logo";
import { imgBaseURL } from "../../util/constatnt";
import Slider from "react-slick";
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from "date-fns";
import HandymanIcon from "../../icons/HandymanIcon";
import ProfilePic from "../../ui/ProfilePic";

export default function PublicHome() {
  const navigate = useNavigate();
  const { data, isLoading } = useHomeStats();
  if (isLoading) return <FullPageLoading />;
  return (
    <>
      <nav className="container sticky top-0 z-10 flex h-24 w-full items-center justify-between border-b border-text-color/5 bg-primary-background shadow-md">
        <div className=" flex items-center gap-2">
          <Logo className=" h-20" />
          <span className=" select-none text-h2">حِرَفي</span>
        </div>
        <div className="flex gap-5">
          <Button
            onClick={() => navigate("/login")}
            style="outline"
            additionalStyle={`text-nowrap text-xsmall`}
          >
            تسجيل الدخول
          </Button>
          <span className="hidden sm:flex">
            <Button
              onClick={() => navigate("/signup")}
              additionalStyle={` text-nowrap text-xsmall `}
            >
              إنشاء حساب
            </Button>
          </span>
        </div>
      </nav>
      <main className=" container mb-10 space-y-20">
        <section className=" grid min-h-[calc(100vh-120px)] grid-rows-[auto,1fr] items-center justify-center md:h-fit md:grid-cols-[1fr,auto] md:grid-rows-1 md:items-center">
          <div className=" flex max-h-[300px] max-w-[300px] items-center justify-center place-self-center md:col-start-2 md:col-end-3 md:row-start-1">
            <img
              src="/char-blob.png"
              className="aspect-square h-full w-full object-contain object-center"
            />
          </div>
          <div className="col-end-2 flex h-full flex-col justify-center md:col-start-1 md:row-start-1 md:h-auto md:justify-start">
            <div>
              <p className=" text-[30px]  font-semibold text-primary-color ">
                حِرَفي
              </p>
              <p className=" mt-3 text-[20px]">
                بوابتك للعثور علي امهر الحرفيين
              </p>
            </div>
            <p className=" my-10 mt-10 text-medium tracking-wider md:my-12 md:text-small">
              ابحث عن الحرفي المثالي لمشروعك أو قدم خدماتك كحرفي ماهر . انضم
              إلينا اليوم لتحقيق النجاح في عالم الحرف والمهارات.
            </p>
            <Button
              onClick={() => navigate("/signup")}
              size="large"
              additionalStyle={`text-nowrap self-end md:self-start py-3`}
            >
              إنشاء حساب
            </Button>
          </div>
        </section>

        <section>
          <h2 className=" mb-12 text-h2 text-gray">الحرف المتاحة</h2>
          <div className="grid grid-cols-2 items-center justify-evenly gap-10 sm:grid-cols-[repeat(auto-fit,minmax(100px,200px))]">
            {data?.crafts?.map((craft) => {
              if (!craft?.image) return;
              return (
                <CraftCard
                  key={craft.id}
                  img={`url(${imgBaseURL + craft.image})`}
                  craftName={craft.name}
                  number={craft.num_of_craftsmen}
                />
              );
            })}
          </div>
        </section>
        <section>
          <h2 className=" mb-12 text-h2 text-gray">
            نتائجنا بالأرقام: إحصائيات الأداء
          </h2>
          <div className="grid grid-cols-2 items-center gap-10 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
            <StatsCrad
              icon={<MoneyIcon size={40} />}
              title={"ارباح الحرفيين"}
              number={`${data?.total_profit}`}
            />
            <StatsCrad
              icon={<UserIcon size={40} />}
              title={"عميل"}
              number={data?.client_num}
            />
            <StatsCrad
              icon={<ScrewdriverIcon size={40} />}
              title={"حرفي"}
              number={data?.craftsmen_num}
            />
            <StatsCrad
              icon={<CheckIcon size={40} />}
              title={"مهمه مكتملة"}
              number={data?.doneJobs_num}
            />
          </div>
        </section>
        <section>
          <h2 className=" mb-12 text-h2 text-gray"> الحرفيين الأعلي تقيماً</h2>
          <div className="slider-container">
            <Slider
              {...{
                className: "center",
                centerMode: true,
                centerPadding: "60px",
                autoplay: true,
                swipeToSlide: true,
                slidesToScroll: 1,
                pauseOnHover: true,
                cssEase: "linear",
                // dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 4,
                rtl: true,
                responsive: [
                  {
                    breakpoint: 1280,
                    settings: {
                      slidesToShow: 3,
                    },
                  },
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 2,
                      className: "center",
                      centerMode: true,
                    },
                  },
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 1,
                      className: "center",
                      centerMode: true,
                    },
                  },
                ],
              }}
            >
              {data?.top_craftsmen.map((craftsman, i) => (
                <HandymanCard
                  key={i}
                  handyman={{
                    id: craftsman.id,
                    rating: craftsman.average_rating,
                    craft: craftsman.craft,
                    img: craftsman.image,
                    name: craftsman.name,
                    numberOfRatings: craftsman.number_of_ratings,
                    doneJobs: craftsman.done_jobs_num,
                    createdAt: craftsman.created_at,
                  }}
                />
              ))}
            </Slider>
          </div>
        </section>
      </main>
    </>
  );
}
function StatsCrad({ icon, number, title }) {
  return (
    <div className="flex w-full flex-col items-center rounded-lg border border-text-color/5 bg-text-color/[0.02] py-8 shadow-md dark:shadow-lg">
      <span className="rounded-full bg-gradient-to-t from-primary-color/40 to-primary-color/80 p-5 text-rose-100  ">
        {icon}
      </span>
      <span className=" text-h1 text-primary-color/80">{number}</span>
      <p className=" font-semibold">{title}</p>
    </div>
  );
}
function CraftCard({ img = "", craftName, number }) {
  const count =
    number < 10 ? "~10" : "+" + Math.floor(number / 10).toFixed(0) * 10;
  console.log(count);
  return (
    <div
      style={{
        background: img,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: "-1",
      }}
      className={`relative flex aspect-[4/2] flex-col justify-evenly rounded-lg px-6 py-4 after:absolute after:left-1/2 after:top-1/2 after:z-[-1] after:h-full after:w-full after:translate-x-[-50%] after:translate-y-[-50%] after:rounded-lg after:bg-white/70 after:dark:bg-black/40`}
    >
      <p className=" text-h2 font-bold">{craftName}</p>
      <p className=" text-medium">{count}</p>
    </div>
  );
}
function HandymanCard({ handyman }) {
  const { id, rating, craft, img, name, doneJobs, createdAt } = handyman;
  const joinDate = {
    inYear: differenceInYears(Date.now(), createdAt),
    inMonth: differenceInMonths(Date.now(), createdAt),
    inDay: differenceInDays(Date.now(), createdAt),
  };
  return (
    <>
      <div
        style={{ direction: "rtl" }}
        className=" grid h-[235px] w-fit overflow-hidden rounded-md bg-secondary-background"
      >
        {img ? (
          <img
            src={imgBaseURL + img}
            className=" h-40 w-80 object-cover object-center"
          />
        ) : (
          <div className=" flex h-40 w-80 items-center justify-center">
            <span className=""></span>
            <ProfilePic size="md" />
          </div>
        )}
        <div className="pt-6">
          <p className=" text-center text-large font-semibold">{name}</p>
          <div className=" flex w-full items-center justify-center gap-2 py-3 text-xsmall ">
            <span>
              <HandymanIcon size={15} />
            </span>
            <p>نقاش</p>
          </div>
          <div className="grid grid-cols-[1fr,1fr,1fr] grid-rows-1 justify-items-center border-t border-text-color/20">
            <div className=" w-fit py-2 text-center">
              <div className=" text-large font-bold">{doneJobs}</div>
              <div className=" py-2 text-sm text-gray">مهام مكتملة</div>
            </div>
            <div className=" w-fit border-l border-r border-text-color/20  px-2 py-2 text-center">
              <div className="text-large font-bold">
                {joinDate?.inYear
                  ? ` ${joinDate?.inYear} سنه `
                  : joinDate?.inMonth
                    ? ` ${joinDate?.inMonth} شهر `
                    : ` ${joinDate?.inDay} يوم `}
              </div>
              <div className="py-2 text-sm text-gray">منضم منذ</div>
            </div>
            <div className=" w-fit py-2 text-center ">
              <div className="text-large font-bold">{rating}/5</div>
              <div className="py-2 text-sm text-gray">التقييم</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
