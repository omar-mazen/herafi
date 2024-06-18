import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getHandymanPortfolio } from "../../../../services/handyman/portfolio";

export default function useGetPortfolio() {
  const { id } = useParams();
  const [searcharams] = useSearchParams();
  const page = searcharams.get("page") || 1;
  const { data, isLoading } = useQuery({
    queryKey: [`handyman-${id}-portfolio`, page],
    queryFn: () => getHandymanPortfolio({ id, page, pageSize: 5 }),
  });
  return { isLoading, portfolio: data };
}
