import { useNavigate } from "react-router-dom";
import Filter from "../../../ui/Filter";
import SortBy from "../../../ui/SortBy";
import useScreenType from "../../../hooks/useScreenType";
import Modal from "../../../ui/Modal";
import FilterIcon from "../../../icons/FilterIcon";
import Pagenation from "../../../ui/Pagenation";

export default function NewJobs() {
  const screen = useScreenType();
  return (
    <Modal modalCloseScreenSize={["xl"]}>
      <div className=" container grid h-full grid-rows-[auto,1fr] gap-x-20 pt-5 lg:grid-cols-[minmax(auto,250px),1fr]">
        <div className=" my-5 flex items-center justify-between sm:my-7 md:my-10 lg:col-start-1 lg:col-end-3 lg:row-start-1">
          <h1 className=" text-h2">المهام الجديدة</h1>
          {(screen == "mobile" || screen == "sm" || screen == "md") && (
            <Modal.Open opens={"filter"}>
              <span className=" cursor-pointer rounded-full bg-text-color p-2 text-primary-background">
                <FilterIcon />
              </span>
            </Modal.Open>
          )}
        </div>
        {screen == "lg" || screen == "xl" ? (
          <FilterAndSort />
        ) : (
          <Modal.Window name={"filter"}>
            <FilterAndSort />
          </Modal.Window>
        )}
        <section className="w-full space-y-5 overflow-x-hidden pb-10 md:space-y-10 lg:col-start-2 lg:row-start-2">
          <NewJobCard />
          <NewJobCard />
          <NewJobCard />
          <NewJobCard />
          <NewJobCard />
          <Pagenation />
        </section>
      </div>
    </Modal>
  );
}
function FilterAndSort() {
  return (
    <div className="sticky top-5 h-[calc(100vh-16rem)] w-full space-y-5 overflow-y-scroll rounded-md p-1 md:col-start-1 md:row-start-2">
      <SortBy options={["joinDate", "rating"]} />
      <Filter />
    </div>
  );
}
function NewJobCard() {
  const navigate = useNavigate();
  return (
    <div
      className=" cursor-pointer space-y-5 overflow-hidden rounded-lg bg-secondary-background px-6 py-4"
      onClick={() => navigate("/handyman/job/new/2")}
    >
      <div className=" flex items-center justify-between">
        <div className="flex items-center gap-5">
          <p className=" line-clamp-1 text-h2 font-semibold">وحدة ادراج</p>
        </div>
        <span className=" text-xsmall text-primary-color">المنصورة</span>
      </div>
      <p className=" line-clamp-3 text-small">
        أود أن أطلب صندوقًا متحركًا لتخزين الأدوات والمستلزمات في مكتبي. يجب أن
        يكون الصندوق مصنوعًا من الخشب عالي الجودة ويحتوي على عجلات قابلة للتحرك
        لسهولة التنقل. يجب أن يكون الصندوق مزودًا بعدة أدراج مختلفة الأحجام
        لتنظيم الأغراض بشكل فعال. يفضل أن يكون التصميم بسيطًا وعصريًا مع لمسات
        من الخشب الطبيعي. يرجى تقديم عرض أسعار لهذا المشروع مع توضيح المواد
        المستخدمة والمدة المتوقعة للتسليم. شكرًا جزيلاً.
      </p>
      {/* <div className="flex gap-5 overflow-scroll py-5">
        <div className="w-32 min-w-32">
          <figure className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-primary-background bg-[url('/defaultImg.png')] bg-center bg-no-repeat text-text-color">
            <img
              src="/public/work1.jpeg"
              alt=""
              className=" h-full w-full object-cover object-center"
            />
          </figure>
        </div>
        <div className="w-32 min-w-32">
          <figure className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-primary-background bg-[url('/defaultImg.png')] bg-center bg-no-repeat text-text-color">
            <img
              src="/public/work2.webp"
              alt=""
              className=" h-full w-full object-cover object-center"
            />
          </figure>
        </div>
        <div className="w-32 min-w-32">
          <figure className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-primary-background bg-[url('/defaultImg.png')] bg-center bg-no-repeat text-text-color">
            <img
              src="/public/work3.jpeg"
              alt=""
              className=" h-full w-full object-cover object-center"
            />
          </figure>
        </div>
        <div className="w-32 min-w-32">
          <figure className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-primary-background bg-[url('/defaultImg.png')] bg-center bg-no-repeat text-text-color">
            <img
              src="/public/work4.jpg"
              alt=""
              className=" h-full w-full object-cover object-center"
            />
          </figure>
        </div>
        <div className="w-32 min-w-32">
          <figure className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-primary-background bg-[url('/defaultImg.png')] bg-center bg-no-repeat text-text-color"></figure>
        </div>
        <div className="w-32 min-w-32">
          <figure className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-primary-background bg-[url('/defaultImg.png')] bg-center bg-no-repeat text-text-color"></figure>
        </div>
      </div> */}
    </div>
  );
}
