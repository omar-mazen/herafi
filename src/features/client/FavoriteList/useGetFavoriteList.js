import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getFavoriteList } from "../../../services/client/favorites";
import { useAuth } from "../../../context/Auth";
import { bigPageSize } from "../../../util/constatnt";

export default function useGetFavoriteList() {
  const { id: userId } = useAuth();
  const [searchParams] = useSearchParams();
  const { listId } = useParams();
  const page = searchParams.get("page") || 1;
  const { data, isLoading, isFetched } = useQuery({
    queryKey: ["favoriteList", listId, page],
    queryFn: () =>
      getFavoriteList({
        clientId: userId,
        listId,
        pageSize: bigPageSize,
        page,
      }),
  });
  return { data, isLoading, isFetched };
}
