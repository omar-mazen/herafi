import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../../context/Auth";
import { bigPageSize } from "../../../util/constatnt";
import { getAllDoneJobs } from "../../../services/handyman/doneJobs";

export default function useGetDoneJobs() {
  const { id } = useAuth();
  const [searcharams] = useSearchParams();
  const page = searcharams.get("page") || 1;
  const { data, isLoading } = useQuery({
    queryKey: [`done-jobs`, page],
    queryFn: () => getAllDoneJobs({ id, pageSize: bigPageSize, page }),
  });
  return { isLoading, data };
}
