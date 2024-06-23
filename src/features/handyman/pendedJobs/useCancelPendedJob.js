import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/Auth";
import { cancelPendedJob as cancelPendedJobApi } from "../../../services/handyman/pendedJobs";

export default function useCancelPendedJob() {
  const { id: craftsmanId } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutate: cancelPendedJob, isPending: isLoading } = useMutation({
    mutationKey: [`pended-jobs`],
    mutationFn: () => cancelPendedJobApi({ craftsmanId, jobId: id }),
    onSuccess: () => navigate("/handyman/jobs/pended"),
  });
  return { isLoading, cancelPendedJob };
}
