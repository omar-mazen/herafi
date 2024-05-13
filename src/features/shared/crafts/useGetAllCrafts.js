import { useQuery } from "@tanstack/react-query";
import { getAllCrafts as getAllCraftsApi } from "../../../services/shared/crafts";

export default function useGetAllCrafts() {
  const { isLoading, data: crafts } = useQuery({
    queryKey: ["crafts"],
    queryFn: getAllCraftsApi,
    staleTime: Infinity,
  });
  return { isLoading, crafts };
}
