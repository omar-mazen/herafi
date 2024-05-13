import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/Auth";
import { useMutation } from "@tanstack/react-query";
import { addHandymanToFavoriteList } from "../../../services/client/favorites";
import { toast } from "react-toastify";

export default function useAddToFavoriteList() {
  const { id: handymanId } = useParams();
  const { id: clientId } = useAuth();
  const { mutate } = useMutation({
    mutationKey: ["favoriteLists"],
    mutationFn: (listId) => {
      return addHandymanToFavoriteList({ clientId, handymanId, listId });
    },
    onSuccess: () => toast.success("تم اضافة الحرفي بنجاح ."),
    onError: () =>
      toast.error(
        "عذراً، يبدو أن هناك خطأ. ربما قمت بإضافة هذا الحرفي إلى القائمة مسبقاً",
      ),
  });
  return { addToFavorite: mutate };
}
