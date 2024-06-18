import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updatePhones } from "../../../services/handyman/phones";

export default function useUpdateContacts() {
  const {
    mutate,
    isSuccess,
    isPending: isLoading,
  } = useMutation({
    mutationKey: ["user"],
    mutationFn: updatePhones,
    onSuccess: () => toast.success("تم تحديث وسائل التواصل الخاصه بك بنجاح."),
    onMutate: () =>
      toast.loading("جاري تحديث وسائل التواصل الخاصة بك .", {
        isLoading,
        progress: isSuccess,
        autoClose: true,
      }),
    onError: (error) =>
      toast.error(
        error.message ||
          "لقد حدث خطأ اثناء تحديث وسائل التواصل الخاصه بك , يرجي المحاولة مرة اخري!",
      ),
  });
  return { updateContacts: mutate, isLoading };
}
