import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../../../services/shared/auth";
import { useAuth } from "../../../context/Auth";
import { deleteCookie } from "../../../util/helper";

export default function useLogout() {
  const { role } = useAuth();
  const queryClient = useQueryClient();
  const { isPending: isLoading, mutate: logout } = useMutation({
    mutationFn: async () => {
      queryClient.clear();
      await deleteCookie("token");
      window.location.reload();
    },
  });
  return { logout, isLoading };
}
