import { Link, useNavigate } from "react-router-dom";
import useHomeStats from "../../features/shared/useHomeStats";
import CheckIcon from "../../icons/CheckIcon";
import MoneyIcon from "../../icons/MoneyIcon";
import ScrewdriverIcon from "../../icons/ScrewdriverIcon";
import UserIcon from "../../icons/UserIcon";
import Button from "../../ui/Button";
import FullPageLoading from "../../ui/FullPageLoading";
import Logo from "../../ui/Logo";
import ProfilePic from "../../ui/ProfilePic";
import StaticRatingStars from "../../ui/StaticRatingStars";
import { imgBaseURL } from "../../util/constatnt";
import HandymanIcon from "../../icons/HandymanIcon";
import UserClockIcon from "../../icons/UserClockIcon";
import Slider from "react-slick";
export default function ClientHome() {
  const navigate = useNavigate();
  const { data, isLoading } = useHomeStats();
  if (isLoading) return <FullPageLoading />;
  return (
    <>
      <main className=" container mb-10 space-y-20">
        <section className="grid h-dvh grid-rows-[auto,1fr] items-center justify-center md:h-fit md:grid-cols-[1fr,auto] md:grid-rows-1 md:items-center">
          <div className=" flex max-h-[300px] max-w-[300px] items-center justify-center place-self-center md:col-start-2 md:col-end-3 md:row-start-1">
            <img
              src="/char-blob.png"
              className="aspect-square h-full w-full object-contain object-center"
            />
          </div>
          <div className="col-end-2 flex h-full flex-col justify-center md:col-start-1 md:row-start-1 md:h-auto md:justify-start">
            <div>
              <p className=" mt-3 text-[30px]">
                بوابتك للعثور علي امهر الحرفيين
              </p>
            </div>
            <p className=" my-10 mt-10 text-medium tracking-wider md:my-12 md:text-small">
              هل تبحث عن حرفي موهوب لتحويل رؤيتك إلى واقع؟ نحن هنا لمساعدتك في
              العثور على أفضل الحرفيين الذين يتناسبون مع متطلبات مشروعك. اطرح
              عرض العمل الخاص بك الآن وتلقَّ عروضًا من حرفيين ماهرين مستعدين
              لتقديم أفضل ما لديهم. دعنا نساعدك في تحقيق مشروعك بكل دقة
              واحترافية.
            </p>
            <Button
              onClick={() => navigate("client/job-offer/add")}
              size="large"
              additionalStyle={`text-nowrap self-end md:self-start py-3 w-fit`}
            >
              ابدأ مشروعك الآن
            </Button>
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
          <h2 className=" mb-12 text-h2 text-gray">الحرف المتاحة</h2>
          <div className="grid grid-cols-2 items-center justify-evenly gap-10 sm:grid-cols-[repeat(auto-fit,minmax(100px,200px))]">
            <CraftCard
              img={"before:bg-[url(/crafts/blacksmith.png')]"}
              craftName={"حِداده"}
              number={"54 حداد"}
            />
            <CraftCard
              img={"before:bg-[url('/crafts/carpenter.png')]"}
              craftName={"نجاره"}
              number={"36 نجار"}
            />
            <CraftCard
              img={"before:bg-[url('/crafts/electrical-technician.png')]"}
              craftName={"كهرباء"}
              number={"47 كهربائي"}
            />
            <CraftCard
              img={"before:bg-[url('/crafts/gypsom-worker.png')]"}
              craftName={"جبس"}
              number={"47 فني جبس"}
            />
            <CraftCard
              img={"before:bg-[url('/crafts/mechanic.png')]"}
              craftName={"ميكانيكا"}
              number={"19 ميكانيكي"}
            />
            <CraftCard
              img={"before:bg-[url('/crafts/painter.png')]"}
              craftName={"نقاشة"}
              number={"23 نقاش"}
            />
            <CraftCard
              img={"before:bg-[url('/crafts/plumber.png')]"}
              craftName={"سباكة"}
              number={"20 سباك"}
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
                // centerPadding: "60px",
                autoplay: true,
                swipeToSlide: true,
                slidesToScroll: 1,
                pauseOnHover: true,
                cssEase: "linear",
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 4,
                rtl: true,
                responsive: [
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 2,
                    },
                  },
                  {
                    breakpoint: 750,
                    settings: {
                      slidesToShow: 1,
                      className: "center",
                      centerMode: true,
                    },
                  },
                ],
              }}
            >
              <HandymanCard
                handyman={{
                  craftsman_id: 1,
                  average_rating: 3,
                  craft: "نقاش",
                  craftsman_image: "",
                  craftsman_name: "عمر مازن",
                  number_of_ratings: 8,
                }}
              />
              <HandymanCard
                handyman={{
                  craftsman_id: 1,
                  average_rating: 3,
                  craft: "نقاش",
                  craftsman_image: "",
                  craftsman_name: "عمر مازن",
                  number_of_ratings: 8,
                }}
              />
              <HandymanCard
                handyman={{
                  craftsman_id: 1,
                  average_rating: 3,
                  craft: "نقاش",
                  craftsman_image: "",
                  craftsman_name: "عمر مازن",
                  number_of_ratings: 8,
                }}
              />
              <HandymanCard
                handyman={{
                  craftsman_id: 1,
                  average_rating: 3,
                  craft: "نقاش",
                  craftsman_image: "",
                  craftsman_name: "عمر مازن",
                  number_of_ratings: 8,
                }}
              />
              <HandymanCard
                handyman={{
                  craftsman_id: 1,
                  average_rating: 3,
                  craft: "نقاش",
                  craftsman_image: "",
                  craftsman_name: "عمر مازن",
                  number_of_ratings: 8,
                }}
              />
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
function CraftCard({ img, craftName, number }) {
  return (
    <div
      className={`before:object-coer relative flex aspect-[4/2]  flex-col justify-evenly px-6 py-4 before:absolute before:left-1/2 before:top-1/2 before:z-[-1] before:h-full before:w-full before:translate-x-[-50%] before:translate-y-[-50%] before:rounded-lg ${img} before:bg-cover before:bg-center before:bg-no-repeat after:absolute after:left-1/2 after:top-1/2 after:z-[-1] after:h-full after:w-full after:translate-x-[-50%] after:translate-y-[-50%] after:rounded-lg after:bg-white/70 after:dark:bg-black/40`}
    >
      <p className=" text-h2 font-bold">{craftName}</p>
      <p className=" text-medium">{number}</p>
    </div>
  );
}
function HandymanCard({ handyman }) {
  const {
    craftsman_id: id,
    average_rating: rating,
    craft,
    craftsman_image: img,
    craftsman_name: name,
    number_of_ratings: numberOfRatings,
  } = handyman;
  return (
    <>
      <div
        style={{ direction: "rtl" }}
        className=" relative flex w-[200px] flex-col items-start rounded-lg bg-secondary-background px-12 py-6"
      >
        <Link
          to={`/handyman/${id}/`}
          className=" flex w-full flex-col items-center"
        >
          <span className=" mb-6 self-center">
            <ProfilePic src={img ? `${imgBaseURL}${img}` : null} size="md" />
          </span>
          <p className="self-center text-medium">{name}</p>
        </Link>
        <span className="mb-5 flex items-center gap-3 self-center">
          <StaticRatingStars ratingPercentage={rating / 5} />
          {`(${numberOfRatings || 0})`}
        </span>
        <div className="relative space-y-6 pt-6 before:absolute before:left-1/2 before:top-0 before:h-[1px] before:w-[200px] before:translate-x-[-50%] before:bg-text-color/20">
          <div className=" flex w-full items-center gap-2 ">
            <span>
              <HandymanIcon />
            </span>
            <h2>{craft}</h2>
          </div>
          <div className="flex items-center gap-3 self-start ">
            <UserClockIcon />
            <span className=" text-text-color">منضم منذ 3 سنوات</span>
          </div>
        </div>
      </div>
    </>
  );
}
