import FormInput from "../../../ui/FormInput";
import UserIcon from "../../../icons/UserIcon";
import { useForm } from "react-hook-form";
import Button from "../../../ui/Button";
import KeyIcon from "../../../icons/KeyIcon";
import { useState } from "react";
import EnvelopeIcon from "../../../icons/EnvelopeIcon";
import CheckIcon from "../../../icons/CheckIcon";
import XIcon from "../../../icons/XIcon";
import useSignUp from "./useSignUp";
import SmallSpinner from "../../../ui/SmallSpinner";

export default function SignUpForm({ role }) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    formState: { errors },
    register,
    getValues,
    watch,
    handleSubmit,
  } = useForm({ mode: "onChange" });
  const { isLoading, signup } = useSignUp();
  const min = watch("password")?.length >= 8;
  const max = watch("password")?.length <= 30 && watch("password")?.length >= 8;
  const hasLowwerCase = /[a-z]/.test(watch("password"));
  const hasUpperCase = /[A-Z]/.test(watch("password"));
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
    watch("password"),
  );
  const hasNumber = /\d/.test(watch("password"));
  function onSubmit(data) {
    const { name, email, password, passwordConfirmation } = data;
    signup({
      name,
      email,
      password,
      passwordConfirmation,
      role: `${role == "client" ? role : "craftsman"}`,
    });
  }
  return (
    <form className=" w-full space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        type="text"
        autoComplete="name"
        required={true}
        label="إسم المستخدم"
        value={getValues("name")}
        error={errors.name}
        register={{
          ...register("name", {
            required: { value: true, message: ".هذا الحقل مطلوب" },
            minLength: {
              value: 8,
              message: "يجب الا يقل إسم المستخدم عن 8 حروف.",
            },
          }),
        }}
        icon={<UserIcon />}
      />
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
      <FormInput
        type={showPassword ? "text" : "password"}
        autoComplete="password"
        required={true}
        label="كلمة المرور"
        value={getValues("password")}
        error={errors.password}
        register={{
          ...register("password", {
            required: { value: true, message: ".هذا الحقل مطلوب" },
            minLength: 8,
            maxLength: 30,
            validate: {
              hasUpperCase: (password) => /[A-Z]/.test(password),
              hasLowerCase: (password) => /[a-z]/.test(password),
              hasSpecialChar: (password) =>
                /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
              hasNumber: (password) => /\d/.test(password),
            },
          }),
        }}
        icon={<KeyIcon />}
      />
      {watch("password")?.length > 0 &&
        Object.keys(errors?.password || {})?.length > 0 && (
          <div className="text-xsmall">
            <div
              className={`${min ? "text-success-color" : "text-warning-color"} flex gap-3`}
            >
              {min ? <CheckIcon /> : <XIcon />}
              <p>يجب الا تقل كلمة المرور عن 8 حروف.</p>
            </div>
            <div
              className={`${max ? "text-success-color" : "text-warning-color"} flex gap-3`}
            >
              {max ? <CheckIcon /> : <XIcon />}

              <p>يجب الا تزيد كلمة المرور عن 30 حرف.</p>
            </div>
            <div
              className={`${hasUpperCase ? "text-success-color" : "text-warning-color"} flex gap-3`}
            >
              {hasUpperCase ? <CheckIcon /> : <XIcon />}{" "}
              <p>يجب ان تتضمن كلمة المرور حرف كبير.</p>
            </div>
            <div
              className={`${hasLowwerCase ? "text-success-color" : "text-warning-color"} flex gap-3`}
            >
              {hasLowwerCase ? <CheckIcon /> : <XIcon />}
              <p>يجب ان تتضمن كلمة المرور حرف صغير.</p>
            </div>
            <div
              className={`${hasNumber ? "text-success-color" : "text-warning-color"} flex gap-3`}
            >
              {hasNumber ? <CheckIcon /> : <XIcon />}
              <p>يجب ان تتضمن كلمة المرور رقم.</p>
            </div>
            <div
              className={`${hasSpecialChar ? "text-success-color" : "text-warning-color"} flex gap-3`}
            >
              {hasSpecialChar ? <CheckIcon /> : <XIcon />}
              <p>{`يجب ان تتضمن كلمة المرور رمز '! @ $ % ^ & *'.`}</p>
            </div>
          </div>
        )}
      <FormInput
        type={showPassword ? "text" : "password"}
        autoComplete="passwordConfirmation"
        required={true}
        label="تأكيد كلمة المرور"
        value={getValues("passwordConfirmation")}
        error={errors.passwordConfirmation}
        register={{
          ...register("passwordConfirmation", {
            required: { value: true, message: ".هذا الحقل مطلوب" },
            validate: (passwordConfirmation) =>
              passwordConfirmation == watch("password") ||
              "لا تتطابق كلمتا المرور اللتان تم إدخالهما. يُرجى إعادة المحاولة.",
          }),
        }}
        icon={<KeyIcon />}
      />
      <div className="flex items-center gap-5">
        <input
          id="password"
          type="checkbox"
          className="cursor-pointer"
          value={showPassword}
          onClick={() => setShowPassword((status) => !status)}
        />
        <label htmlFor="password" className=" cursor-pointer select-none">
          إظهار كلمة المرور
        </label>
      </div>
      <Button
        type="submit"
        size="block"
        additionalStyle={"!mt-10"}
        disabled={
          !watch("name") ||
          !watch("email") ||
          !watch("password") ||
          !watch("passwordConfirmation") ||
          Object.keys(errors || {}).length > 0 ||
          isLoading
        }
      >
        إنشاء حساب{isLoading && <SmallSpinner />}
      </Button>
    </form>
  );
}
