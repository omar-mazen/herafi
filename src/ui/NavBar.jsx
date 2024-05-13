import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import MenuIcon from "../icons/MenuIcon";
import NotificationIcon from "../icons/NotificationIcon";
import HeartIcon from "../icons/HeartIcon";
import { useTheme } from "../context/Theme";
import MoonIcon from "../icons/MoonIcon";
import SunIcon from "../icons/SunIcon";
import Logo from "./Logo";
import LogoutIcon from "../icons/LogoutIcon";
import ProfilePic from "./ProfilePic";
import { useAuth } from "../context/Auth";
import SelectOption from "./SelectOption";
import Menu from "./Menu";
import useLogout from "../features/shared/Authentication/useLogout";

export default function NavBar() {
  const { theme, themeToggle } = useTheme();
  const { role, isAuth } = useAuth();
  const { logout } = useLogout();
  return (
    <nav
      className={`container sticky top-0 z-10 grid  w-full grid-cols-[repeat(3,1fr)] sm:h-28 ${role == "client" ? " h-[12rem] grid-rows-[4rem,4rem] " : "grid-rows-[1fr] py-5"} content-center items-center gap-y-5 border-b border-text-color/5 bg-primary-background shadow-md sm:grid-cols-[auto,auto,1fr,auto]  sm:grid-rows-[1fr]  sm:gap-x-5 md:grid-cols-[auto,minmax(0,500px),auto] md:gap-x-10`}
    >
      <span className="md:hidden">
        <MenuIcon size={30} />
      </span>
      <Link
        to="/"
        className=" flex cursor-pointer select-none items-center gap-2 justify-self-center md:col-start-1 md:col-end-2 md:justify-self-start"
      >
        <Logo className=" h-16 sm:h-20" />
        <span className="text-h2">حِرَفي</span>
      </Link>
      {role == "client" && (
        <div className="col-start-1 col-end-4 row-start-2 w-full sm:col-start-3 sm:col-end-4 sm:row-start-1 md:col-start-2 md:col-end-3">
          <SearchBar />
        </div>
      )}
      <div
        className={`col-start-3 flex items-center justify-end gap-10 sm:col-start-4 md:col-start-3`}
      >
        <Menu size="lg" fixedPosition={true}>
          <Menu.Toggle name={"notifications"}>
            <NotificationIcon size={25} />
          </Menu.Toggle>
          <Menu.List name={"notifications"}>
            <Menu.Item>يوجد مهام جديده في المنصورة.</Menu.Item>
            <Menu.Item>لم يقبل احمد السعر الذي قدمته.</Menu.Item>
            <Menu.Item>قبل احمد بالتفاوض, اصبحت مُكلف بالمهمه !</Menu.Item>
            <Menu.Item>لقد زار حساب 15 عميل هذا الأسبوع.</Menu.Item>
            <Menu.Item>لقد ظهرت 100 في عمليات البحث.</Menu.Item>
            <Menu.Item>يوجد مهام جديده في المنصورة.</Menu.Item>
            <Menu.Item>لم يقبل احمد السعر الذي قدمته.</Menu.Item>
            <Menu.Item>قبل احمد بالتفاوض, اصبحت مُكلف بالمهمه !</Menu.Item>
            <Menu.Item>لقد زار حساب 15 عميل هذا الأسبوع.</Menu.Item>
            <Menu.Item>لقد ظهرت 100 في عمليات البحث.</Menu.Item>
          </Menu.List>
        </Menu>
        <div
          className={`hidden items-center gap-10 ${role == "client" ? "md:flex" : "sm:flex"}`}
        >
          {role == "client" && (
            <Link to={"client/favorites"}>
              <HeartIcon size={25} />
            </Link>
          )}
          <span onClick={themeToggle} className=" cursor-pointer">
            {theme === "dark" ? <SunIcon size={25} /> : <MoonIcon size={25} />}
          </span>
          <Menu fixedPosition={true}>
            <Menu.Toggle name={"userActionsMenu"}>
              <ProfilePic size="sm" />
            </Menu.Toggle>
            <Menu.List name={"userActionsMenu"}>
              <Menu.Item icon={<LogoutIcon />} onClick={logout}>
                تسجيل الخروج
              </Menu.Item>
            </Menu.List>
          </Menu>
        </div>
      </div>
    </nav>
  );
}
