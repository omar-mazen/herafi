import { Outlet, useSearchParams } from "react-router-dom";
import Logo from "../../ui/Logo";

export default function ForgetPasswordPage() {
  return (
    <>
      <nav className="container sticky top-0 z-10 flex h-24 w-full items-center justify-between border-b border-text-color/5 bg-primary-background shadow-md">
        <div className=" flex items-center gap-2">
          <Logo className=" h-20" />
          <span className=" select-none text-h2">حِرَفي</span>
        </div>
      </nav>
      <section className="container mt-5 grid grid-cols-1 items-center justify-items-center md:grid-cols-[1fr,1fr]">
        <Outlet />
        <img
          src="/public/forgot-password-animate.svg"
          className="hidden max-w-[500px] md:block"
        />
      </section>
    </>
  );
}
