import { useQuery } from "@tanstack/react-query";
import { getSpecialImg } from "../../../../services/handyman/specialImages";
import { useAuth } from "../../../../context/Auth";
import { useParams } from "react-router-dom";

export default function useGetSpecialImgs() {
  // const { id } = useAuth();
  const { id } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ["specialImages", id],
    queryFn: () => getSpecialImg({ id }),
  });
  return { isLoading, data };
}
