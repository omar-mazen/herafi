import { useMutation } from "@tanstack/react-query";
import { signup as signUpApi } from "../../../services/shared/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function useSignUp() {
  const navigate = useNavigate();
  const { isPending: isLoading, mutate: signup } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login");
    },
    onError: (error) => toast.error(error.message),
  });
  return { signup, isLoading };
}
