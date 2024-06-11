import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getNewJob } from "../../../services/handyman/newJobs";

export default function useGetNewJob() {
  const { id } = useParams();
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [`new-job`, id],
    queryFn: () => getNewJob({ jobId: id }),
  });
  return { isLoading, data, isFetched };
}
