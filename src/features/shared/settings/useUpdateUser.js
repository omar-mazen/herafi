import { useMutation } from "@tanstack/react-query";
import { updateInfo as updateInfoApi } from "../../../services/shared/user";
import { toast } from "react-toastify";

export default function useUpdateUser() {
  const {
    mutate,
    isSuccess,
    isPending: isLoading,
  } = useMutation({
    mutationKey: ["user"],
    mutationFn: updateInfoApi,
    onSuccess: () => toast.success("تم تحديث بيانتك بنجاح."),
    onMutate: () =>
      toast.loading("جاري تحديث بياناتك.", {
        isLoading,
        progress: isSuccess,
        autoClose: true,
      }),
    onError: (error) =>
      toast.error(
        error.message ||
          "لقد حدث خطأ اثناء تحديث بياناتك , يرجي المحاولة مرة اخري!",
      ),
  });
  return { updateInfo: mutate, isLoading };
}
