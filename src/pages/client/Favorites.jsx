import Button from "../../ui/Button";
import PlusIcon from "../../icons/PlusIcon";
import { Link } from "react-router-dom";
import ProfilePic from "../../ui/ProfilePic";
import Modal from "../../ui/Modal";
import FormTextArea from "../../ui/FormTextArea";
import FormInput from "../../ui/FormInput";
import { useForm } from "react-hook-form";
import useGetAllFavoriteLists from "../../features/client/FavoriteList/useGetAllFavoriteLists";
import FullPageLoading from "../../ui/FullPageLoading";
import useAddFavoriteList from "../../features/client/FavoriteList/useAddFavoriteList";
export default function Favorites() {
  const { data, isLoading } = useGetAllFavoriteLists();
  if (isLoading) return <FullPageLoading />;
  return (
    <Modal>
      <div className=" container my-5">
        <div className=" flex  items-center justify-between">
          <p className="text-h1">قوائمي</p>
          <Modal.Open opens={"add list"}>
            <Button additionalStyle={" text-nowrap w-fit !px-6 !py-2"}>
              <PlusIcon />
              اضافة قائمة
            </Button>
          </Modal.Open>
        </div>
        <div className=" mt-20 grid grid-cols-[repeat(auto-fit,200px)] items-center gap-10">
          {data?.length == 0 && (
            <Modal.Open opens={"add list"}>
              <span className=" aspect-square h-full cursor-pointer rounded-lg bg-secondary-background">
                <span className=" relative flex aspect-square h-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-secondary-background transition-all duration-100 ease-in-out before:absolute before:left-1/2 before:top-1/2 before:z-[1] before:h-2 before:w-2 before:translate-x-[-50%] before:translate-y-[-50%] before:rotate-180 before:rounded-lg before:bg-text-color/10 before:transition-all before:duration-500 before:ease-in-out hover:before:h-full hover:before:w-full hover:before:rotate-0">
                  <span className=" z-[2]">
                    <PlusIcon size={30} />
                  </span>
                </span>
              </span>
            </Modal.Open>
          )}
          {data?.length > 0 &&
            data.map((list, i) => (
              <div key={i}>
                <Link
                  to={`${list.id}`}
                  className=" grid aspect-square h-full cursor-pointer grid-cols-2 grid-rows-2 content-center items-center justify-center justify-items-center rounded-lg bg-secondary-background"
                >
                  <ProfilePic size="md" />
                  <ProfilePic size="md" />
                  <ProfilePic size="md" />
                  <ProfilePic size="md" />
                </Link>
                <p className=" mt-5 text-large font-semibold">{list.title}</p>
              </div>
            ))}
        </div>
      </div>
      <Modal.Window name={"add list"}>
        <AddNewListWindow />
      </Modal.Window>
    </Modal>
  );
}
function AddNewListWindow({ onCloseModal }) {
  const {
    register,
    getValues,
    formState: { errors },
    watch,
  } = useForm({ mode: "onChange" });
  const { addFavoriteList } = useAddFavoriteList();
  return (
    <div className="sm:w-[400px]">
      <p className="mb-10 text-center text-h2">إضافة قائمة جديدة</p>
      <form className="mb-10 space-y-5">
        <FormInput
          type="string"
          label="العنوان"
          error={errors?.title}
          register={{
            ...register("title", {
              required: true,
              minLength: {
                value: 3,
                message: "يجب الا يقل العنوان عن 3 حروف.",
              },
              maxLength: {
                value: 8,
                message: "يجب الا يزيد العنوان عن 30 حرف.",
              },
            }),
          }}
        />
        <FormTextArea
          max={1000}
          label="الوصف"
          value={watch("desc")}
          error={errors?.desc}
          register={{
            ...register("desc", {
              required: true,
              minLength: {
                value: 50,
                message: "يجب الا يقل الوصف عن 50 حرف.",
              },
              maxLength: {
                value: 500,
                message: "يجب الا يزيد العنوان عن 500 حرف.",
              },
            }),
          }}
        />
      </form>
      <Button
        size="block"
        onClick={async () => {
          addFavoriteList({
            title: getValues("title"),
            description: getValues("desc"),
          });
          onCloseModal?.();
        }}
      >
        انشاء القائمه
      </Button>
    </div>
  );
}
