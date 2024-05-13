import { useAuth } from "../../../../context/Auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteSpecialImg as deleteSpecialImgApi } from "../../../../services/handyman/specialImages";

export default function useAddSpecialImgs() {
  const { id } = useAuth();
  const queryClient = useQueryClient();
  const { mutate, isPending: isLoading } = useMutation({
    mutationKey: ["specialImages"],
    mutationFn: (imgId) => deleteSpecialImgApi({ handymanId: id, imgId }),
    onSuccess: () => {
      toast.success("تم حذف الصورة من صورك المميزه.");
      queryClient.refetchQueries(["specialImages"]);
    },
    onError: () =>
      toast.error(
        " لقد حدث خطأ ما, لم يتم حذف الصورة من صورك المميزه. يرجي المحاوله مرة اخري !",
      ),
  });
  return { deleteSpecialImg: mutate, isLoading };
}
