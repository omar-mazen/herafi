import { useParams } from "react-router-dom";
import XIcon from "../../../../icons/XIcon";
import Button from "../../../../ui/Button";
import { useAuth } from "../../../../context/Auth";
import { useForm } from "react-hook-form";
import useAddToPortfolio from "./useAddToPortfolio";
import { useState } from "react";
import Modal from "../../../../ui/Modal";
import PlusIcon from "../../../../icons/PlusIcon";
import CameraIcon from "../../../../icons/CameraIcon";
import FormTextArea from "../../../../ui/FormTextArea";
import FormInput from "../../../../ui/FormInput";
import useGetPortfolio from "./useGetPortfolio";
import { imgBaseURL } from "../../../../util/constatnt";

export function Portfolio() {
  const { id } = useParams();
  const { id: currentUserId } = useAuth();
  const {
    register,
    formState: { errors },
    getValues,
    watch,
  } = useForm({ mode: "onChange" });
  const { addToPortfolio, isLoading } = useAddToPortfolio();
  const { portfolio } = useGetPortfolio();
  const [images, setImages] = useState([]);
  const isCurrentUserProfile = id == currentUserId;
  return (
    <Modal bottomSheetScreens={[]}>
      <div className="h-fit w-full space-y-8">
        <div className="mb-10 flex items-center justify-between">
          <span className=" text-h2 tracking-wider">معرض الاعمال</span>
          {isCurrentUserProfile && (
            <Modal.Open opens={"addToPortfolio"}>
              <span className="inline-block cursor-pointer rounded-full bg-primary-color p-2">
                <PlusIcon />
              </span>
            </Modal.Open>
          )}
        </div>
        {portfolio?.portfolio.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,250px))] gap-10 ">
            {portfolio?.portfolio?.map((portfolio, i) => (
              <PortfolioElement
                key={i}
                imgs={portfolio.images}
                title={portfolio.title}
                description={portfolio.description}
              />
            ))}
          </div>
        ) : (
          <p className=" text-medium">لا يوجد مشاريع في معرض الاعمال</p>
        )}
      </div>
      <Modal.Window name={"addToPortfolio"}>
        <div className=" sm:w-[500px]">
          <p className="mb-10 text-center text-h2">
            إضافة عمل جديد لمعرض الاعمال
          </p>
          <form className="space-y-5">
            <FormInput
              type="text"
              label="العنوان"
              error={errors?.title}
              register={{
                ...register("title", {
                  required: true,
                  minLength: {
                    value: 8,
                    message: "يجب الا يقل العنوان عن 8 حروف.",
                  },
                  maxLength: {
                    value: 30,
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
                    value: 100,
                    message: "يجب الا يقل الوصف عن 100 حرف.",
                  },
                  maxLength: {
                    value: 1000,
                    message: "يجب الا يزيد العنوان عن 1000 حرف.",
                  },
                }),
              }}
            />
          </form>
          <p className=" my-5 text-large">إضافة صور</p>
          <div
            style={{
              gridTemplateColumns: `repeat(${images.length + 1},100px)`,
            }}
            className="grid grid-rows-[100px] gap-5 overflow-y-hidden overflow-x-scroll pb-5 "
          >
            <div
              className=" relative h-full w-full cursor-pointer overflow-hidden rounded-lg bg-secondary-background "
              disabled={images.length >= 5}
              style={{ opacity: `${images.length >= 5 ? "50%" : "100%"}` }}
            >
              <div className="flex h-full w-full items-center justify-center">
                <span className="flex aspect-square h-16 items-center justify-center rounded-full bg-primary-color">
                  <CameraIcon size={15} />
                </span>
              </div>
              <input
                type="file"
                accept="image/png, image/jpeg"
                style={{ opacity: "0" }}
                className=" absolute left-0 top-0 h-full w-full cursor-pointer overflow-hidden opacity-0"
                title=""
                disabled={images.length >= 5}
                onChange={(e) => {
                  const files = e.target.files;
                  for (const file of files) {
                    if (images.length >= 5) return;
                    setImages((imgs) => {
                      if (imgs?.length < 5)
                        return [
                          ...imgs,
                          { img: file, imgPreview: URL.createObjectURL(file) },
                        ];
                      else return imgs;
                    });
                  }
                }}
              />
            </div>
            {images?.map((img, i) => (
              <div key={i} className="relative px-1">
                <img
                  src={img.imgPreview}
                  className=" h-[100px] w-[100px] rounded-xl object-cover"
                />
                <span
                  className=" absolute right-1 top-1 cursor-pointer rounded-full bg-[rgb(0,0,0,0.5)] p-1 text-white"
                  onClick={() => {
                    setImages((imgs) =>
                      imgs.filter((x) => x.imgPreview != img.imgPreview),
                    );
                  }}
                >
                  <XIcon size={15} />
                </span>
              </div>
            ))}
          </div>
          <Button
            disabled={
              isLoading || errors?.title || errors?.desc || images.length < 1
            }
            onClick={() =>
              addToPortfolio({
                id,
                title: getValues("title"),
                description: getValues("desc"),
                images: images?.reduce(
                  (prev, current) =>
                    prev.length > 0 ? [...prev, current?.img] : [current?.img],
                  [],
                ),
              })
            }
          >
            اضافة
          </Button>
        </div>
      </Modal.Window>
    </Modal>
  );
}

function PortfolioElement({ imgs, title, description }) {
  return (
    <>
      <Modal.Open opens={title}>
        <div className=" w-full cursor-pointer space-y-5">
          <figure className=" aspect-[3/2] w-full overflow-hidden rounded-lg bg-primary-background bg-[url('/defaultImg.png')] bg-center bg-no-repeat text-text-color">
            <img
              src={imgBaseURL + imgs?.[0].image}
              alt={` صورة ${title}`}
              className=" h-full w-full object-cover object-center"
            />
          </figure>
          <p className="line-clamp-2 w-44 min-w-44 sm:w-52 sm:min-w-52 md:w-60 md:min-w-60 lg:w-72 lg:min-w-72">
            {title}
          </p>
        </div>
      </Modal.Open>
      <Modal.Window name={title}>
        <div className="max-w-[500px]">
          <p className="text-center text-h2">{title}</p>
          <div className="flex flex-col items-center gap-5 py-10">
            {imgs?.map((img, i) => (
              <figure
                key={i}
                className=" aspect-[3/2] w-full min-w-[200px] overflow-hidden rounded-lg bg-primary-background bg-[url('/defaultImg.png')] bg-center bg-no-repeat text-text-color"
              >
                <img
                  src={imgBaseURL + img.image}
                  alt={` صورة ${title}`}
                  className=" h-full w-full object-cover object-center"
                />
              </figure>
            ))}
            <div className=" self-start">
              <p className=" my-5 text-medium font-semibold">وصف المشروع:</p>
              <p className=" font-light leading-relaxed tracking-wider">
                {description || ""}
              </p>
            </div>
          </div>
        </div>
      </Modal.Window>
    </>
  );
}
