import { useMutation } from "@tanstack/react-query";
import { addPhones as addPhonesApi } from "../../../services/handyman/phones";
import { toast } from "react-toastify";

export default function useAddPhones() {
  const {
    mutate: addPhones,
    isSuccess,
    isPending: isLoading,
  } = useMutation({
    mutationFn: addPhonesApi,
    onError: (error) => toast.error(error.message),
  });
  return {
    addPhones,
    isSuccess,
    isLoading,
  };
}
