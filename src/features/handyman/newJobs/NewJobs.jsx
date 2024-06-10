import { useNavigate } from "react-router-dom";
import Filter from "../../../ui/Filter";
import SortBy from "../../../ui/SortBy";
import useScreenType from "../../../hooks/useScreenType";
import Modal from "../../../ui/Modal";
import FilterIcon from "../../../icons/FilterIcon";
import Pagenation from "../../../ui/Pagenation";
import FullPageLoading from "../../../ui/FullPageLoading";
import useGetNewJobs from "./useGetNewJobs";

export default function NewJobs() {
  const screen = useScreenType();
  const { isLoading, data, isFetched } = useGetNewJobs();
  if (isLoading) return <FullPageLoading />;
  console.log(data);
  return (
    <Modal modalCloseScreenSize={["xl"]}>
      <div className=" container grid h-full grid-rows-[auto,1fr] gap-x-20 pt-5 lg:grid-cols-[minmax(auto,250px),1fr]">
        <div className=" my-5 flex items-center justify-between sm:my-7 md:my-10 lg:col-start-1 lg:col-end-3 lg:row-start-1">
          <h1 className=" text-h2">المهام التي تم انهائها</h1>
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
        <section className="grid h-full w-full grid-rows-[1fr,auto] space-y-5 pb-5 md:space-y-10 lg:col-start-2 lg:row-start-2">
          {data.data.length > 0 ? (
            <>
              <div className=" space-y-5">
                {data.data.map((job, i) => (
                  <DoneJobCard
                    key={i}
                    title={job.title}
                    description={job.description}
                    city={job.city}
                    id={job.id}
                  />
                ))}
              </div>
              <Pagenation total={data.latestPage} />
            </>
          ) : (
            <p>لايوجد مهام منتهيه.</p>
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
function DoneJobCard({ title, description, city, id }) {
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer space-y-5 overflow-hidden rounded-lg bg-secondary-background px-6 py-4"
      onClick={() => navigate(`/handyman/job/new/${id}`)}
    >
      <div className=" flex items-center justify-between">
        <div className="flex items-center gap-5">
          <p className=" line-clamp-1 text-h2 font-semibold">{title}</p>
        </div>
        {city && (
          <span className=" text-xsmall text-primary-color">{city}</span>
        )}
      </div>
      <p className=" line-clamp-3 max-w-[40ch] sm:max-w-[75ch] md:max-w-[90ch]">
        {description}
      </p>
    </div>
  );
}
