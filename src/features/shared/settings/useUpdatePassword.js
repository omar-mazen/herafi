import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updatePassword } from "../../../services/shared/user";

export default function useUpdatePassword() {
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => toast.success("تم تحديث كلمة المرور بنجاح."),
    onError: (error) =>
      toast.error(
        error.message ||
          "لقد حدث خطأ اثناء تحديث كلمة المرور , يرجي المحاولة مرة اخري!",
      ),
  });
  return { updatePassword: mutate, isLoading };
}
