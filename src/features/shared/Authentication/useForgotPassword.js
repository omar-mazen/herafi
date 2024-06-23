import { useMutation } from "@tanstack/react-query";
import { forgotPassword as forgotPasswordApi } from "../../../services/shared/auth";
import { toast } from "react-toastify";

export default function useForgotPassword() {
  const { isPending: isLoading, mutate: forgotPassword } = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: (message) => toast.success(message),
    onError: (error) => toast.error(error.message),
  });
  return { forgotPassword, isLoading };
}
