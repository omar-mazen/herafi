import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { deleteFavoriteList } from "../../../services/client/favorites";
import { toast } from "react-toastify";

export default function useDeleteList() {
  const queryClient = useQueryClient();
  const { listId } = useParams();
  const navigate = useNavigate();
  const { mutate, isPending: isLoading } = useMutation({
    mutationKey: ["favoriteList"],
    mutationFn: () =>
      deleteFavoriteList({
        listId,
      }),
    onSuccess: () => {
      navigate("/client/favorites", { replace: true });
      queryClient.resetQueries(["favoriteLists"]);
      toast.success("تم حذف القائمه بنجاح.");
    },
    onError: () => toast.success("عذراً، يبدو أن هناك خطأ. حاول مرة اخري!"),
  });
  return { deleteList: mutate, isLoading };
}
