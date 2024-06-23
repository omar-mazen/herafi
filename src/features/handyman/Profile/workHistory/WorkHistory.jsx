import { formatISO } from "date-fns";
import Pagenation from "../../../../ui/Pagenation";
import SmallSpinner from "../../../../ui/SmallSpinner";
import StaticRatingStars from "../../../../ui/StaticRatingStars";
import { imgBaseURL } from "../../../../util/constatnt";
import useGetWorkHistory from "./useGetWorkHistory";

export function WorkHistory() {
  const { workHistory, isLoading } = useGetWorkHistory();
  return (
    <div className="w-full space-y-8">
      <p className=" mb-10 text-h2 tracking-wider">سجل الأعمال</p>
      <div className=" space-y-10">
        {isLoading && (
          <div className="flex items-center justify-center">
            <SmallSpinner />
          </div>
        )}
        {workHistory?.workHistory.length > 0 ? (
          <>
            {workHistory?.workHistory.map((job, i) => (
              <WorkHistoryElement
                key={i}
                title={job?.title}
                review={job?.clint_rating?.[0]?.comment}
                rating={job?.clint_rating?.[0]?.rating / 5}
                imgs={job?.images?.map((img) => imgBaseURL + img.image)}
                date={formatISO(job?.created_at, { representation: "date" })}
              />
            ))}
            <Pagenation total={workHistory?.latestPage} />
          </>
        ) : (
          !isLoading && <p className=" text-medium">لا يوجد سجل اعمال</p>
        )}
      </div>
    </div>
  );
}
function WorkHistoryElement({ title, date, review, rating, imgs }) {
  return (
    <div className="rounded-lg px-6 py-4 shadow-md backdrop-brightness-110">
      <p className=" text-large font-semibold text-primary-color">{title}</p>
      <div className="flex items-center justify-between">
        <div className=" mt-2">
          <StaticRatingStars ratingPercentage={rating} />
        </div>
        <span className=" text-gray">{date}</span>
      </div>
      <p
        onClick={(e) => e.currentTarget.classList.toggle("line-clamp-3")}
        className=" group my-5 line-clamp-3 font-light"
      >
        {review}
      </p>
      {imgs.length > 0 && (
        <div
          style={{
            gridTemplateColumns: `repeat(${imgs.length},100px)`,
          }}
          className="grid grid-rows-[100px] gap-5 overflow-y-hidden overflow-x-scroll pb-5 "
        >
          {imgs?.map((img, i) => (
            <img
              key={i}
              src={img}
              className=" h-[100px] w-[100px] rounded-xl object-cover object-center"
            />
          ))}
        </div>
      )}
    </div>
  );
}
// title, date, review, rating, imgs
const data2 = [
  {
    title: "مقاعد خشبيه لمطعم",
    rating: 5,
    review: `
      لقد كانت تجربتي رائعة بكل المقاييس. قمت بالبحث عن نجار ماهر لتصميم وتصنيع مقاعد خشبية لمطعمي الخارجي، وقد تجاوزت النتائج كل توقعاتي.
المقاعد التي صممها وصنعها تتميز بمتانة عالية وجمال وأناقة واضحة، مما يعزز من جمال المطعم وأسلوبه ومريحة للغاية وتناسب تماماً احتياجات الزبائن، مما جعل تجربة تناول الطعام في الهواء الطلق ممتعة ومريحة.
    `,
    date: "15/6/2024",
    imgs: [
      "/public/seat/vintage-oak-dining-table-with-built-in-attached-swing-out-seats-10.jpg",
      "/public/seat/vintage-oak-dining-table-with-built-in-attached-swing-out-seats-12.jpg",
      "/public/seat/vintage-oak-dining-table-with-built-in-attached-swing-out-seats-2a.jpg",
      "/public/seat/vintage-oak-dining-table-with-built-in-attached-swing-out-seats-7.jpg",
      "/public/seat/vintage-oak-dining-table-with-built-in-attached-swing-out-seats-8.jpg",
      "/public/seat/vintage-oak-dining-table-with-built-in-attached-swing-out-seats-mainw-wp-700x700.jpg",
    ],
  },
  {
    title: "تصميم وتركيب خزانة ملابس",
    rating: 5,
    review: `
تعامله كان ودودًا ومحترفًا، وأظهر اهتمامًا حقيقيًا بتحقيق رضا العميل. كان متعاونًا جدًا ومرنًا في التعامل مع المتطلبات والتعديلات، وتواصل معنا بانتظام لضمان تلبية كافة احتياجاتنا. أنصح بشدة بالتعامل معه لأي شخص يبحث عن نجار محترف يقدم عملًا متقنًا بجودة عالية. شكرًا لك على العمل الرائع!    `,
    date: "10/6/2024",
    imgs: [
      "/public/dol/814Rm3GmddL._AC_SX569_.jpg",
      "/public/dol/81aJDdmVPdL._AC_SX569_.jpg",
      "/public/dol/81nAtR+GpmL._AC_SX569_.jpg",
    ],
  },
  {
    imgs: ["/public/door/images.jpeg"],
    title: "تصميم وتركيب باب خشبي",
    rating: 5,
    review: `لقد كانت تجربتي أكثر من رائعة. كنت أبحث عن نجار ماهر لتصميم وتركيب باب خشبي فاخر للمدخل الرئيسي في منزلي، وقد قام  بتنفيذ المهمة بشكل يفوق التوقعات. الباب الذي صممه وصنعه هو قطعة فنية تعكس طابع الفخامة والجمالية للمنزل بشكل مثالي. أظهر اهتماماً كبيراً بالتفاصيل، حيث تأكد من أن تصميم الباب يتناسب تماماً مع هيكل المنزل والديكور الداخلي والخارجي. عملية التركيب كانت متقنة للغاية، واستخدم مواد عالية الجودة ومتينة لضمان دوام الباب لفترة طويلة.`,

    date: "7/6/2024",
  },
  {
    imgs: [
      "/public/desk/ezgif.com-webp-to-jpg-converter (1).jpg",
      "/public/desk/ezgif.com-webp-to-jpg-converter (2).jpg",
      "/public/desk/ezgif.com-webp-to-jpg-converter (3).jpg",
    ],
    title: "تصميم وتصنيع مكتب عمل خشبي",
    rating: 5,
    review: `
لقد كان متعاونًا للغاية خلال عملية التصميم والتصنيع، حيث استمع بعناية إلى اقتراحاتي وأفكاري، ونجح في تحويلها إلى واقع ملموس بمهارة وإتقان.    `,

    date: "20/5/2024",
  },
];
