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
import SmallSpinner from "../../../../ui/SmallSpinner";
import Pagenation from "../../../../ui/Pagenation";

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
  const { portfolio, isLoading: portfolioLoading } = useGetPortfolio();
  const [images, setImages] = useState([]);
  const isCurrentUserProfile = id == currentUserId;
  console.log(portfolio);
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
        {portfolioLoading && (
          <div className="flex items-center justify-center">
            <SmallSpinner />
          </div>
        )}
        {portfolio?.portfolio.length > 0 ? (
          <>
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
            <Pagenation total={portfolio.latestPage} />
          </>
        ) : (
          !portfolioLoading && (
            <p className=" text-medium">لا يوجد مشاريع في معرض الاعمال</p>
          )
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
  console.log(imgs);
  return (
    <>
      <Modal.Open opens={title}>
        <div className=" w-full cursor-pointer space-y-5">
          <figure className=" aspect-[3/2] w-full overflow-hidden rounded-lg bg-primary-background bg-[url('/defaultImg.png')] bg-center bg-no-repeat text-text-color">
            <img
              src={imgBaseURL + imgs?.[0].image}
              // src={imgs[0]}
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
                  src={`${imgBaseURL}${img.image}`}
                  // src={img}
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
// const data2 = [
//   {
//     imgs: [
//       "/public/seat/vintage-oak-dining-table-with-built-in-attached-swing-out-seats-10.jpg",
//       "/public/seat/vintage-oak-dining-table-with-built-in-attached-swing-out-seats-12.jpg",
//       "/public/seat/vintage-oak-dining-table-with-built-in-attached-swing-out-seats-2a.jpg",
//       "/public/seat/vintage-oak-dining-table-with-built-in-attached-swing-out-seats-7.jpg",
//       "/public/seat/vintage-oak-dining-table-with-built-in-attached-swing-out-seats-8.jpg",
//       "/public/seat/vintage-oak-dining-table-with-built-in-attached-swing-out-seats-mainw-wp-700x700.jpg",
//     ],
//     title: "مقاعد خشبيه لمطعم",
//     description: `ي هذا المشروع، قمت بتصميم وتصنيع مقاعد خشبية مريحة وأنيقة خصيصاً للمطعم الخارجي. حرصت على أن تكون المقاعد متينة ومناسبة للاستخدام في الهواء الطلق، بحيث توفر الراحة الكاملة للزبائن أثناء تناول الطعام.
// لقد التزمت بمواعيد التسليم المحددة بدقة، مما يعكس جديتي واحترافيتي في إدارة الوقت وإنجاز المشاريع في الإطار الزمني المحدد.
// استخدمت في هذا المشروع أفضل الخامات المستوردة ذات الجودة العالية، التي تتميز بمقاومتها للعوامل الجوية وضمانها للاستدامة والمتانة لفترات طويلة.
// كان الاهتمام بالتفاصيل الدقيقة من الأولويات الرئيسية في هذا المشروع. بدءًا من اختيار التصميم الذي يتناسب مع جماليات المكان وأسلوب المطعم، مروراً بتنفيذ التصنيع بجودة عالية، وانتهاءً بالتأكد من راحة الزبائن وتجربتهم المميزة عند استخدام المقاعد.
// أسفر هذا الجهد المشترك عن إنتاج مقاعد خشبية تجمع بين المتانة والجمال، ما أضاف لمسة جمالية راقية للمطعم الخارجي وعزز من راحة الزبائن أثناء تناول الطعام في الهواء الطلق.`,
//   },
//   {
//     imgs: [
//       "/public/dol/814Rm3GmddL._AC_SX569_.jpg",
//       "/public/dol/81aJDdmVPdL._AC_SX569_.jpg",
//       "/public/dol/81nAtR+GpmL._AC_SX569_.jpg",
//     ],
//     title: "تصميم وتركيب خزانة ملابس",
//     description: `
//     في هذا المشروع، قمت بتصميم وتركيب خزانة ملابس مخصصة لغرفة الملابس في منزل العميل، مع التركيز على الجمع بين العملية والجمالية لتلبية احتياجات التخزين بشكل مثالي.
// تم الالتزام الكامل بالمواعيد المحددة لتنفيذ المشروع، مما يعكس جديتي واحترافيتي في إدارة الوقت وإنجاز العمل في الإطار الزمني المتفق عليه.
// حرصت على استخدام أفضل الخامات المستوردة ذات الجودة العالية، لضمان متانة الخزانة وجمالها، وكذلك قدرتها على تحمل الاستخدام اليومي لفترات طويلة دون التأثير على شكلها أو وظيفتها.
// كان الاهتمام بالتفاصيل الدقيقة من أولويات هذا المشروع. بدءًا من تصميم الخزانة بأبعاد تتناسب مع المساحة المتاحة واحتياجات العميل الشخصية، مرورًا بتنفيذ التصنيع بجودة عالية، وانتهاءً بتركيب الخزانة بشكل متقن ودقيق وفقًا للمواصفات المطلوبة.
// أسفر المشروع عن خزانة ملابس مخصصة تجمع بين الجمالية والعملية، مما أضاف لمسة أنيقة لغرفة الملابس وساهم في تلبية احتياجات التخزين للعميل بشكل مثالي. تم التركيب بدقة واحترافية لضمان الاستفادة القصوى من المساحة المتاحة وتحقيق الراحة والسهولة في الاستخدام اليومي.
// هذا المشروع، الذي تم تنفيذه كعمل حر، يعكس خبرتي في تصميم وتركيب خزائن الملابس المخصصة، ويبرز قدرتي على تقديم حلول تخزين متميزة تلبي احتياجات العملاء بدقة وفعالية.
//     `,
//   },
//   {
//     imgs: ["/public/door/images.jpeg"],
//     title: "تصميم وتركيب باب خشبي",
//     description: `
//     في هذا المشروع، توليت مسؤولية تصميم وتركيب باب خشبي فاخر للمدخل الرئيسي في المنزل. الهدف كان إنشاء باب يجمع بين الأناقة والعملية، ويعكس طابع الفخامة والجمالية للمنزل.
// تم تنفيذ المشروع وفق جدول زمني محدد بدقة، مما يبرز التزامي بالمواعيد وتسليم العمل في الوقت المتفق عليه دون أي تأخير.
// اعتمدت في هذا المشروع على استخدام أفضل الخامات المستوردة ذات الجودة العالية لضمان متانة الباب ومقاومته للعوامل البيئية المختلفة، بالإضافة إلى الحفاظ على مظهره الفاخر لفترة طويلة.
// كان التركيز على التفاصيل الدقيقة جزءًا أساسيًا من عملي. بدءًا من تصميم الباب بأسلوب يتناسب مع هيكل المنزل والديكور الداخلي والخارجي، مروراً بتنفيذ التصنيع بجودة عالية، وانتهاءً بتركيب الباب بشكل محكم لضمان وظيفته العملية وجماله.
// أثمرت هذه الجهود عن باب خشبي فاخر يعكس الفخامة والجمالية المطلوبة، ويضيف لمسة راقية للمدخل الرئيسي للمنزل. تم التركيب بدقة واحترافية لضمان أن يكون الباب عمليًا وآمنًا، مع الحفاظ على طابع الفخامة الذي يتناسب مع الديكور العام للمنزل.
//     `,
//   },
//   {
//     imgs: [
//       "/public/desk/ezgif.com-webp-to-jpg-converter (1).jpg",
//       "/public/desk/ezgif.com-webp-to-jpg-converter (2).jpg",
//       "/public/desk/ezgif.com-webp-to-jpg-converter (3).jpg",
//     ],
//     title: "تصميم وتصنيع مكتب عمل خشبي",
//     description: `
// في هذا المشروع، قمت بتصميم وتصنيع مكتب عمل خشبي مخصص لمكتب العميل المنزلي، بهدف تحقيق التوازن بين التصميم العصري والوظيفي لتلبية احتياجات العمل اليومية والانسجام مع ديكور المكتب.
// التزمت بتنفيذ المشروع وفق الجدول الزمني المحدد، مما يعكس احترافيتي وجديتي في تسليم العمل في الوقت المتفق عليه دون أي تأخير.
// اعتمدت في تصنيع المكتب على استخدام مواد خشبية مستوردة ذات جودة عالية، لضمان المتانة والاستدامة، إضافة إلى مظهر جمالي يتناسب مع التصميم العصري المطلوب.
// كان الاهتمام بالتفاصيل الدقيقة من أهم جوانب هذا المشروع. بدءًا من تصميم المكتب بأبعاد تناسب مساحة المكتب ومتطلبات العميل الشخصية، مرورًا بتنفيذ التصنيع بجودة عالية، وانتهاءً بتركيب المكتب بشكل دقيق وفقًا للمواصفات المطلوبة لضمان وظيفته المثلى.
// أسفر هذا الجهد عن مكتب عمل خشبي يجمع بين الجمالية العصرية والعملية، مما أضاف لمسة راقية ومميزة لمكتب العميل المنزلي. تم تصميم وتصنيع المكتب بحيث يوفر الراحة والفعالية في الاستخدام اليومي، مما يعكس خبرتي في تصميم وتصنيع الأثاث الخشبي المخصص.
// هذا المشروع يعكس التزامي بالجودة والاهتمام بالتفاصيل، ويبرز قدرتي على تقديم حلول تصميم مخصصة تلبي احتياجات العملاء بدقة وفعالية.
//     `,
//   },
//   {
//     imgs: [
//       "/public/bed/Dos-King-Bed-Frame.jpg",
//       "/public/bed/image-hadley-high-footend-wooden-bed-frame-1200x1200.jpg",
//     ],
//     title: "تصميم وتنفيذ سرير خشبي",
//     description: `
//     في هذا المشروع، توليت تصميم وتنفيذ سرير خشبي مخصص يلبي تفضيلات العميل الشخصية، مع التركيز على الجمع بين العملية والجمالية لضمان الراحة والجودة العالية.
// تم تنفيذ المشروع بدقة وفق الجدول الزمني المحدد، مما يعكس احترافيتي في إدارة الوقت والالتزام بتسليم العمل في الموعد المتفق عليه.
// استخدمت في تصنيع السرير أفضل الخامات المستوردة ذات الجودة العالية، لضمان المتانة والاستدامة، بالإضافة إلى تحقيق مظهر جمالي يليق بتفضيلات العميل.
// كان الاهتمام بالتفاصيل الدقيقة محور اهتمامي في هذا المشروع. بدءًا من تصميم السرير بأبعاد تتناسب مع احتياجات العميل وتفضيلاته الشخصية، مرورًا بتنفيذ التصنيع بجودة عالية، وانتهاءً بتركيب السرير بشكل متقن ودقيق لضمان وظيفته المثلى وراحته.
// أثمرت هذه الجهود عن سرير خشبي مخصص يجمع بين الجمالية والعملية، مما أضاف لمسة راقية ومميزة لغرفة النوم. تم تصميم وتنفيذ السرير ليضمن الراحة القصوى والمتانة، مما يعكس خبرتي في تصميم وتنفيذ الأثاث الخشبي المخصص.
// هذا المشروع يعكس التزامي بالجودة والاهتمام بالتفاصيل، ويبرز قدرتي على تقديم حلول تصميم مخصصة تلبي احتياجات العملاء بدقة وفعالية، مما يضمن رضاهم التام عن النتيجة النهائية.`,
//   },
// ];
