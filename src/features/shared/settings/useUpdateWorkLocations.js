import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateCities as updateCitiesApi } from "../../../services/handyman/cities";

export default function useUpdateWorkLocations() {
  const {
    mutate,
    isSuccess,
    isPending: isLoading,
  } = useMutation({
    mutationKey: ["user-cities"],
    mutationFn: updateCitiesApi,
    onSuccess: () => toast.success("تم تحديث أماكن العمل الخاصه بك بنجاح."),
    onMutate: () =>
      toast.loading("جاري تحديث أماكن العمل.", {
        isLoading,
        progress: isSuccess,
        autoClose: true,
      }),
    onError: (error) =>
      toast.error(
        error.message ||
          "لقد حدث خطأ اثناء تحديث أماكن العمل الخاصه بك , يرجي المحاولة مرة اخري!",
      ),
  });
  return { updateCities: mutate, isLoading };
}
