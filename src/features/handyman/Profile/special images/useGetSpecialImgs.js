import { useQuery } from "@tanstack/react-query";
import {
  addSpecialImg,
  getSpecialImg,
} from "../../../../services/handyman/specialImages";
import { useAuth } from "../../../../context/Auth";

export default function useGetSpecialImgs() {
  const { id } = useAuth();
  const { isLoading, data } = useQuery({
    queryKey: ["specialImages"],
    queryFn: ({ images }) => getSpecialImg({ id, images }),
  });
  return { isLoading, data };
}
