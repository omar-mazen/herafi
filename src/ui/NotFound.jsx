import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function NotFound({ message }) {
  const navigate = useNavigate();
  return (
    <div className=" flex h-full">
      <div className=" m-auto flex w-fit flex-col items-center gap-10 rounded-md bg-secondary-background px-16 py-10 shadow-2xl">
        <div className="flex flex-col items-center">
          <span className=" text-h1">⚠️</span>
          <p className=" text-h3">{message}</p>
        </div>
        <Button
          additionalStyle={`!w-[200px]`}
          onClick={() => navigate("/", { replace: true })}
        >
          الرجوع الي الصفحه الرئيسية
        </Button>
      </div>
    </div>
  );
}
