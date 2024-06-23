import MapPinIcon from "../../../icons/MapPinIcon";
import Button from "../../../ui/Button";
import { format } from "date-fns";
import PhoneIcon from "../../../icons/PhoneIcon";
import UserIcon from "../../../icons/UserIcon";
import FullPageLoading from "../../../ui/FullPageLoading";
import Modal from "../../../ui/Modal";
import Rating from "../../../ui/Rating";
import TextArea from "../../../ui/TextArea";
import { useState } from "react";
import { imgBaseURL } from "../../../util/constatnt";
import useClientFinishJob from "./useClientFinishJob";
import CameraIcon from "../../../icons/CameraIcon";
import XIcon from "../../../icons/XIcon";
import useGetClientActiveJob from "./useClientActiveJob";
import ProfilePic from "../../../ui/ProfilePic";
import WhatsappIcon from "../../../icons/WhatsappIcon";
import { Link } from "react-router-dom";

export default function ClientActiveJob() {
  const { isLoading, data } = useGetClientActiveJob();
  const { finishJob, isLoading: finishingJob } = useClientFinishJob();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  if (isLoading) return <FullPageLoading />;
  console.log(data);
  return (
    <Modal>
      <div className="container mt-10 grid h-full w-full items-start space-y-10 divide-text-color/20 md:mt-0 md:grid-cols-[1fr,300px] md:space-y-0 md:divide-x">
        <div className="relative h-full rounded-lg border-2 border-text-color/20 px-6 pb-4 pt-8 md:col-start-2 md:row-start-1 md:border-0 md:px-8 md:pb-0 md:pt-10">
          <p className="absolute right-6 top-0 mb-5 translate-y-[-50%] bg-primary-background px-2 text-medium md:relative md:right-0 md:translate-y-0 md:pl-0 md:text-h3">
            معلومات عن الحرفي
          </p>

          <div className="space-y-3">
            <Link
              to={`/handyman/${data?.craftsman_data?.[0]?.id}`}
              className=" flex  items-center gap-3"
            >
              <span className=" flex items-center gap-3">
                <ProfilePic
                  src={
                    data?.craftsman_data?.[0]?.img
                      ? imgBaseURL + data?.craftsman_data?.[0]?.name
                      : null
                  }
                />
              </span>
              <span className=" text-small text-text-color">
                {data?.craftsman_data?.[0]?.name}
              </span>
            </Link>
            {data?.craftsman_data?.[0]?.phones.length > 0 &&
              data?.craftsman_data?.[0]?.phones.map((phone) => (
                <div
                  key={phone.phone}
                  className=" flex  items-center gap-3 text-gray"
                >
                  <span
                    style={{ scale: "-1", rotate: "90deg" }}
                    className=" flex items-center gap-3"
                  >
                    <PhoneIcon />
                  </span>
                  <span>رقم الهاتف :</span>
                  <a
                    href={`tel:+2${phone.phone}`}
                    className=" text-small text-text-color"
                  >
                    {phone.phone}
                  </a>
                </div>
              ))}
            {data?.craftsman_data?.[0]?.whatsapp.length > 0 &&
              data?.craftsman_data?.[0]?.whatsapp.map((phone) => (
                <div
                  key={phone.phone}
                  className=" flex  items-center gap-3 text-gray"
                >
                  <span className=" flex items-center gap-3">
                    <WhatsappIcon />
                  </span>
                  <span>رقم الهاتف :</span>
                  <a
                    href={`tel:+2${phone.phone}`}
                    className=" text-small text-text-color"
                  >
                    {phone.phone}
                  </a>
                </div>
              ))}
          </div>
        </div>
        <div className="relative grid h-full w-full content-baseline rounded-lg border-2 border-text-color/20 px-6 pt-8 md:col-start-1 md:row-start-1 md:border-0 md:px-0 md:pb-0 md:pl-6 md:pt-10">
          <p className="mb-5 bg-primary-background px-2 text-medium md:hidden md:text-h3 mb:absolute mb:right-6 mb:top-0 mb:translate-y-[-50%]">
            تفاصيل المهمه
          </p>
          <div className="flex items-center justify-between">
            <p className=" text-h2 ">{data?.title}</p>
            <Modal.Open opens={"finsh"}>
              <Button
                additionalStyle={` text-nowrap py-2  ${data?.is_finished == "yes" ? "!px-3 w-fit text-xsmall" : ""}`}
                disabled={data?.is_finished == "yes"}
              >
                {data?.is_finished == "yes"
                  ? "لم يقم الحرفي بالانهاء"
                  : "انهاء"}
              </Button>
            </Modal.Open>
          </div>
          <div className="mt-10">
            <span className="inline-block text-gray">السعر:</span>
            <span className=" inline-block pr-3 text-primary-color">
              {data?.price}
              <span className=" text-gray">لكل {data?.type_of_pricing}</span>
            </span>
          </div>
          <div className="my-5 grid w-fit grid-cols-[auto,auto] items-center gap-5">
            {data?.start_date && (
              <>
                <span className="text-gray">تاريخ البدأ</span>
                <input
                  type="date"
                  placeholder="dd-mm-yyyy"
                  disabled
                  value={format(data?.start_date, "yyyy-MM-dd")}
                  className="!cursor-default appearance-none rounded-lg bg-secondary-background px-4 py-2 text-medium text-opacity-100 !opacity-100"
                />
              </>
            )}
            {data?.end_date && (
              <>
                <span className="text-gray">تاريخ الانتهاء</span>
                <input
                  type="date"
                  disabled
                  placeholder="dd-mm-yyyy"
                  value={format(data?.end_date, "yyyy-MM-dd")}
                  className="!cursor-default appearance-none rounded-lg bg-secondary-background px-4 py-2 text-medium text-opacity-100  !opacity-100 "
                />
              </>
            )}
          </div>
          <div className="mb-5">
            <span className="text-gray">الوصف:</span>
            <p className="mt-5">{data?.description}</p>
          </div>
          <div className="flex gap-5 overflow-scroll py-2">
            {data?.images?.map((img, i) => (
              <div key={i} className="w-32 min-w-32">
                <figure className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-primary-background bg-[url('/defaultImg.png')] bg-center bg-no-repeat text-text-color">
                  <img
                    src={`${imgBaseURL}${img.image}`}
                    alt=""
                    className=" h-full w-full object-cover object-center"
                  />
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal.Window name={"finsh"}>
        <div className="max-w-[420px] space-y-10">
          <p className="text-center text-h3">تقيمك للحرفي</p>
          <Rating rating={rating} setRating={setRating} size={30} />
          <TextArea min={1} value={comment} setValue={setComment} />
          <div
            style={{
              gridTemplateColumns: `repeat(${images.length + 1},100px)`,
            }}
            className="grid max-w-[410px] grid-rows-[100px] gap-5 overflow-y-hidden overflow-x-scroll pb-5 "
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
            size="block"
            disabled={finishingJob}
            onClick={() => {
              finishJob({
                comment,
                rating,
                images: images.map((image) => image.img),
              });
            }}
          >
            انهاء
          </Button>
        </div>
      </Modal.Window>
    </Modal>
  );
}
