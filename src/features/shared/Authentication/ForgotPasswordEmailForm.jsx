import { Input } from "postcss";
import { createSearchParams, useNavigate } from "react-router-dom";
import Button from "../../../ui/Button";
import SmallSpinner from "../../../ui/SmallSpinner";
import useForgotPassword from "./useForgotPassword";
import { useForm } from "react-hook-form";
import FormInput from "../../../ui/FormInput";
import EnvelopeIcon from "../../../icons/EnvelopeIcon";

export default function ForgotPasswordEmailForm() {
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const { isLoading, forgotPassword } = useForgotPassword();
  function onSubmit({ email, role }) {
    forgotPassword(
      { email, role },
      {
        onSuccess: () =>
          navigate({
            pathname: "reset-password",
            search: createSearchParams({ role: getValues("role") }).toString(),
          }),
      },
    );
  }
  return (
    <>
      <form
        className="w-full max-w-[400px] space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className=" mb-8 text-xl">
          {`يرجى إدخال عنوان البريد الإلكتروني المرتبط بحسابك. سنرسل رمز التحقق إلى هذا البريد الإلكتروني. بمجرد استلامك للرمز، أدخله هنا لإعداد كلمة مرور جديدة.`}
        </p>
        <div>
          <FormInput
            type="email"
            autoComplete="email"
            required={true}
            label="البريد الإلكتروني"
            value={getValues("email")}
            error={errors.email}
            register={{
              ...register("email", {
                required: { value: true, message: ".هذا الحقل مطلوب" },
                pattern: {
                  value:
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                  message: "قم بإدخال بريد إلكتروني صالح.",
                },
              }),
            }}
            icon={<EnvelopeIcon />}
          />
        </div>
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
          size="block"
          type={"submit"}
          disabled={errors?.email || isLoading}
        >
          {isLoading ? <SmallSpinner /> : "ارسال"}
        </Button>
      </form>
    </>
  );
}
