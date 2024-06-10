import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptJobOffer as acceptJobOfferApi } from "../../../services/client/jobOffer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function useAcceptJobOffer() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending: isLoading, mutate: acceptJobOffer } = useMutation({
    mutationKey: ["job-offers"],
    mutationFn: ({ handymanId, jobOfferId }) =>
      acceptJobOfferApi({ handymanId, jobOfferId }),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["job-offers"] });
      toast.success("تم قبول عرض العمل .");
    },
    onError: () => toast.error("لم يتم قبول عرض العمل , حاول مرة اخري."),
  });
  return { acceptJobOffer, isLoading };
}
