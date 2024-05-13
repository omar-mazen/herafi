import { useQuery } from "@tanstack/react-query";
import { getAllFavoriteLists } from "../../../services/client/favorites";
import { useAuth } from "../../../context/Auth";

export default function useGetAllFavoriteLists() {
  const { id: userId } = useAuth();
  const { data, isLoading, isFetched } = useQuery({
    queryKey: ["favoriteLists"],
    queryFn: () =>
      getAllFavoriteLists({
        clientId: userId,
      }),
    staleTime: Infinity,
  });
  return { data, isLoading, isFetched };
}
