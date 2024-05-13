import { useMutation } from "@tanstack/react-query";
import { getUserById as getUserByIdApi } from "../../../services/shared/user";

export default function useGetUser() {
  const {
    data: user,
    mutate,
    isPending: isLoading,
  } = useMutation({
    mutationKey: ["user"],
    mutationFn: getUserByIdApi,
  });
  return { user, getUser: mutate, isLoading };
}
