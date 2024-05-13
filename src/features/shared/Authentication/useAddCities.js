import { useMutation } from "@tanstack/react-query";
import { addCities as addCitiesApi } from "../../../services/handyman/cities";
import { toast } from "react-toastify";

export default function useAddCities() {
  const {
    mutate: addCities,
    isSuccess,
    isPending: isLoading,
  } = useMutation({
    mutationFn: addCitiesApi,
    onError: (error) => toast.error(error.message),
  });
  return { addCities, isSuccess, isLoading };
}
