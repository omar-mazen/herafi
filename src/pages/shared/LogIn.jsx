import FacebookIcon from "../../icons/FacebookIcon";
import LoginForm from "../../features/shared/Authentication/LoginForm";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { useEffect, useState } from "react";
import Logo from "../../ui/Logo";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import FacebookLogin from "@greatsumini/react-facebook-login";
import useSocialLogin from "../../features/shared/Authentication/useSocialLogin";

export default function Login() {
  const { socilaLogin, isLoading } = useSocialLogin();
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const [role, setRole] = useState("handyman");
  useEffect(() => {
    if (isAuth) navigate("/", { replace: true });
  }, [isAuth]);
  function googleLogin({ email, name, id }) {
    socilaLogin({
      type: "google",
      data: {
        email,
        name,
        id,
        role,
      },
    });
  }
  function facebookLogin({ email, name, id }) {
    socilaLogin({
      type: "facebook",
      data: {
        email,
        name,
        id,
        role,
      },
    });
  }
  return (
    <GoogleOAuthProvider clientId="338014147339-mg1etbpd9s25fhim7hrn3iqaf29in5lo.apps.googleusercontent.com">
      <nav className="container sticky top-0 z-10 flex h-24 w-full items-center justify-between border-b border-text-color/5 bg-primary-background shadow-md">
        <div className=" flex items-center gap-2">
          <Logo className=" h-20" />
          <span className=" select-none text-h2">حِرَفي</span>
        </div>
      </nav>
      <section className="container grid grid-cols-1 items-center justify-items-center md:grid-cols-[1fr,1fr]">
        <div className="box-content flex w-[300px] flex-col items-center space-y-7 rounded-lg px-8 py-12 sm:px-20 ">
          <span className="text-large">تسجيل الدخول</span>
          <LoginForm setRole={setRole} />
          <div
            className=" relative right-0 w-full text-center font-semibold before:absolute before:left-0 before:top-1/2 before:h-[1px] before:w-[40%] before:bg-text-color/50
      after:absolute after:right-0 after:top-1/2 after:h-[1px] after:w-[40%] after:bg-text-color/50"
          >
            أو
          </div>
          <div>
            <GoogleLogin
              shape="pill"
              size="large"
              theme="filled_blue"
              width={280}
              onSuccess={(cer) => {
                const userData = jwtDecode(cer.credential);
                googleLogin({
                  email: userData.email,
                  name: userData.name,
                  id: userData?.sub,
                });
              }}
            ></GoogleLogin>
          </div>
          <FacebookLogin
            appId="476481078155293"
            onProfileSuccess={(response) => {
              facebookLogin({
                id: response.id,
                email: response.email,
                name: response.name,
              });
            }}
          >
            <button
              style={{
                fontFamily: "Google Sans,arial,sans-serif",
                fontWeight: 500,
                fontSize: "15px",
              }}
              type="button"
              className="relative flex h-[40px] w-[280px] items-center gap-[12px] rounded-full bg-[#0866FF] transition-all duration-100 hover:brightness-150"
            >
              <span className=" flex items-center justify-center pr-1">
                <span className="rounded-full bg-white p-3 text-[#0866FF]">
                  <FacebookIcon size={20} />
                </span>
              </span>
              <span className="">
                تسجيل الدخول باستخدام
                <span className=""> Facebook</span>
              </span>
            </button>
          </FacebookLogin>
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
    </GoogleOAuthProvider>
  );
}
