import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addJobOffer as addJobOfferApi } from "../../../services/client/jobOffer";

export default function useAddJobOffer() {
  const { isLoading, mutate: addJobOffer } = useMutation({
    mutationFn: addJobOfferApi,
    onSuccess: () => toast.success("تم انشاء طلبك بنجاح."),
    onError: () => toast.error("لم يتم انشاء طلبك ,حاول مرة اخري."),
  });
  return { addJobOffer, isLoading };
}
