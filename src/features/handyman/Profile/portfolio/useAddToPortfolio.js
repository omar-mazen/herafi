import { useMutation } from "@tanstack/react-query";
import { addToPortfolio as addToPortfolioApi } from "../../../../services/handyman/portfolio";
import { toast } from "react-toastify";

export default function useAddToPortfolio() {
  const {
    mutate: addToPortfolio,
    isPending: isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: addToPortfolioApi,
    onSuccess: () => toast.success("تم إضافة المشروع الي معرض الأعمال."),
    onMutate: () =>
      toast.loading("جاري إضافة المشروع الي معرض الأعمال.", {
        isLoading,
        progress: isSuccess,
        autoClose: true,
      }),
    onError: (error) =>
      toast.error(
        error.message ||
          "لقد حدث خطأ اثناء اضافة المشروع , يرجي المحاولة مرة اخري!",
      ),
  });
  return { isLoading, addToPortfolio };
}
