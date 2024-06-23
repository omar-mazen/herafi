import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToPortfolio as addToPortfolioApi } from "../../../../services/handyman/portfolio";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../../../context/Auth";

export default function useAddToPortfolio() {
  const queryClient = useQueryClient();
  const [searcharams] = useSearchParams();
  const page = searcharams.get("page") || 1;
  const { id } = useAuth();
  const {
    mutate: addToPortfolio,
    isPending: isLoading,
    isSuccess,
  } = useMutation({
    mutationKey: [[`portfolio`, id, page]],
    mutationFn: (data) => {
      addToPortfolioApi(data);
      queryClient.refetchQueries({ queryKey: ["portfolio", id, page] });
    },
    onSuccess: () => {
      toast.success("تم إضافة المشروع الي معرض الأعمال.");
    },
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
