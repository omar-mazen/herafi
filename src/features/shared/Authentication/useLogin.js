import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../../services/shared/auth";
import { toast } from "react-toastify";

export default function useLogin() {
  const { isPending: isLoading, mutate: login } = useMutation({
    mutationFn: loginApi,
    onSuccess: () => window.location.reload(),
    onError: (error) => toast.error(error.message),
  });
  return { login, isLoading };
}
