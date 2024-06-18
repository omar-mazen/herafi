import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getHandymanWorkHistory } from "../../../../services/handyman/workHistory";

export default function useGetWorkHistory() {
  const { id } = useParams();
  const [searcharams] = useSearchParams();
  const page = searcharams.get("page") || 1;
  const { data, isLoading } = useQuery({
    queryKey: [`handyman-${id}-workhistory`, page],
    queryFn: () => getHandymanWorkHistory({ id, page, pagination: 5 }),
  });
  return { isLoading, workHistory: data };
}
