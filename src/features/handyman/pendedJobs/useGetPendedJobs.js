import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../../context/Auth";
import { bigPageSize } from "../../../util/constatnt";
import { getAllPendedJobs } from "../../../services/handyman/pendedJobs";

export default function useGetPendedJobs() {
  const { id } = useAuth();
  const [searcharams] = useSearchParams();
  const page = searcharams.get("page") || 1;
  const { data, isLoading } = useQuery({
    queryKey: [`pended-jobs`],
    queryFn: () => getAllPendedJobs({ id, pageSize: bigPageSize, page }),
  });
  return { isLoading, data };
}
