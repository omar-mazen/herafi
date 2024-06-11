import GoogleIcon from "../../icons/GoogleIcon";
import FacebookIcon from "../../icons/FacebookIcon";
import LoginForm from "../../features/shared/Authentication/LoginForm";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { useEffect } from "react";
import Logo from "../../ui/Logo";

export default function Login() {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  useEffect(() => {
    if (isAuth) navigate("/", { replace: true });
  }, [isAuth]);
  return (
    <>
      <nav className="container sticky top-0 z-10 flex h-24 w-full items-center justify-between border-b border-text-color/5 bg-primary-background shadow-md">
        <div className=" flex items-center gap-2">
          <Logo className=" h-20" />
          <span className=" select-none text-h2">حِرَفي</span>
        </div>
      </nav>
      <section className="container mt-5 grid grid-cols-1 items-center justify-items-center md:grid-cols-[1fr,1fr]">
        <div className="box-content flex w-[300px] flex-col items-center space-y-7 rounded-lg px-8 py-12 sm:px-20 ">
          <span className="text-large">تسجيل الدخول</span>
          <LoginForm />
          <div
            className=" relative right-0 w-full text-center font-semibold before:absolute before:left-0 before:top-1/2 before:h-[1px] before:w-[40%] before:bg-text-color/50
      after:absolute after:right-0 after:top-1/2 after:h-[1px] after:w-[40%] after:bg-text-color/50"
          >
            أو
          </div>
          <button
            type="button"
            className="flex h-16 w-full items-center justify-between gap-5 rounded-full border border-text-color/50 px-6 text-xsmall font-semibold transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl"
          >
            <span className="w-[90%]">تسجيل الدخول باستخدام حساب Google</span>
            <span className="flex w-[10%] items-center justify-center">
              <GoogleIcon />
            </span>
          </button>
          <button
            type="button"
            className="flex h-16 w-full items-center justify-between gap-5 rounded-full border border-text-color/50 px-6 text-xsmall font-semibold transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl"
          >
            <span className="w-[90%]">تسجيل الدخول باستخدام حساب Facebook</span>
            <span className=" flex w-[10%] items-center justify-center">
              <span className="rounded-full bg-[#0866FF] p-2 text-white">
                <FacebookIcon size={15} />
              </span>
            </span>
          </button>
          <span className="!mt-10 text-small">
            ليس لديك حساب ؟{" "}
            <Link className="text-primary-color" to="/signup">
              إنشاء حساب
            </Link>
          </span>
        </div>
        <img
          src="/public/mobile-login-animate.svg"
          className="hidden max-w-[500px] md:block"
        />
      </section>
    </>
  );
}
/* 
      <section className="container my-10 flex h-[calc(100vh-6rem)] items-center justify-center">
        <div className="box-content flex w-[300px] flex-col items-center space-y-7 rounded-lg border border-text-color/50 px-8 py-12 sm:px-20 md:w-[350px]">
          <span className="text-large">تسجيل الدخول</span>
          <LoginForm />
          <div
            className=" relative right-0 w-full text-center font-semibold before:absolute before:left-0 before:top-1/2 before:h-[1px] before:w-[40%] before:bg-text-color/50
      after:absolute after:right-0 after:top-1/2 after:h-[1px] after:w-[40%] after:bg-text-color/50"
          >
            أو
          </div>
          <button
            type="button"
            className="flex h-16 w-full items-center justify-between gap-5 rounded-full border border-text-color/50 px-6 text-xsmall font-semibold transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl"
          >
            <span className="w-[90%]">تسجيل الدخول باستخدام حساب Google</span>
            <span className="flex w-[10%] items-center justify-center">
              <GoogleIcon />
            </span>
          </button>
          <button
            type="button"
            className="flex h-16 w-full items-center justify-between gap-5 rounded-full border border-text-color/50 px-6 text-xsmall font-semibold transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl"
          >
            <span className="w-[90%]">تسجيل الدخول باستخدام حساب Facebook</span>
            <span className=" flex w-[10%] items-center justify-center">
              <span className="rounded-full bg-[#0866FF] p-2 text-white">
                <FacebookIcon size={15} />
              </span>
            </span>
          </button>
          <span className="!mt-10 text-small">
            ليس لديك حساب ؟{" "}
            <Link className="text-primary-color" to="/signup">
              إنشاء حساب
            </Link>
          </span>
        </div>
      </section>
*/
