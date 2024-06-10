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
    <Modal modalCloseScreenSize={["xl"]}>
      <div className=" container grid h-full grid-rows-[auto,1fr] gap-x-20 pt-5 lg:grid-cols-[minmax(auto,250px),1fr]">
        <div className=" flex items-center justify-between pb-5 lg:col-start-1 lg:col-end-3 lg:row-start-1">
          <h1 className=" text-h2">المهام النشطه</h1>
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
        <section className="grid h-full w-full grid-rows-[1fr,auto] space-y-5 pb-5 lg:col-start-2 lg:row-start-2">
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
    </Modal>
  );
}
function FilterAndSort() {
  return (
    <div className="sticky top-5 h-[calc(100vh-16rem)] w-full space-y-5 overflow-y-scroll rounded-md p-1 md:col-start-1 md:row-start-2">
      <SortBy options={["date-asc", "date-desc"]} />
      <Filter options={["location"]} />
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
      <p className=" line-clamp-3 text-small">{description}</p>
    </div>
  );
}
