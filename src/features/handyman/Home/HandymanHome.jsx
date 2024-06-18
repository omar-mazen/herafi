import MoneyIcon from "../../../icons/MoneyIcon";
import StarIcon from "../../../icons/StarIcon";
import SandOfTime from "../../../icons/SandOfTime";
import CheckIcon from "../../../icons/CheckIcon";
import Button from "../../../ui/Button";
import MapPinIcon from "../../../icons/MapPinIcon";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { add, formatDate, sub } from "date-fns";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "../../../context/Theme";
import { useNavigate } from "react-router-dom";
import { ar } from "date-fns/locale";
import { useAuth } from "../../../context/Auth";
import useGetNewJobs from "../newJobs/useGetNewJobs";
import useGetActiveJobs from "../activeJobs/useGetActiveJobs";
import { useEffect } from "react";
import { getProfitChart } from "../../../services/handyman/chart";
import SmallSpinner from "../../../ui/SmallSpinner";
import { imgBaseURL } from "../../../util/constatnt";
const currentMonth = new Date().getMonth() + 1;
export default function HandymanHome() {
  const { theme } = useTheme();
  const { user, id } = useAuth();
  const navigate = useNavigate();
  const {
    data: newJobs,
    isLoading: newJobsIsLoading,
    isFetched,
  } = useGetNewJobs(5);
  const { data: activeJobs, isLoading: activeJobsIsLoading } =
    useGetActiveJobs(5);
  // console.log(activeJobs);
  useEffect(
    function () {
      if (!id) return;
      console.log(getProfitChart({ id }));
    },
    [id],
  );
  return (
    <div className=" container my-10 space-y-10 md:space-y-12">
      <section className=" grid min-h-[calc(100vh-120px)] grid-rows-[auto,1fr] items-center justify-center md:h-fit md:grid-cols-[1fr,auto] md:grid-rows-1 md:items-center">
        <div className=" flex max-h-[300px] max-w-[300px] items-center justify-center place-self-center md:col-start-2 md:col-end-3 md:row-start-1">
          <img
            src="/char-blob.png"
            className="aspect-square h-full w-full object-contain object-center"
          />
        </div>
        <div className="col-end-2 flex h-full flex-col justify-center md:col-start-1 md:row-start-1 md:h-auto md:justify-start">
          <div>
            <p className=" mt-3 text-[30px]">
              ابدأ رحلتك المهنية اليوم: ابحث عن العمل وقدّم عروضك!
            </p>
          </div>
          <p className=" my-10 mt-10 text-medium tracking-wider md:my-12 md:text-small">
            مرحبًا بك في مجتمعنا! انضميت إلينا، والآن حان الوقت لاستكشاف الفرص
            والتحديات التي تنتظرك في عالم الحرف والمهارات. قم بتصفح العروض
            المتاحة وقدم عروضك للعملاء المحتملين . إن رحلتك المهنية تبدأ هنا،
            فلنتحرك معًا نحو مستقبل مليء بالنجاح والتحقيقات المهنية!
          </p>
          <Button
            onClick={() => navigate("/handyman/jobs/new")}
            size="large"
            additionalStyle={`text-nowrap self-end md:self-start py-3 w-fit`}
          >
            ابدأ العمل الآن
          </Button>
        </div>
      </section>
      {/* stats */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10">
        <div className="flex min-w-80 items-center gap-5 rounded-lg bg-secondary-background px-6 py-4 shadow-md">
          <span className="rounded-full bg-yellow-500/90 p-3 text-neutral-50">
            <StarIcon size={40} />
          </span>
          <div className=" space-y-2">
            <div className="text-gray">{`تقييمك`}</div>
            <div className="text-large font-bold tracking-wider">
              {user?.rating ? user?.rating : "لايوجد"}
            </div>
          </div>
        </div>
        <div className="flex min-w-80 items-center gap-5 rounded-lg bg-secondary-background px-6 py-4 shadow-md">
          <span className="rounded-full bg-red-700/80 p-3 text-neutral-50">
            <SandOfTime size={40} />
          </span>
          <div className=" space-y-2">
            <div className="text-gray">{`المهام النشطة`}</div>
            <div className="text-large font-bold tracking-wider">
              {user?.number_of_real_time_jobs || 0}
            </div>
          </div>
        </div>
        <div className="flex min-w-80 items-center gap-5 rounded-lg bg-secondary-background px-6 py-4 shadow-md">
          <span className="rounded-full bg-blue-500/80 p-3 text-neutral-50">
            <CheckIcon size={40} />
          </span>
          <div className=" space-y-2">
            <div className=" text-gray">{`المهام المكتملة`}</div>
            <div className=" text-large font-semibold tracking-wider">
              {user?.number_of_done_jobs || 0}
            </div>
          </div>
        </div>
      </div>
      <div className=" grid gap-10 md:gap-12 lg:grid-cols-[repeat(2,1fr)]">
        {/* المهام الجديده */}
        <div className=" relative h-[579px] space-y-5  rounded-lg border-2 border-text-color/20 px-6 pb-6 pt-4">
          <span
            onClick={() => navigate("/handyman/new-jobs")}
            className=" absolute top-0 mx-[-4px] translate-y-[-50%] cursor-pointer bg-primary-background px-[4px] text-medium font-semibold"
          >
            المهام الجديده
          </span>
          {newJobsIsLoading && <SmallSpinner />}
          {newJobs?.data?.length > 0 ? (
            <>
              <div className=" space-y-5">
                {newJobs?.data.map((job, i) => (
                  <NewJobCard
                    key={i}
                    title={job.title}
                    description={job.description}
                    city={job.city}
                    id={job.id}
                  />
                ))}
              </div>
            </>
          ) : (
            !newJobsIsLoading && <p>لايوجد مهام جديده.</p>
          )}
        </div>
        <div className="relative h-[579px] space-y-5 rounded-lg border-2 border-text-color/20 px-6 pb-6 pt-4">
          <span
            onClick={() => navigate("/handyman/new-jobs")}
            className=" absolute top-0 mx-[-4px] translate-y-[-50%] cursor-pointer bg-primary-background px-[4px] text-medium font-semibold"
          >
            المهام النشطة
          </span>
          {activeJobsIsLoading && <SmallSpinner />}
          {activeJobs?.data?.length > 0 ? (
            <>
              <div className=" space-y-5">
                {activeJobs?.data.map((job, i) => (
                  <ActiveJob
                    key={i}
                    title={job.title}
                    description={job.description}
                    img={job.image}
                    address={job.address}
                    city={job.city}
                    id={job.id}
                  />
                ))}
              </div>
            </>
          ) : (
            !activeJobsIsLoading && <p>لايوجد مهام نشطة.</p>
          )}
        </div>
      </div>
      {/* chart */}
      <div className=" relative  rounded-lg border-2 border-text-color/20 px-6 pb-6 pt-10">
        <span className=" absolute right-6 top-0 mx-[-4px] translate-y-[-50%] cursor-pointer bg-primary-background px-[4px] text-medium font-semibold">
          إحصائيات
        </span>
        <ResponsiveContainer
          aspect={3}
          width={"100%"}
          maxHeight={"100%"}
          className={"rounded-lg bg-secondary-background !text-text-color"}
        >
          <LineChart
            margin={{
              top: 35,
              bottom: 20,
              right: 20,
              left: 20,
            }}
            data={[
              {
                name: "يوليو",
                "المهام المكتملة": 6,
                الارباح: 600,
              },
              {
                name: "اغسطس",
                "المهام المكتملة": 6,
                الارباح: 600,
              },
              {
                name: "سبتمبر",
                "المهام المكتملة": 8,
                الارباح: 900,
              },
              {
                name: "اكتوبر",
                "المهام المكتملة": 10,
                الارباح: 100,
              },
              {
                name: "نوفمبر",
                "المهام المكتملة": 4,
                الارباح: 400,
              },
              {
                name: "ديسمبر",
                "المهام المكتملة": 10,
                الارباح: 1200,
              },
              {
                name: "يناير",
                "المهام المكتملة": 3,
                الارباح: 500,
              },
              {
                name: "فبراير",
                "المهام المكتملة": 5,
                الارباح: 800,
              },
              {
                name: "مارس",
                "المهام المكتملة": 2,
                الارباح: 400,
              },
              {
                name: "ابريل",
                "المهام المكتملة": 12,
                الارباح: 1500,
              },
              {
                name: "مايو",
                "المهام المكتملة": 0,
                الارباح: 0,
              },
              {
                name: "يونيو",
                "المهام المكتملة": 9,
                الارباح: 1200,
              },
            ]}
          >
            <CartesianGrid opacity="10%" />
            <XAxis
              textAnchor="start"
              fontSize={"1rem"}
              angle={-45}
              interval={0}
              dataKey={"name"}
              tick={{
                fill: `${theme == "dark" ? "rgba(246, 246, 246 ,0.7)" : "rgba(50, 50, 50,0.7)"}`,
              }}
            />
            <YAxis
              width={30}
              angle="-45"
              textAnchor="start"
              dataKey={"الارباح"}
              tick={{
                fill: `${theme == "dark" ? "rgba(246, 246, 246 ,0.7)" : "rgba(50, 50, 50,0.7)"}`,
              }}
            >
              {/* <Label position={"top"} value={"الربح"} offset={"15"} /> */}
            </YAxis>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="الارباح" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
function NewJobCard({ title, description, city, id }) {
  return (
    <div className=" space-y-5 overflow-hidden rounded-lg bg-secondary-background px-6 py-4">
      <div className=" flex items-center justify-between">
        <div className="flex items-center gap-5">
          <p className=" line-clamp-1 text-large font-semibold">{title}</p>
        </div>
        <span className=" text-xsmall text-primary-color">{city}</span>
      </div>
      <p className=" line-clamp-2 max-w-[60ch] text-xsmall">{description}</p>
    </div>
  );
}
function ActiveJob({ img, title, address }) {
  return (
    <div className=" w-full space-y-5 overflow-hidden rounded-lg bg-secondary-background px-6 py-4">
      <div className=" flex w-full items-center justify-between">
        <div className="flex w-full items-center gap-5">
          {img && (
            <figure className="h-28 w-28 overflow-hidden rounded-full bg-primary-background bg-[url('/defaultImg.png')] bg-center bg-no-repeat text-text-color">
              <img
                src={`${imgBaseURL + img}`}
                alt=""
                className=" h-full w-full object-cover object-center"
              />
            </figure>
          )}
          <div className="flex-1 space-y-3">
            <div className=" flex items-center justify-between">
              <p className=" line-clamp-1 text-large font-semibold">{title}</p>
              <span className=" text-xsmall text-gray">12/2/2024</span>
            </div>
            <div className="flex w-full items-center justify-between">
              <div className=" flex items-center gap-2">
                <span>
                  <MapPinIcon size={15} />
                </span>
                <p className=" line-clamp-1 text-xsmall">{address}</p>
              </div>
              <Button size="small">إنهاء</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// المهام المكتملة
/*
          <ResponsiveContainer
            aspect={2}
            width={"99%"}
            maxHeight={"300px"}
            className={"overflow-hidden rounded-lg bg-secondary-background"}
          >
            <LineChart
              margin={{
                top: 35,
                bottom: 20,
                right: 20,
                left: 20,
              }}
              data={[
                {
                  name: "يناير",
                  "المهام المكتملة": 3,
                  الارباح: 500,
                },
                {
                  name: "فبراير",
                  "المهام المكتملة": 5,
                  الارباح: 800,
                },
                {
                  name: "مارس",
                  "المهام المكتملة": 2,
                  الارباح: 400,
                },
                {
                  name: "ابريل",
                  "المهام المكتملة": 12,
                  الارباح: 1500,
                },
                {
                  name: "مايو",
                  "المهام المكتملة": 0,
                  الارباح: 0,
                },
                {
                  name: "يونيو",
                  "المهام المكتملة": 9,
                  الارباح: 1200,
                },
                {
                  name: "يوليو",
                  "المهام المكتملة": 6,
                  الارباح: 600,
                },
                {
                  name: "اغسطس",
                  "المهام المكتملة": 6,
                  الارباح: 600,
                },
                {
                  name: "سبتمبر",
                  "المهام المكتملة": 8,
                  الارباح: 900,
                },
                {
                  name: "اكتوبر",
                  "المهام المكتملة": 10,
                  الارباح: 100,
                },
                {
                  name: "نوفمبر",
                  "المهام المكتملة": 4,
                  الارباح: 400,
                },
                {
                  name: "ديسمبر",
                  "المهام المكتملة": 10,
                  الارباح: 1200,
                },
              ]}
            >
              <CartesianGrid opacity="10%" />
              <XAxis
                textAnchor="start"
                fontSize={"1rem"}
                angle={-45}
                interval={0}
                dataKey={"name"}
                tick={{
                  fill: `${theme == "dark" ? "rgba(246, 246, 246 ,0.7)" : "rgba(50, 50, 50,0.7)"}`,
                }}
              />
              <YAxis
                width={20}
                angle="-45"
                textAnchor="start"
                dataKey={"المهام المكتملة"}
                tick={{
                  fill: `${theme == "dark" ? "rgba(246, 246, 246 ,0.7)" : "rgba(50, 50, 50,0.7)"}`,
                }}
              ></YAxis>
              <Tooltip />
              <Legend iconType="line" />
              <Line
                type="monotone"
                dataKey="المهام المكتملة"
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
*/
/* 
        // المهام المعلقه 
         <div className=" relative space-y-5 rounded-lg border-2 border-text-color/20 px-6 pb-6 pt-4">
          <span
            onClick={() => navigate("/handyman/pended-jobs")}
            className=" absolute top-0 mx-[-4px] translate-y-[-50%] cursor-pointer bg-primary-background px-[4px] text-medium font-semibold"
          >
            //المهام المعلقه
          </span>
          <div className=" space-y-5 overflow-hidden rounded-lg bg-secondary-background px-6 py-4">
            <div className=" flex items-center justify-between">
              <div className="flex items-center gap-5">
                <p className=" line-clamp-1 text-large font-semibold">
                  وحدة ادراج
                </p>
              </div>
              <span className=" text-xsmall text-primary-color">المنصورة</span>
            </div>
            <p className=" line-clamp-2 text-xsmall">
              أود أن أطلب صندوقًا متحركًا لتخزين الأدوات والمستلزمات في مكتبي.
              يجب أن يكون الصندوق مصنوعًا من الخشب عالي الجودة ويحتوي على عجلات
              قابلة للتحرك لسهولة التنقل. يجب أن يكون الصندوق مزودًا بعدة أدراج
              مختلفة الأحجام لتنظيم الأغراض بشكل فعال. يفضل أن يكون التصميم
              بسيطًا وعصريًا مع لمسات من الخشب الطبيعي. يرجى تقديم عرض أسعار
              لهذا المشروع مع توضيح المواد المستخدمة والمدة المتوقعة للتسليم.
              شكرًا جزيلاً.
            </p>
            <Button size="small" additionalStyle={`float-left`}>
              إلغاء
            </Button>
          </div>
          <div className=" space-y-5 overflow-hidden rounded-lg bg-secondary-background px-6 py-4">
            <div className=" flex items-center justify-between">
              <div className="flex items-center gap-5">
                <p className=" line-clamp-1 text-large font-semibold">
                  وحدة ادراج
                </p>
              </div>
              <span className=" text-xsmall text-primary-color">المنصورة</span>
            </div>
            <p className=" line-clamp-2 text-xsmall">
              أود أن أطلب صندوقًا متحركًا لتخزين الأدوات والمستلزمات في مكتبي.
              يجب أن يكون الصندوق مصنوعًا من الخشب عالي الجودة ويحتوي على عجلات
              قابلة للتحرك لسهولة التنقل. يجب أن يكون الصندوق مزودًا بعدة أدراج
              مختلفة الأحجام لتنظيم الأغراض بشكل فعال. يفضل أن يكون التصميم
              بسيطًا وعصريًا مع لمسات من الخشب الطبيعي. يرجى تقديم عرض أسعار
              لهذا المشروع مع توضيح المواد المستخدمة والمدة المتوقعة للتسليم.
              شكرًا جزيلاً.
            </p>
            <Button size="small" additionalStyle={`float-left`}>
              إلغاء
            </Button>
          </div>
          <div className=" space-y-5 overflow-hidden rounded-lg bg-secondary-background px-6 py-4">
            <div className=" flex items-center justify-between">
              <div className="flex items-center gap-5">
                <p className=" line-clamp-1 text-large font-semibold">
                  وحدة ادراج
                </p>
              </div>
              <span className=" text-xsmall text-primary-color">المنصورة</span>
            </div>
            <p className=" line-clamp-2 text-xsmall">
              أود أن أطلب صندوقًا متحركًا لتخزين الأدوات والمستلزمات في مكتبي.
              يجب أن يكون الصندوق مصنوعًا من الخشب عالي الجودة ويحتوي على عجلات
              قابلة للتحرك لسهولة التنقل. يجب أن يكون الصندوق مزودًا بعدة أدراج
              مختلفة الأحجام لتنظيم الأغراض بشكل فعال. يفضل أن يكون التصميم
              بسيطًا وعصريًا مع لمسات من الخشب الطبيعي. يرجى تقديم عرض أسعار
              لهذا المشروع مع توضيح المواد المستخدمة والمدة المتوقعة للتسليم.
              شكرًا جزيلاً.
            </p>
            <Button size="small" additionalStyle={`float-left`}>
              إلغاء
            </Button>
          </div>
        </div> 
        // المهام النشطه 
        <div className="relative rounded-lg border-2 border-text-color/20 pt-4 lg:col-start-1 lg:col-end-3">
          <span className=" absolute top-0 mx-[-4px] translate-y-[-50%] cursor-pointer bg-primary-background px-[4px] text-medium font-semibold">
            المهام النشطة
          </span>
          <div className="grid gap-10 overflow-hidden md:gap-12 lg:grid-cols-2">
           //calendar 
             <div className="relative h-full overflow-hidden rounded-lg px-6 py-6">
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                expandRows={true}
                height={"auto"}
                firstDay={6}
                locale={ar}
                direction="rtl"
                timeZone="Africa/Cairo"
                eventColor="rgb(239,54,81)"
                dayMaxEventRows={2}
                events={[
                  {
                    title: "تصنيع وحدة ادراج",
                    date: formatDate(Date.now(), "yyyy-MM-dd"),
                  },
                  {
                    title: "تصنيع وحدة ادراج",
                    date: formatDate(Date.now(), "yyyy-MM-dd"),
                  },
                  {
                    title: "تصنيع وحدة ادراج",
                    date: formatDate(Date.now(), "yyyy-MM-dd"),
                  },
                  {
                    title: "تصنيع وحدة ادراج",
                    date: formatDate(Date.now(), "yyyy-MM-dd"),
                  },
                  {
                    title: "تصنيع وحدة ادراج",
                    date: formatDate(Date.now(), "yyyy-MM-dd"),
                  },
                  {
                    title: "تصنيع وحدة ادراج",
                    date: formatDate(Date.now(), "yyyy-MM-dd"),
                  },
                  {
                    title: "صيانة باب",
                    date: formatDate(
                      sub(Date.now(), { days: 3 }),
                      "yyyy-MM-dd",
                    ),
                  },
                  {
                    title: "صيانة مكتب",
                    date: formatDate(
                      add(Date.now(), { days: 3 }),
                      "yyyy-MM-dd",
                    ),
                  },
                  {
                    title: "تركيب عَجل لمكتب خشبي",
                    date: formatDate(
                      add(Date.now(), { days: 6 }),
                      "yyyy-MM-dd",
                    ),
                  },
                  {
                    title: "تصنيع وحدة ادراج",
                    date: formatDate(
                      add(Date.now(), { days: 12 }),
                      "yyyy-MM-dd",
                    ),
                  },
                  {
                    title: "تصنيع وحدة ادراج",
                    date: formatDate(
                      add(Date.now(), { days: 14 }),
                      "yyyy-MM-dd",
                    ),
                  },
                  {
                    title: "تصنيع وحدة ادراج",
                    date: formatDate(
                      add(Date.now(), { days: 18 }),
                      "yyyy-MM-dd",
                    ),
                  },
                  {
                    title: "تصنيع وحدة ادراج",
                    date: formatDate(
                      add(Date.now(), { days: 22 }),
                      "yyyy-MM-dd",
                    ),
                  },
                ]}
              />
            </div>
            <div className="pt-6">
              <p className="  mb-[27px] h-[31px] text-h2">مهامك</p>
              <div className="max-h-[483px] space-y-5 overflow-scroll">
                <div className=" w-full space-y-5 overflow-hidden rounded-lg bg-secondary-background px-6 py-4">
                  <div className=" flex w-full items-center justify-between">
                    <div className="flex w-full items-center gap-5">
                      <figure className="h-28 w-28 overflow-hidden rounded-full bg-primary-background bg-[url('/defaultImg.png')] bg-center bg-no-repeat text-text-color">
                        <img
                          src="/public/work2.webp"
                          alt=""
                          className=" h-full w-full object-cover object-center"
                        />
                      </figure>
                      <div className="flex-1 space-y-3">
                        <div className=" flex items-center justify-between">
                          <p className=" line-clamp-1 text-large font-semibold">
                            وحدة ادراج
                          </p>
                          <span className=" text-xsmall text-gray">
                            12/2/2024
                          </span>
                        </div>
                        <div className="flex w-full items-center justify-between">
                          <div className=" flex items-center gap-2">
                            <span>
                              <MapPinIcon size={15} />
                            </span>
                            <p className=" line-clamp-1 text-xsmall">
                              الدقليه, المنصوره, احمد ماهر
                            </p>
                          </div>
                          <Button size="small">إنهاء</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
*/
// ارباح الشهر
{
  /* <div className="flex min-w-80 items-center gap-5 rounded-lg bg-secondary-background px-6 py-4 shadow-md">
          <span className=" rounded-full bg-green-700 p-3 text-neutral-50">
            <MoneyIcon size={40} />
          </span>
          <div className=" space-y-2">
            <div className="text-gray">{`ارباح شهر ${currentMonth}`}</div>
            <div className=" text-large font-semibold tracking-wider">{`500 جنيه`}</div>
          </div>
        </div> */
}
/* chart 
<div className=" relative grid gap-10 rounded-lg border-2 border-text-color/20 px-6 pb-6 pt-10 md:gap-12 lg:col-start-1 lg:col-end-3 lg:grid-cols-2">
*/
