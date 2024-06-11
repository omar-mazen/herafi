import { useNavigate } from "react-router-dom";
import Filter from "../../../ui/Filter";
import SortBy from "../../../ui/SortBy";
import useScreenType from "../../../hooks/useScreenType";
import Modal from "../../../ui/Modal";
import FilterIcon from "../../../icons/FilterIcon";
import Pagenation from "../../../ui/Pagenation";
import useGetPendedJobs from "./useGetPendedJobs";
import FullPageLoading from "../../../ui/FullPageLoading";

export default function PendedJobs() {
  const screen = useScreenType();
  const { isLoading, data } = useGetPendedJobs();
  if (isLoading) return <FullPageLoading />;
  return (
    <div className=" container grid h-full grid-rows-[auto,1fr] gap-x-20">
      <div className=" my-5 flex items-center justify-between sm:my-7 md:my-10 lg:row-start-1">
        <h1 className=" text-h2">المهام المعلقه</h1>
      </div>
      <section className="grid h-full w-[300px] max-w-[800px] grid-rows-[1fr,auto] space-y-5 justify-self-center pb-5 sm:w-[500px]  md:w-[600px] md:space-y-10 lg:row-start-2 lg:w-[800px]">
        {data?.data?.length > 0 ? (
          <>
            <div className=" space-y-5">
              {data.data.map((job) => (
                <>
                  <PendedJobCard
                    key={job?.pending_job_id}
                    title={job?.pending_job[0]?.title}
                    description={job?.pending_job[0]?.description}
                    city={job?.pending_job[0]?.city}
                    img={job?.pending_job[0]?.image}
                    id={job?.pending_job_id}
                  />
                </>
              ))}
            </div>
            <Pagenation total={data.latestPage} />
          </>
        ) : (
          <p>لا يوجد مهام معلقة .</p>
        )}
      </section>
    </div>
  );
}
function PendedJobCard({ title, description, city, id }) {
  const navigate = useNavigate();
  return (
    <div
      className=" cursor-pointer space-y-5 overflow-hidden rounded-lg bg-secondary-background px-6 py-4"
      onClick={() => navigate(`/handyman/job/pended/${id}/`)}
    >
      <div className=" flex items-center justify-between">
        <div className="flex items-center gap-5">
          <p className=" line-clamp-1 text-h2 font-semibold">{title}</p>
        </div>
        {city && (
          <span className=" text-xsmall text-primary-color">{city}</span>
        )}
      </div>
      <p className=" line-clamp-3 max-w-[200px] sm:max-w-[400px] md:max-w-[600px]">
        {description}
      </p>
    </div>
  );
}
