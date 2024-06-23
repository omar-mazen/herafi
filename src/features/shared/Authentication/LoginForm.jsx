import FormInput from "../../../ui/FormInput";
import UserIcon from "../../../icons/UserIcon";
import { useForm } from "react-hook-form";
import Button from "../../../ui/Button";
import KeyIcon from "../../../icons/KeyIcon";
import useLogin from "./useLogin";
import SmallSpinner from "../../../ui/SmallSpinner";
import { Link } from "react-router-dom";
import CheckCircle from "../../../icons/CheckCircle";
import { useState } from "react";

export default function LoginForm({ setRole }) {
  const {
    formState: { errors },
    register,
    watch,
    getValues,
    handleSubmit,
  } = useForm({ mode: "onChange" });
  const { isLoading, login } = useLogin();
  const [userType, setUserType] = useState("handyman");
  function onSubmit({ email, password }) {
    login({ email, password, role: userType });
  }
  console.log(userType);
  return (
    <form className="w-full space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-8 flex w-full items-center justify-around gap-8">
        <div
          className={`relative flex flex-1 cursor-pointer items-center justify-evenly rounded-lg border p-4 hover:backdrop-brightness-150 hover:transition-all hover:duration-200 hover:ease-in-out ${userType == "handyman" ? "border-primary-color/20 bg-primary-color/50" : "border-text-color/5 bg-text-color/10"}`}
          onClick={() => {
            setUserType("handyman");
            setRole("handyman");
          }}
        >
          <img src="/public/worker.svg" className="w-16" />
          <span
            className={`${userType == "handyman" ? "" : " hidden"}  absolute bottom-0 left-0 translate-x-[-50%] translate-y-[50%] rounded-full bg-white text-primary-color`}
          >
            <CheckCircle />
          </span>
          <p className="text-center text-large font-semibold">حرفي</p>
        </div>
        <div
          className={`relative flex flex-1 cursor-pointer items-center justify-evenly rounded-lg border p-4 hover:backdrop-brightness-150 hover:transition-all hover:duration-200  hover:ease-in-out ${userType == "client" ? "border-primary-color/20 bg-primary-color/50" : "border-text-color/5 bg-text-color/10"}`}
          onClick={() => {
            setUserType("client");
            setRole("client");
          }}
        >
          <img src="/public/client.svg" className="w-16" />
          <span
            className={`${userType == "client" ? "" : " hidden"} absolute bottom-0 left-0 translate-x-[-50%] translate-y-[50%] rounded-full bg-white text-primary-color`}
          >
            <CheckCircle />
          </span>
          <p className="text-center text-large font-semibold">عميل</p>
        </div>
      </div>
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
      <Link to={"/forgot-password"} className="inline-block">
        {" "}
        هل نسيت كلمة المرور ؟
      </Link>
      {/* <div className=" flex">
        <div className="flex flex-1 items-center gap-3">
          <input
            type="radio"
            name="role"
            id="client"
            value="client"
            defaultChecked
            onClick={(e) => setRole(e.target.value)}
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
            onClick={(e) => setRole(e.target.value)}
            className="cursor-pointer"
            {...register("role")}
          />
          <label htmlFor="handyman" className="cursor-pointer font-semibold">
            حرفي
          </label>
        </div>
      </div> */}

      <Button
        type="submit"
        size="block"
        additionalStyle={"!mt-5"}
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
