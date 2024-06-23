import { useMutation } from "@tanstack/react-query";
import {
  addCities as addCitiesApi,
  updateCities,
} from "../../../services/handyman/cities";
import { toast } from "react-toastify";

export default function useAddCities() {
  const {
    mutate: addCities,
    isSuccess,
    isPending: isLoading,
  } = useMutation({
    mutationFn: updateCities,
    onError: (error) => toast.error(error.message),
  });
  return { addCities, isSuccess, isLoading };
}
