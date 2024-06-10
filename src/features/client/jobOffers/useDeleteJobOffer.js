import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJobOffer as deleteJobOfferApi } from "../../../services/client/jobOffer";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function useDeleteJobOffer() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const queryClient = useQueryClient();
  const { isPending: isLoading, mutate: deleteJobOffer } = useMutation({
    mutationKey: ["job-offers", page],
    mutationFn: (id) => deleteJobOfferApi({ jobOfferId: id }),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["job-offers", page] });
      toast.success("تم حذف طلب بنجاح.");
    },
    onError: () => toast.error("لم يتم حذف طلبك , حاول مرة اخري."),
  });
  return { deleteJobOffer, isLoading };
}
