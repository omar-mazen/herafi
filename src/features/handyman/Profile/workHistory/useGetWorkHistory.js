import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getHandymanWorkHistory } from "../../../../services/handyman/workHistory";

export default function useGetWorkHistory() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: [`handyman-${id}-workhistory`],
    queryFn: () => getHandymanWorkHistory({ id }),
  });
  return { isLoading, workHistory: data };
}
