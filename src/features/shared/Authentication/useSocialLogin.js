import { useMutation } from "@tanstack/react-query";
import { facebookLogin, googleLogin } from "../../../services/shared/auth";

export default function useSocialLogin() {
  const { isPending: isLoading, mutate } = useMutation({
    mutationFn: async ({ data, type }) => {
      if (type == "facebook") await facebookLogin(data);
      else await googleLogin(data);
    },
    onSuccess: () => window.location.reload(),
    onError: (error) => console.log(error.message),
  });
  return { socilaLogin: mutate, isLoading };
}
