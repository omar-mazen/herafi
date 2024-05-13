import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { deleteHandymanFromFavoriteList } from "../../../services/client/favorites";
import { useAuth } from "../../../context/Auth";
import { toast } from "react-toastify";

export default function useDeleteFromList() {
  const queryClient = useQueryClient();
  const { id: userId } = useAuth();
  const [searchParams] = useSearchParams();
  const { listId } = useParams();
  const page = searchParams.get("page") || 1;
  const { mutate, isPending: isLoading } = useMutation({
    mutationKey: ["favoriteList", listId, page],
    mutationFn: (handymanId) =>
      deleteHandymanFromFavoriteList({
        handymanId,
        clientId: userId,
        listId,
      }),
    onSuccess: () => {
      queryClient.resetQueries(["favoriteList", listId, page]);
      toast.success("تم حذف الحرفي من القائمه بنجاح.");
    },
    onError: () => toast.success("عذراً، يبدو أن هناك خطأ. حاول مرة اخري!"),
  });
  return { deleteFromList: mutate, isLoading };
}
