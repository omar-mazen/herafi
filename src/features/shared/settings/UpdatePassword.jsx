import { useForm } from "react-hook-form";
import Button from "../../../ui/Button";
import FormInput from "../../../ui/FormInput";

export default function UpdatePassword() {
  const {
    register,
    reset,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm({ mode: "onChange" });
  //   const { isLoading, updatePassword } = useUpdatePassword();
  function onSubmit({ oldPassword, newPassword, confirmPassword }) {
    // updatePassword(
    //   {
    //     oldPassword,
    //     password: newPassword,
    //     cPassword: confirmPassword,
    //   },
    //   { onSuccess: reset },
    // );
  }
  return (
    <section>
      <h2 className="mb-10 text-h2">تحديث كلمة المرور</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-[400px] flex-col gap-5"
      >
        {/* old password */}
        <FormInput
          label="كلمة المرور القديمة"
          type={"password"}
          value={getValues("oldPassword")}
          error={errors.oldPassword}
          placeholder="Old password"
          register={{
            ...register("oldPassword", {
              required: { value: true, message: "كلمة المرور مطلوبة." },
            }),
          }}
        />
        {/* new password */}
        <FormInput
          label={"كلمة المرور الجديدة"}
          type={"password"}
          value={getValues("newPassword")}
          error={errors.newPassword}
          placeholder="New password"
          register={{
            ...register("newPassword", {
              required: { value: true, message: "كلمة المرور مطلوبة." },
              minLength: {
                value: 8,
                message: "يجب الا تقل كلمة المرور عن 8 حروف.",
              },
              maxLength: {
                value: 30,
                message: "يجب الا تزيد كلمة المرور عن 8 حروف.",
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                message: "يجب ان تتضمن كلمة المرور رمز '! @ $ % ^ & *'.",
              },
            }),
          }}
        />
        {/* confirm password */}
        <FormInput
          type={"password"}
          label="تأكيد كلمة المرور"
          value={getValues("confirmPassword")}
          error={errors.confirmPassword}
          placeholder="Confirm password"
          register={{
            ...register("confirmPassword", {
              required: { value: true, message: "كلمة المرور مطلوبة." },
              minLength: {
                value: 8,
                message: "Please enter at least 8 characters for password. ",
              },
              maxLength: {
                value: 30,
                message: "Password must not longer than 30 characters.",
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                message:
                  "must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number, Can contain special characters",
              },
              validate: (value) =>
                value === getValues("newPassword") || "password should match",
            }),
          }}
        />
        <div className="flex justify-end">
          <Button
            type={"submit"}
            additionalStyle={`mt-5`}
            // disabled={
            //   isLoading ||
            //   Object.keys(errors).length ||
            //   !getValues("oldPassword") ||
            //   !getValues("newPassword") ||
            //   !getValues("confirmPassword")
            // }
          >
            تحديث
          </Button>
        </div>
      </form>
    </section>
  );
}
