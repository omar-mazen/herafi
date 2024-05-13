import { useQuery } from "@tanstack/react-query";
import { getAciveJob } from "../../../services/handyman/activeJobs";
import { useParams } from "react-router-dom";

export default function useGetActiveJob() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: [`active-jobs`],
    queryFn: () => getAciveJob({ jobId: id }),
  });
  return { isLoading, data };
}
