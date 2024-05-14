import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import HandymanIcon from "../../../icons/HandymanIcon";
import MapPinIcon from "../../../icons/MapPinIcon";
import PhoneIcon from "../../../icons/PhoneIcon";
import WhatsappIcon from "../../../icons/WhatsappIcon";
import ProfilePic from "../../../ui/ProfilePic";
import HeartIcon from "../../../icons/HeartIcon";
import { useEffect } from "react";
import UserClockIcon from "../../../icons/UserClockIcon";
import StarIcon from "../../../icons/StarIcon";
import CheckCircle from "../../../icons/CheckCircle";
import HourGlass from "../../../icons/HourGlass";
import useGetUser from "../../shared/Authentication/useGetUser";
import SmallSpinner from "../../../ui/SmallSpinner";
import NotFound from "../../../ui/NotFound";
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from "date-fns";
import { imgBaseURL } from "../../../util/constatnt";
import { useAuth } from "../../../context/Auth";
import SettingIcon from "../../../icons/SettingIcon";
import FullPageLoading from "../../../ui/FullPageLoading";
import AddToFavoriteButton from "../../client/FavoriteList/AddToFavoriteButton";
import Button from "../../../ui/Button";
import PlusIcon from "../../../icons/PlusIcon";
import useGetSpecialImgs from "./special images/useGetSpecialImgs";
import Menu from "../../../ui/Menu";
import ThreeDots from "../../../icons/ThreeDots";
import PenIcon from "../../../icons/PenIcon";

export default function HandymanProfile() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { id: currentUserId, role } = useAuth();
  const isCurrentUserProfile = id == currentUserId;
  const { isLoading, getUser, user } = useGetUser();

  useEffect(() => {
    if (user?.name) document.title = user.name;
    if (!id) return;
    getUser({ id, role: "handyman" });
  }, [id]);

  if ((!id && !user?.status) || isLoading) return <FullPageLoading />;

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
          <div className=" flex gap-5">
            {user?.craft && (
              <div className="flex items-center gap-2 text-small">
                <span>
                  <HandymanIcon size={15} />
                </span>
                <h2>{user?.craft?.name}</h2>
              </div>
            )}
            {user?.address && (
              <div className="flex items-center gap-2 text-small">
                <span>
                  <MapPinIcon size={15} />
                </span>
                <span>{user?.address}</span>
              </div>
            )}
          </div>
        </div>
        <div className=" flex cursor-pointer items-center gap-2 rounded-full px-2 text-xsmall">
          {isCurrentUserProfile ? (
            <Link
              to={`/settings`}
              className=" flex aspect-square h-14 items-center justify-center rounded-full bg-secondary-background"
            >
              <SettingIcon />
            </Link>
          ) : (
            <AddToFavoriteButton />
          )}
        </div>
      </div>
      <div className=" grid grid-cols-1 grid-rows-[repeat(3,auto)] gap-5 md:grid-cols-[minmax(150px,300px),minmax(350px,1fr)] md:grid-rows-[repeat(2,auto)] md:gap-10 ">
        <ul className="10 flex items-center gap-2 border-b border-text-color/20  md:col-start-1 md:col-end-3">
          <li
            className={`relative cursor-pointer content-center ${pathname.split("/").at(-1) == "portfolio" ? "text-text-color/100 after:absolute after:bottom-0 after:left-1/2 after:h-1 after:w-full after:translate-x-[-50%] after:translate-y-[50%] after:border-b-2 after:border-primary-color" : " text-text-color/75"}`}
          >
            <Link className=" block w-full  p-4" to={"portfolio"}>
              معرض الأعمال
            </Link>
          </li>
          <li
            className={`relative cursor-pointer content-center ${pathname.split("/").at(-1) == "work_history" ? "text-text-color/100 after:absolute after:bottom-0 after:left-1/2 after:h-1 after:w-full after:translate-x-[-50%] after:translate-y-[50%] after:border-b-2 after:border-primary-color" : " text-text-color/75"}`}
          >
            <Link className=" block w-full p-4" to={"work_history"}>
              سجل الأعمال
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
            phones={user.phones}
            whatsapp={user.whatsapp}
            bio={user?.description}
            cities={user?.cities}
            doneJobs={user?.["number of done jobs"]}
            activejobs={user?.["number of real time jobs"]}
            rating={user?.rating}
            numberOfRating={user?.number_of_ratings}
            isCurrentUserProfile={isCurrentUserProfile}
          />
        </aside>
        <section className=" mt-10 h-fit w-full rounded-lg bg-secondary-background px-6 py-6 md:col-start-2 md:col-end-3 md:row-start-2 md:row-end-4 md:px-12 md:py-8">
          <Outlet />
        </section>
      </div>
    </div>
  );
}
export function About({
  joinDate,
  phones,
  whatsapp,
  cities,
  bio,
  doneJobs,
  activejobs,
  rating,
  numberOfRating,
  isCurrentUserProfile,
}) {
  const { isLoading, data: specialImgs } = useGetSpecialImgs();
  // console.log(data);
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
          <div className=" flex  items-center gap-3 text-gray">
            <span className=" flex items-center gap-3">
              <CheckCircle />
              <span>المهام المتكلة :</span>
            </span>
            <span className=" text-small text-text-color">{doneJobs || 0}</span>
          </div>
          <div className=" flex  items-center gap-3 text-gray">
            <span className=" flex items-center gap-3">
              <HourGlass />
              <span>المهام النشطة :</span>
            </span>
            <span className=" text-small text-text-color">
              {activejobs || 0}
            </span>
          </div>
          {/* contacts */}
          {phones?.map((contact, i) => (
            <div key={i} className="flex items-center gap-3 ">
              <span
                className="inline-block text-gray"
                style={{ scale: "-1", rotate: "90deg" }}
              >
                <PhoneIcon />
              </span>
              <a
                type="tel"
                href={`+2${contact.phone}`}
                className=" transition-all duration-100 ease-in-out hover:text-primary-color"
              >
                {contact.phone}
              </a>
            </div>
          ))}
          {whatsapp?.map((contact, i) => (
            <div key={i} className="flex items-center gap-3 ">
              <span className=" text-gray">
                <WhatsappIcon />
              </span>
              <a
                href={`https://wa.me/+2${contact?.whatsapp}`}
                className=" transition-all duration-100 ease-in-out hover:text-primary-color"
              >
                {contact?.whatsapp}
              </a>
            </div>
          ))}
        </div>
        {/* bio */}
        {bio && (
          <div className="space-y-3">
            <span className=" tracking-medium text-medium font-semibold">
              نبذة مختصرة :
            </span>
            <p className=" text-xsmall">{bio}</p>
          </div>
        )}
        {/* cities */}
        <div className="space-y-3">
          <span className="tracking-medium text-medium font-semibold">
            المدن المتاح للعمل بها :
          </span>
          <div className=" flex flex-wrap gap-2">
            {cities.length > 0
              ? cities.map((city, i) => (
                  <span
                    key={i}
                    className=" inline-block rounded-lg px-3 text-xsmall font-semibold backdrop-brightness-150"
                  >
                    {city?.city}
                  </span>
                ))
              : "لا يوجد"}
          </div>
        </div>
        <div className=" flex w-full items-center justify-between">
          <span className="tracking-medium text-medium font-semibold">
            الصور المميزه
          </span>
          {isCurrentUserProfile && (
            <Menu>
              <Menu.Toggle name={"specialImgs"}>
                <ThreeDots />
              </Menu.Toggle>
              <Menu.List name={"specialImgs"}>
                <Menu.Item icon={<PenIcon size={15} />}>تعديل</Menu.Item>
                <Menu.Item icon={<PlusIcon />}>اضافة</Menu.Item>
              </Menu.List>
            </Menu>
          )}
        </div>
        <div className="flex flex-wrap gap-5">
          {isLoading ? (
            <SmallSpinner />
          ) : (
            specialImgs?.map((img, i) => (
              <div className="w-24 min-w-24" key={i}>
                <figure className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-primary-background bg-[url('/defaultImg.png')] bg-center bg-no-repeat text-text-color">
                  <img
                    src={`${imgBaseURL}${img.image}`}
                    alt=""
                    className=" h-full w-full object-cover object-center"
                  />
                </figure>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

// مرحبًا، أنا عمر مازن، نجار محترف متخصص في مجال النجارة منذ عشر
//             سنوات. بدأت مسيرتي المهنية في النجارة بالعمل في السعودية حيث اكتسبت
//             خبرة قيمة، ثم انتقلت للتدريب في شركات عالمية متعددة الجنسيات. أتمتع
//             بمهارات عالية في صناعة الأثاث والأعمال الخشبية المتنوعة، وأسعى
//             دائمًا لتقديم أعمال نجارة بجودة عالية تلبي احتياجات عملائي. تابعني
//             للاطلاع على أحدث أعمالي ومشاريعي!
