import { useNavigate } from "react-router-dom";
import useHomeStats from "../../features/shared/useHomeStats";
import CheckIcon from "../../icons/CheckIcon";
import MoneyIcon from "../../icons/MoneyIcon";
import ScrewdriverIcon from "../../icons/ScrewdriverIcon";
import UserIcon from "../../icons/UserIcon";
import Button from "../../ui/Button";
import FullPageLoading from "../../ui/FullPageLoading";
import Logo from "../../ui/Logo";

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
          <span className="hidden sm:flex">
            <Button
              onClick={() => navigate("/login")}
              style="outline"
              additionalStyle={`text-nowrap text-xsmall`}
            >
              تسجيل الدخول
            </Button>
          </span>
          <Button
            onClick={() => navigate("/signup")}
            additionalStyle={` text-nowrap text-xsmall `}
          >
            إنشاء حساب
          </Button>
        </div>
      </nav>
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
