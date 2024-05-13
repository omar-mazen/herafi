import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getJobOfferReplies } from "../../../services/client/jobOffer";
import { smallPageSize } from "../../../util/constatnt";

export default function useGetJobOfferReplies({ pageSize }) {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const { id } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ["job-offer-replay", page],
    queryFn: () => getJobOfferReplies({ jobOfferId: id, pageSize, page }),
  });
  return { data, isLoading };
}
