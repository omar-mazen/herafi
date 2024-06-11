import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { handymanFinishJob as handymanFinishJobApi } from "../../../services/handyman/activeJobs";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/Auth";

export default function useFinishJob() {
  const { id } = useParams();
  const { id: handymanId } = useAuth();
  const navigate = useNavigate();
  const { isPending: isLoading, mutate: finishJob } = useMutation({
    mutationKey: ["active-job", id],
    mutationFn: ({ rating, comment }) =>
      handymanFinishJobApi({ handymanId, jobId: id, rating, comment }),
    onSuccess: () => {
      toast.success("تم إنهاء المهمة بنجاح. ننتظر تأكيد العميل على إتمامها .");
      navigate("/handyman");
    },
    onError: (error) =>
      toast.error(error.message || "لم يتم انهاء المهمه ,حاول مرة اخري."),
  });
  return { isLoading, finishJob };
}
