import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getHandymanPortfolio } from "../../../../services/handyman/portfolio";

export default function useGetPortfolio() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: [`handyman-${id}-portfolio`],
    queryFn: () => getHandymanPortfolio({ id }),
  });
  return { isLoading, portfolio: data };
}
