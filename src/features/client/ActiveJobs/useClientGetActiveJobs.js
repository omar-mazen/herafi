import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../../context/Auth";
import { bigPageSize } from "../../../util/constatnt";
import { getAllClientAciveJobs } from "../../../services/client/ClientActiveJobs";

export default function useClientGetActiveJobs(pageSize = bigPageSize) {
  const { id } = useAuth();
  const [searcharams] = useSearchParams();
  const page = searcharams.get("page") || 1;
  const { data, isLoading } = useQuery({
    queryKey: [`job-offers`],
    queryFn: () => getAllClientAciveJobs({ id, pageSize, page }),
  });
  return { isLoading, data };
}
