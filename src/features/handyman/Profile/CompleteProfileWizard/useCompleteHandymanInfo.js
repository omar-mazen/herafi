import { useMutation } from "@tanstack/react-query";
import { completeInfo } from "../../../../services/handyman/handyman";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function useCompleteHandymanInfo() {
  const navigate = useNavigate();
  const {
    mutate: completeHandymanInfo,
    isSuccess,
    isPending: isLoading,
  } = useMutation({
    mutationFn: completeInfo,
    onSuccess: () => {
      toast.success("تم اضافة بياناتك بنجاح");
      navigate(0);
    },
  });
  return { completeHandymanInfo, isSuccess, isLoading };
}
