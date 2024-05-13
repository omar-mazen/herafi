import { Link, useNavigate } from "react-router-dom";
import FacebookIcon from "../../icons/FacebookIcon";
import GoogleIcon from "../../icons/GoogleIcon";
import SignUpForm from "../../features/shared/Authentication/SignUpForm";
import { useEffect, useState } from "react";
import UserSeachIcon from "../../icons/UserSeachIcon";
import ScrewdriverIcon from "../../icons/ScrewdriverIcon";
import Button from "../../ui/Button";
import { useAuth } from "../../context/Auth";
import Logo from "../../ui/Logo";

export default function SignUp() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  useEffect(() => {
    if (isAuth) navigate("/", { replace: true });
  }, [isAuth]);
  return userType ? (
    <>
      <nav className="container sticky top-0 z-10 flex h-24 w-full items-center justify-between border-b border-text-color/5 bg-primary-background shadow-md">
        <div className=" flex select-none items-center gap-2">
          <Logo className=" h-20" />
          <span className=" text-h2">حِرَفي</span>
        </div>
        <button
          type="button"
          className=" text-primary-color"
          onClick={() => {
            setUserType((user) => (user == "client" ? "handyman" : "client"));
          }}
        >
          {userType === "client" ? "الإنضمام كحرفي ؟" : "الإنضمام كعميل ؟"}
        </button>
      </nav>

      <section className="container my-10">
        <div className=" mx-auto box-border flex w-[280px] flex-col items-center space-y-7 rounded-lg border border-text-color/50 px-8 py-12 sm:box-content sm:px-20 md:w-[350px]">
          <span className="text-large">
            إنشاء حساب {userType == "client" ? "عميل" : "حرفي"} جديد
          </span>
          <SignUpForm role={userType} />
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
            <span className="w-[90%]">التسجيل باستخدام حساب Google</span>
            <span className="flex w-[10%] items-center justify-center">
              <GoogleIcon />
            </span>
          </button>
          <button
            type="button"
            className="flex h-16 w-full items-center justify-between gap-5 rounded-full border border-text-color/50 px-6 text-xsmall font-semibold transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl"
          >
            <span className="w-[90%]">التسجيل باستخدام حساب Facebook</span>
            <span className=" flex w-[10%] items-center justify-center">
              <span className="rounded-full bg-[#0866FF] p-2 text-white">
                <FacebookIcon size={15} />
              </span>
            </span>
          </button>
          <span className="!mt-10 text-small">
            لديك حساب بالفعل ؟{" "}
            <Link className="text-primary-color" to="/login">
              سجل دخولك
            </Link>
          </span>
        </div>
      </section>
    </>
  ) : (
    <section className="container flex h-screen select-none flex-col items-center justify-center gap-10 sm:gap-12">
      <p className=" text-h2 font-semibold tracking-wide">
        الإنضمام كعميل ام حرفي ؟
      </p>
      <div className=" flex  flex-wrap justify-center gap-10">
        <div
          className={` relative flex h-52 w-[21rem] cursor-pointer flex-col rounded-xl border-2 px-6 py-4 text-large ${selectedUser == "client" ? "border-success-color" : " border-text-color/50"}`}
          onClick={() => setSelectedUser("client")}
        >
          <span
            className={` mr-[-0.5rem] mt-[0.3rem] flex h-10 w-10 items-center justify-center rounded-full border-2  ${selectedUser == "client" ? "border-success-color" : "border-text-color/50"}`}
          >
            <span
              className={`block aspect-square h-[80%] rounded-full  p-2 ${selectedUser == "client" ? "bg-success-color" : ""}`}
            ></span>
          </span>
          <span className=" ml-[-0.5rem] self-end">
            <UserSeachIcon size={50} />
          </span>
          <p className=" font-semibold">انا عميل اريد حرفي</p>
        </div>
        <div
          className={` relative flex h-52 w-[21rem] cursor-pointer flex-col rounded-xl border-2 px-6 py-4 text-large ${selectedUser == "handyman" ? "border-success-color" : " border-text-color/50"}`}
          onClick={() => setSelectedUser("handyman")}
        >
          <span
            className={` mr-[-0.5rem] mt-[0.3rem] flex h-10 w-10 items-center justify-center rounded-full border-2  ${selectedUser == "handyman" ? "border-success-color" : "border-text-color/50"}`}
          >
            <span
              className={`block aspect-square h-[80%] rounded-full  p-2 ${selectedUser == "handyman" ? "bg-success-color" : ""}`}
            ></span>
          </span>
          <span className=" ml-[-0.5rem] self-end">
            <ScrewdriverIcon size={50} />
          </span>
          <p className=" font-semibold">انا حرفي ابحث عن عمل</p>
        </div>
      </div>
      {selectedUser && (
        <Button
          size="large"
          additionalStyle={`!h-14 !w-44`}
          onClick={() => setUserType(selectedUser)}
        >
          {selectedUser == "client" ? "الانضمام كعميل" : "الانضمام كحرفي"}
        </Button>
      )}
      <p>
        لديك حساب بالفعل ؟{" "}
        <Link to={"/login"} className=" text-primary-color">
          تسجيل الدخول
        </Link>
      </p>
    </section>
  );
}
