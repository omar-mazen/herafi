import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPendedJob } from "../../../services/handyman/pendedJobs";

export default function useGetPendedJob() {
  const { id } = useParams();
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [`pended-jobs`],
    queryFn: () => getPendedJob({ jobId: id }),
  });
  return { isLoading, data, isFetched };
}
