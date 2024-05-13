import { useQuery } from "@tanstack/react-query";
import { getAllJobOffers } from "../../../services/client/jobOffer";
import { useAuth } from "../../../context/Auth";
import { useSearchParams } from "react-router-dom";
import { bigPageSize } from "../../../util/constatnt";

export default function useGetAllJobOffers() {
  const { id } = useAuth();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const { isLoading, data } = useQuery({
    queryKey: ["job-offers", page],
    queryFn: () => getAllJobOffers({ id, pageSize: bigPageSize, page }),
  });
  return { data, isLoading };
}
