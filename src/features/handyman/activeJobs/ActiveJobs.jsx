import { useNavigate } from "react-router-dom";
import Filter from "../../../ui/Filter";
import SortBy from "../../../ui/SortBy";
import useScreenType from "../../../hooks/useScreenType";
import Modal from "../../../ui/Modal";
import FilterIcon from "../../../icons/FilterIcon";
import Pagenation from "../../../ui/Pagenation";
import useGetActiveJobs from "./useGetActiveJobs";
import FullPageLoading from "../../../ui/FullPageLoading";
import { imgBaseURL } from "../../../util/constatnt";

export default function ActiveJobs() {
  const screen = useScreenType();
  const { isLoading, data } = useGetActiveJobs();
  if (isLoading) return <FullPageLoading />;
  console.log(data);
  return (
    <div className=" container grid h-full grid-rows-[auto,1fr] gap-x-20 pt-5">
      <div className=" my-5 flex items-center justify-between sm:my-7 md:my-10 lg:row-start-1">
        <h1 className=" text-h2">المهام النشطه</h1>
      </div>
      <section className="grid h-full w-[300px] max-w-[800px] grid-rows-[1fr,auto] space-y-5 justify-self-center pb-5 sm:w-[500px]  md:w-[600px] md:space-y-10 lg:row-start-2 lg:w-[800px]">
        {data.data.length > 0 ? (
          <>
            <div className=" space-y-5">
              {data.data.map((job, i) => (
                <>
                  <JobCard
                    key={i}
                    id={job.id}
                    title={job.title}
                    description={job.description}
                    city={job.city}
                    img={job.image}
                  />
                </>
              ))}
            </div>
            <Pagenation total={data.latestPage} />
          </>
        ) : (
          <p>لا يوجد مهام نشطة .</p>
        )}
      </section>
    </div>
  );
}

function JobCard({ title, city, description, img, id }) {
  const navigate = useNavigate();
  return (
    <div
      className=" cursor-pointer space-y-5 overflow-hidden rounded-lg bg-secondary-background px-6 py-4"
      onClick={() => navigate(`/handyman/job/active/${id}`)}
    >
      <div className=" flex items-center justify-between">
        <div className="flex items-center gap-5">
          {img && (
            <img
              src={imgBaseURL + img}
              alt={title}
              className=" h-16 w-16 rounded-full object-cover object-center"
            />
          )}
          <p className=" line-clamp-1 text-h2 font-semibold">{title}</p>
        </div>
        <span className=" text-xsmall text-primary-color">{city}</span>
      </div>
      <p className=" line-clamp-3 max-w-[200px] sm:max-w-[400px] md:max-w-[600px]">
        {description}
      </p>
    </div>
  );
}
