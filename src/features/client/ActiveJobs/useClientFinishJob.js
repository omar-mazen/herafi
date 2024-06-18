import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { handymanFinishJob as handymanFinishJobApi } from "../../../services/handyman/activeJobs";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/Auth";
import { ClientFinishJob } from "../../../services/client/ClientActiveJobs";

export default function useClientFinishJob() {
  const { id } = useParams();
  const { id: clientId } = useAuth();
  const navigate = useNavigate();
  const { isPending: isLoading, mutate: finishJob } = useMutation({
    mutationKey: ["job-offers", id],
    mutationFn: ({ rating, comment, images }) =>
      ClientFinishJob({ clientId, jobId: id, rating, comment, images }),
    onSuccess: () => {
      toast.success("تم إنهاء المهمة بنجاح. .");
      navigate("/client");
    },
    onError: (error) =>
      toast.error(error.message || "لم يتم انهاء المهمه ,حاول مرة اخري."),
  });
  return { isLoading, finishJob };
}
