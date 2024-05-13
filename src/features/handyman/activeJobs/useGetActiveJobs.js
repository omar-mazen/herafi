import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../../context/Auth";
import { getAllAciveJobs } from "../../../services/handyman/activeJobs";
import { bigPageSize } from "../../../util/constatnt";

export default function useGetActiveJobs() {
  const { id } = useAuth();
  const [searcharams] = useSearchParams();
  const page = searcharams.get("page") || 1;
  const { data, isLoading } = useQuery({
    queryKey: [`active-jobs`],
    queryFn: () => getAllAciveJobs({ id, pageSize: bigPageSize, page }),
  });
  return { isLoading, data };
}
