import { useMutation } from "@tanstack/react-query";
import { completeInfo } from "../../../../services/handyman/handyman";

export default function useCompleteHandymanInfo() {
  const {
    mutate: completeHandymanInfo,
    isSuccess,
    isPending: isLoading,
  } = useMutation({
    mutationFn: completeInfo,
  });
  return { completeHandymanInfo, isSuccess, isLoading };
}
