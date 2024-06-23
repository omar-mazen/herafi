import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getClientAciveJob } from "../../../services/client/ClientActiveJobs";

export default function useGetClientActiveJob() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: [`active-job`, id],
    queryFn: () => getClientAciveJob({ jobId: id }),
  });
  return { isLoading, data };
}
