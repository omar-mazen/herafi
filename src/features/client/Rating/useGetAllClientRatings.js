import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../context/Auth";
import { useParams, useSearchParams } from "react-router-dom";
import { bigPageSize } from "../../../util/constatnt";
import { getAllClientRatings } from "../../../services/client/ClientRatings";

export default function useGetAllClientRatings() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const { isLoading, data } = useQuery({
    queryKey: ["clientRatings", id, page],
    queryFn: () => getAllClientRatings({ id, pageSize: bigPageSize, page }),
  });
  return { data, isLoading };
}
