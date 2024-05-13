import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../../context/Auth";
import { giveOffer as giveOfferApi } from "../../../services/handyman/jobOffer";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function useAddOffer() {
  const { id: handymanId } = useAuth();
  const { id: jobOfferId } = useParams();
  const {
    mutate: giveOffer,
    isSuccess,
    isPending: isLoading,
  } = useMutation({
    mutationFn: ({ description, type_of_pricing, offered_price }) =>
      giveOfferApi({
        handymanId,
        jobOfferId,
        description,
        type_of_pricing,
        offered_price,
      }),
    onSuccess: () => toast.success("تم تقديم عرضك بنجاح"),
    onError: (error) => toast.error(error.message),
  });
  return { giveOffer, isSuccess, isLoading };
}
