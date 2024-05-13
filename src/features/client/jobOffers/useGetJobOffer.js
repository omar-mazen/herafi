import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getJobOffer } from "../../../services/client/jobOffer";

export default function useGetJobOffer() {
  const { id } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ["job-offer", id],
    queryFn: () => getJobOffer({ jobOfferId: id }),
    staleTime: Infinity,
  });
  return { data, isLoading };
}
