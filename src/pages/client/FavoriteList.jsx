import { Link } from "react-router-dom";
import ProfilePic from "../../ui/ProfilePic";
import StaticRatingStars from "../../ui/StaticRatingStars";
import HandymanIcon from "../../icons/HandymanIcon";
import UserClockIcon from "../../icons/UserClockIcon";
import useGetFavoriteList from "../../features/client/FavoriteList/useGetFavoriteList";
import FullPageLoading from "../../ui/FullPageLoading";
import NotFound from "../../ui/NotFound";
import XIcon from "../../icons/XIcon";
import { imgBaseURL } from "../../util/constatnt";
import useDeleteFromList from "../../features/client/FavoriteList/useDeleteFromList";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import TrashIcon from "../../ui/TrashIcon";
import ThreeDots from "../../icons/ThreeDots";
import Menu from "../../ui/Menu";
import useDeleteList from "../../features/client/FavoriteList/useDeleteList";
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from "date-fns";

export default function FavoriteList() {
  const { isLoading, data, isFetched } = useGetFavoriteList();
  const { deleteList } = useDeleteList();
  if (isLoading) return <FullPageLoading />;
  if (isFetched && !data?.title)
    return <NotFound message={"لم يتم العثور على القائمة"}></NotFound>;
  return (
    <Modal>
      <Menu>
        <div className="container mt-10">
          <div className="flex items-center justify-between">
            <h1 className=" text-h1">{data?.title}</h1>
            <Menu.Toggle name={"delete"}>
              <ThreeDots />
            </Menu.Toggle>
            <Menu.List name={"delete"}>
              <Modal.Open opens={"deleteList"}>
                <Menu.Item icon={<TrashIcon />}>حذف القائمة</Menu.Item>
              </Modal.Open>
            </Menu.List>
          </div>
          <p className=" mt-5">{data?.description}</p>
          {data?.craftsmen?.data?.length > 0 ? (
            <div className=" mt-20 grid grid-cols-[repeat(auto-fit,220px)]  gap-10">
              {data.craftsmen.data.map((handyman, i) => (
                <HandymanCard
                  key={i}
                  handyman={handyman}
                  listName={data?.title}
                />
              ))}
            </div>
          ) : (
            <p className=" mt-10 text-large text-warning-color">
              لا يوجد اي حرفي في القائمة بعد, يُرجى إضافة حرفي ليتم عرضه في
              القائمة.
            </p>
          )}
        </div>
      </Menu>
      <Modal.Window name={"deleteList"}>
        <ConfirmDelete
          onConfirm={deleteList}
          resourceName={`قائمة ${data?.title}`}
        />
      </Modal.Window>
    </Modal>
  );
}
function HandymanCard({ handyman, listName }) {
  const {
    craftsman_id: id,
    average_rating: rating,
    craft,
    craftsman_image: img,
    craftsman_name: name,
    number_of_ratings: numberOfRatings,
    craftsman_created_at,
  } = handyman;
  const { deleteFromList } = useDeleteFromList();
  const joinDate = {
    inYear: differenceInYears(Date.now(), craftsman_created_at),
    inMonth: differenceInMonths(Date.now(), craftsman_created_at),
    inDay: differenceInDays(Date.now(), craftsman_created_at),
  };
  return (
    <>
      <div className=" relative flex w-[200px] flex-col items-start rounded-lg bg-secondary-background px-12 py-6">
        <Modal.Open opens={`delete${id}`}>
          <span className=" absolute left-4 top-4 cursor-pointer overflow-hidden rounded-full p-2 shadow-md backdrop-brightness-90 hover:text-primary-color">
            <XIcon />
          </span>
        </Modal.Open>
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
            <span className=" text-text-color">
              منضم منذ
              {joinDate?.inYear
                ? ` ${joinDate?.inYear} سنه `
                : joinDate?.inMonth
                  ? ` ${joinDate?.inMonth} شهر `
                  : ` ${joinDate?.inDay} يوم `}
            </span>
          </div>
        </div>
      </div>
      <Modal.Window name={`delete${id}`}>
        <ConfirmDelete
          onConfirm={() => deleteFromList(id)}
          resourceName={` ${name} من قائمة ${listName}`}
        />
      </Modal.Window>
    </>
  );
}
