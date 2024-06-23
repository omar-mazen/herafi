import Button from "./Button";

export default function ConfirmDelete({
  resourceName,
  onCloseModal,
  onConfirm,
}) {
  return (
    <div className="space-y-10">
      <p className="min-w-[200px] pt-12 text-small">
        هل أنت متأكد أنك تريد حذف {resourceName} بشكل دائم؟ هذا الإجراء لا يمكن
        التراجع عنه.
      </p>
      <div className="flex justify-end gap-4">
        <Button
          type={"button"}
          size="small"
          onClick={() => {
            onConfirm();
            onCloseModal();
          }}
        >
          حذف
        </Button>
        <Button size="small" style="outline" onClick={onCloseModal}>
          إلغاء
        </Button>
      </div>
    </div>
  );
}
