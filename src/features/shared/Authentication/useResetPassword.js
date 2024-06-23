import { useMutation } from "@tanstack/react-query";
import { resetPassword as resetPasswordApi } from "../../../services/shared/auth";
import { toast } from "react-toastify";

export default function useResetPassword() {
  const { isPending: isLoading, mutate: resetPassword } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: (message) => toast.success(message),
    onError: (error) => toast.error(error.message),
  });
  return { resetPassword, isLoading };
}
