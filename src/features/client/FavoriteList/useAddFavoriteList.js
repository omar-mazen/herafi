import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFavoriteList as addFavoriteListApi } from "../../../services/client/favorites";
import { useAuth } from "../../../context/Auth";
import { toast } from "react-toastify";

export default function useAddFavoriteList() {
  const { id } = useAuth();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["favoriteLists"],
    mutationFn: ({ title, description }) => {
      addFavoriteListApi({ id, title, description });
      queryClient.refetchQueries({ queryKey: ["favoriteLists"] });
    },
    onSuccess: () => toast.success("تم اضافة القائمة الي قوائمك بنجاح."),
    onError: () => toast.error("لم يتم اضافة القائمة ,حاول مره اخري!"),
  });
  return { addFavoriteList: mutate };
}
