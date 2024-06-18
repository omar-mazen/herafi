import { useAuth } from "../../../../context/Auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSpecialImg as addSpecialImgApi } from "../../../../services/handyman/specialImages";
import { toast } from "react-toastify";

export default function useAddSpecialImgs() {
  const { id } = useAuth();
  const queryClient = useQueryClient();
  const { mutate, isPending: isLoading } = useMutation({
    mutationKey: ["specialImages", id],
    mutationFn: (images) => addSpecialImgApi({ id, images }),
    onSuccess: () => {
      toast.success("تمت الاضافة الي صورك المميزه");
      queryClient.refetchQueries(["specialImages", id]);
    },
    onError: () =>
      toast.error(
        " لقد حدث خطأ ما, لم يتم الاضافة الي صورك المميزه. يرجي المحاوله مرة اخري !",
      ),
  });
  return { addSpecialImg: mutate, isLoading };
}
