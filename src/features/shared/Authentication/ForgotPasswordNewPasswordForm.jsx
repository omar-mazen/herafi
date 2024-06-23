import { useForm } from "react-hook-form";
import useForgotPassword from "./useForgotPassword";
import { useNavigate } from "react-router";
import { Input } from "postcss";
import Button from "../../../ui/Button";
import SmallSpinner from "../../../ui/SmallSpinner";
import useResetPassword from "./useResetPassword";
import FormInput from "../../../ui/FormInput";
import { useState } from "react";
import KeyIcon from "../../../icons/KeyIcon";
import CheckIcon from "../../../icons/CheckIcon";
import XIcon from "../../../icons/XIcon";
import HashIcon from "../../../icons/HashIcon";
import { useSearchParams } from "react-router-dom";

export default function ForgotPasswordNewPasswordForm() {
  const {
    register,
    formState: { errors },
    getValues,
    watch,
    handleSubmit,
  } = useForm({ mode: "onChange" });
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isLoading, resetPassword } = useResetPassword();
  function onSubmit({ email, code, password, passwordConfirmation }) {
    resetPassword(
      {
        email,
        code,
        password,
        passwordConfirmation: passwordConfirmation,
        role: searchParams.get("role"),
      },
      { onSuccess: () => navigate("/login", { replace: true }) },
    );
  }

  const min = watch("password")?.length >= 8;
  const max = watch("password")?.length <= 30 && watch("password")?.length >= 8;
  const hasLowwerCase = /[a-z]/.test(watch("password"));
  const hasUpperCase = /[A-Z]/.test(watch("password"));
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
    watch("password"),
  );
  const hasNumber = /\d/.test(watch("password"));
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-[400px] space-y-5"
    >
      <p className="text-center text-large">
        إعادة تعيين كلمة المرور الخاصة بك
      </p>
      <FormInput
        label="الرمز"
        icon={<HashIcon />}
        placeholder="code"
        register={{
          ...register("code", {
            required: { value: true, message: ".هذا الحقل مطلوب" },
          }),
        }}
      />
      {/* new password */}
      <FormInput
        type={showPassword ? "text" : "password"}
        autoComplete="password"
        required={true}
        label="كلمة المرور"
        value={getValues("password")}
        error={errors.password}
        register={{
          ...register("password", {
            required: { value: true },
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
      {
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
      }
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
        btnType="full"
        size="block"
        type={"submit"}
        disabled={
          isLoading ||
          Object.keys(errors).length ||
          !watch("code") ||
          !watch("passwordConfirmation") ||
          !watch("password")
        }
      >
        {isLoading ? <SmallSpinner /> : "تأكيد"}
      </Button>
    </form>
  );
}
