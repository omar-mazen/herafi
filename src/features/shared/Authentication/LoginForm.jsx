import FormInput from "../../../ui/FormInput";
import UserIcon from "../../../icons/UserIcon";
import { useForm } from "react-hook-form";
import Button from "../../../ui/Button";
import KeyIcon from "../../../icons/KeyIcon";
import useLogin from "./useLogin";
import SmallSpinner from "../../../ui/SmallSpinner";

export default function LoginForm() {
  const {
    formState: { errors },
    register,
    watch,
    getValues,
    handleSubmit,
  } = useForm({ mode: "onChange" });
  const { isLoading, login } = useLogin();
  function onSubmit(data) {
    login(data);
  }
  return (
    <form className="w-full space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        type="email"
        autoComplete="email"
        required={true}
        label="البريد الإلكتروني"
        value={watch("email")}
        error={errors.email}
        register={{
          ...register("email", {
            required: { value: true, message: ".هذا الحقل مطلوب" },
            pattern: {
              value:
                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
              message: ".قم بإدخال بريد إلكتروني صالح.",
            },
          }),
        }}
        icon={<UserIcon />}
      />
      <FormInput
        type="password"
        autoComplete="password"
        required={true}
        label="كلمة المرور"
        value={watch("password")}
        error={errors.password}
        register={{
          ...register("password", {
            required: { value: true, message: ".هذا الحقل مطلوب" },
          }),
        }}
        icon={<KeyIcon />}
      />
      <div className=" flex">
        <div className="flex flex-1 items-center gap-3">
          <input
            type="radio"
            name="role"
            id="client"
            value="client"
            defaultChecked
            className=" cursor-pointer"
            {...register("role")}
          />
          <label htmlFor="client" className="cursor-pointer font-semibold">
            عميل
          </label>
        </div>
        <div className=" flex flex-1 items-center gap-3">
          <input
            type="radio"
            name="role"
            id="handyman"
            value="handyman"
            className="cursor-pointer"
            {...register("role")}
          />
          <label htmlFor="handyman" className="cursor-pointer font-semibold">
            حرفي
          </label>
        </div>
      </div>
      <Button
        type="submit"
        size="block"
        additionalStyle={"!mt-10"}
        disabled={
          !watch("email") ||
          !watch("password") ||
          Object.keys(errors || {}).length > 0 ||
          isLoading
        }
      >
        تسجيل الدخول
        {isLoading && <SmallSpinner />}
      </Button>
    </form>
  );
}
