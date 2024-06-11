import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../../context/Auth";
import { getAllNewJobs } from "../../../services/handyman/newJobs";
import { bigPageSize } from "../../../util/constatnt";

export default function useGetNewJobs(pageSize = bigPageSize) {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const { user } = useAuth();
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [`new-jobs`, page],
    queryFn: () =>
      getAllNewJobs({
        cities: user?.cities,
        craft: user?.craft.name,
        page,
        pageSize,
      }),
  });
  return { isLoading, data, isFetched };
}
