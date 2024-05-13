import { useForm } from "react-hook-form";
import HeartIcon from "../../../icons/HeartIcon";
import Button from "../../../ui/Button";
import FormInput from "../../../ui/FormInput";
import FormTextArea from "../../../ui/FormTextArea";
import Menu from "../../../ui/Menu";
import Modal from "../../../ui/Modal";
import PlusIcon from "../../../icons/PlusIcon";
import useGetAllFavoriteLists from "./useGetAllFavoriteLists";
import SmallSpinner from "../../../ui/SmallSpinner";
import useAddFavoriteList from "./useAddFavoriteList";
import useAddToFavoriteList from "./useAddToFavoriteList";

export default function AddToFavoriteButton() {
  const { data, isLoading, isFetched } = useGetAllFavoriteLists();
  const { addToFavorite } = useAddToFavoriteList();
  return (
    <Modal modalCloseScreenSize={[]} bottomSheetScreens={[]}>
      <Menu size="md">
        <span className=" flex aspect-square h-14 items-center justify-center rounded-full bg-secondary-background">
          <Menu.Toggle>
            <HeartIcon size={25} />
          </Menu.Toggle>
        </span>
        <Menu.List>
          <Modal.Open opens={"addList"}>
            <Menu.Item
              icon={
                <span className=" text-primary-color">
                  <PlusIcon />
                </span>
              }
            >
              <span className=" text-primary-color">اضف قائمة جديده</span>
            </Menu.Item>
          </Modal.Open>
          {isLoading ? (
            <Menu.Item>
              <span className="flex w-full items-center justify-center ">
                <SmallSpinner />
              </span>
            </Menu.Item>
          ) : isFetched && !data?.length == 0 ? (
            data.map((list, i) => (
              <Menu.Item onClick={() => addToFavorite(list.id)} key={i}>
                {list.title}
              </Menu.Item>
            ))
          ) : (
            ""
          )}
        </Menu.List>
      </Menu>
      <Modal.Window name={"addList"}>
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
