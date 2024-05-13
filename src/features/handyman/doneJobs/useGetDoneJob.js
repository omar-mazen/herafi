import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getDoneJob } from "../../../services/handyman/doneJobs";

export default function useGetDoneJob() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: [`done-job`],
    queryFn: () => getDoneJob({ jobId: id }),
  });
  return { isLoading, data };
}
