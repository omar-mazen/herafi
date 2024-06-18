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
import XIcon from "../icons/XIcon";
import { useState } from "react";
import { imgBaseURL } from "../util/constatnt";
import SettingIcon from "../icons/SettingIcon";

export default function NavBar() {
  const { theme, themeToggle } = useTheme();
  const { role, isAuth, id, user } = useAuth();
  const { logout } = useLogout();
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <nav
        className={`container sticky top-0 z-10 grid  w-full grid-cols-[repeat(3,1fr)] sm:h-28 ${role == "client" ? " h-[12rem] grid-rows-[4rem,4rem] " : "grid-rows-[1fr] py-5"} content-center items-center gap-y-5 border-b border-text-color/5 bg-primary-background shadow-md sm:grid-cols-[auto,auto,1fr,auto]  sm:grid-rows-[1fr]  sm:gap-x-5 md:grid-cols-[auto,minmax(0,500px),auto] md:gap-x-10`}
      >
        <span
          className={`cursor-pointer md:hidden`}
          onClick={() => setMenuOpen(true)}
        >
          <MenuIcon size={30} close={() => setMenuOpen(true)} />
        </span>
        <div className="flex items-center justify-self-center md:col-start-1 md:col-end-2 md:justify-self-start">
          {role == "client" && (
            <span
              className={`hidden cursor-pointer pl-5 md:block`}
              onClick={() => setMenuOpen(true)}
            >
              <MenuIcon size={30} close={() => setMenuOpen(true)} />
            </span>
          )}
          <Link
            to="/"
            className=" flex cursor-pointer select-none items-center gap-2 "
          >
            <Logo className=" h-16 sm:h-20" />
            <span className="text-h2">حِرَفي</span>
          </Link>
        </div>
        {role == "client" && (
          <div className="col-start-1 col-end-4 row-start-2 w-full sm:col-start-3 sm:col-end-4 sm:row-start-1 md:col-start-2 md:col-end-3">
            <SearchBar />
          </div>
        )}
        {role == "handyman" && (
          <div className=" col-start-1 col-end-4 row-start-2 hidden w-full sm:col-start-3 sm:col-end-4 sm:row-start-1 md:col-start-2 md:col-end-3 md:block">
            <ul className=" flex items-center justify-between text-small">
              <li className="">
                <Link
                  to={"handyman/jobs/new"}
                  className=" ransition-all block cursor-pointer px-2 py-4 duration-300 ease-in-out hover:text-primary-color"
                >
                  المهام الجديده
                </Link>
              </li>
              <li className="">
                <Link
                  to={"handyman/jobs/active"}
                  className=" ransition-all block cursor-pointer px-2 py-4 duration-300 ease-in-out hover:text-primary-color"
                >
                  المهام النشطه
                </Link>
              </li>
              <li className="">
                <Link
                  to={"handyman/jobs/pended"}
                  className=" ransition-all block cursor-pointer px-2 py-4 duration-300 ease-in-out hover:text-primary-color"
                >
                  المهام المعلقه
                </Link>
              </li>
              <li className="">
                <Link
                  to={"handyman/jobs/done"}
                  className=" ransition-all block cursor-pointer px-2 py-4 duration-300 ease-in-out hover:text-primary-color"
                >
                  المهام المنتهيه
                </Link>
              </li>
            </ul>
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
              {theme === "dark" ? (
                <SunIcon size={25} />
              ) : (
                <MoonIcon size={25} />
              )}
            </span>
            <Menu fixedPosition={true}>
              <Menu.Toggle name={"userActionsMenu"}>
                <ProfilePic
                  size="sm"
                  src={user?.image ? imgBaseURL + user.image : null}
                />
              </Menu.Toggle>
              <Menu.List name={"userActionsMenu"}>
                {role == "handyman" && (
                  <Menu.Item
                    to={`/handyman/${id}/`}
                    icon={
                      <ProfilePic
                        size="sm"
                        src={user?.image ? imgBaseURL + user.image : null}
                      />
                    }
                  >
                    حسابي
                  </Menu.Item>
                )}
                <Menu.Item icon={<SettingIcon />} to={`/settings/`}>
                  اعدادات الحساب
                </Menu.Item>
                <Menu.Item icon={<LogoutIcon />} onClick={logout}>
                  تسجيل الخروج
                </Menu.Item>
              </Menu.List>
            </Menu>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <SideMenu
          close={() => setMenuOpen(false)}
          role={role}
          id={id}
          logout={logout}
          themeToggle={themeToggle}
          theme={theme}
        />
      )}
    </>
  );
}
function SideMenu({ close, role, id, logout, themeToggle, theme }) {
  return (
    <div className={`fixed z-[20] h-dvh w-[100%] bg-black/50 `}>
      <div className=" fixed right-0 top-0 z-[21] h-dvh w-3/4 max-w-[400px] bg-secondary-background px-12 pt-6">
        <div className=" flex cursor-pointer items-center justify-between">
          <span onClick={close}>
            <XIcon size={25} />
          </span>
          <span onClick={themeToggle} className=" cursor-pointer">
            {theme === "dark" ? <SunIcon size={25} /> : <MoonIcon size={25} />}
          </span>
        </div>
        {role == "handyman" && (
          <>
            <ul className=" mt-10 text-medium">
              <li className="" onClick={close}>
                <Link
                  to={"handyman/jobs/new"}
                  className=" ransition-all block cursor-pointer px-2 py-4 duration-300 ease-in-out hover:bg-primary-background hover:pr-6 hover:text-primary-color"
                >
                  المهام الجديده
                </Link>
              </li>
              <li className="" onClick={close}>
                {" "}
                <Link
                  to={"handyman/jobs/active"}
                  className=" ransition-all block cursor-pointer px-2 py-4 duration-300 ease-in-out hover:bg-primary-background hover:pr-6 hover:text-primary-color"
                >
                  المهام النشطه
                </Link>
              </li>
              <li className="" onClick={close}>
                {" "}
                <Link
                  to={"handyman/jobs/pended"}
                  className=" ransition-all block cursor-pointer px-2 py-4 duration-300 ease-in-out hover:bg-primary-background hover:pr-6 hover:text-primary-color"
                >
                  المهام المعلقه
                </Link>
              </li>
              <li className="" onClick={close}>
                {" "}
                <Link
                  to={"handyman/jobs/done"}
                  className=" ransition-all block cursor-pointer px-2 py-4 duration-300 ease-in-out hover:bg-primary-background hover:pr-6 hover:text-primary-color"
                >
                  المهام المنتهيه
                </Link>
              </li>
            </ul>
            <ul className="mt-10 text-medium">
              <li className="" onClick={close}>
                {" "}
                <Link
                  to={`/handyman/${id}`}
                  className=" ransition-all block cursor-pointer px-2 py-4 duration-300 ease-in-out hover:bg-primary-background hover:pr-6 hover:text-primary-color"
                >
                  حسابي
                </Link>
              </li>
              <li
                onClick={logout}
                className=" ransition-all block cursor-pointer px-2 py-4 duration-300 ease-in-out hover:bg-primary-background hover:pr-6 hover:text-primary-color"
              >
                تسجيل الخروج
              </li>
            </ul>
          </>
        )}
        {role == "client" && (
          <>
            <ul className=" mt-10 text-medium">
              <li className="" onClick={close}>
                {" "}
                <Link
                  to={"client/job-offer/add"}
                  className=" ransition-all block cursor-pointer px-2 py-4 duration-300 ease-in-out hover:bg-primary-background hover:pr-6 hover:text-primary-color"
                >
                  ابدأ مشروعك الآن
                </Link>
              </li>
              <li className="" onClick={close}>
                {" "}
                <Link
                  to={"client/job-offers/"}
                  className=" ransition-all block cursor-pointer px-2 py-4 duration-300 ease-in-out hover:bg-primary-background hover:pr-6 hover:text-primary-color"
                >
                  عروض العمل
                </Link>
              </li>
            </ul>
            <ul className="mt-10 text-medium">
              <li className="" onClick={close}>
                {" "}
                <Link
                  to={`/client/${id}/settings`}
                  className=" ransition-all block cursor-pointer px-2 py-4 duration-300 ease-in-out hover:bg-primary-background hover:pr-6 hover:text-primary-color"
                >
                  اعدادات الحساب
                </Link>
              </li>
              <li
                onClick={() => {
                  close();
                  logout();
                }}
                className=" ransition-all block cursor-pointer px-2 py-4 duration-300 ease-in-out hover:bg-primary-background hover:pr-6 hover:text-primary-color"
              >
                تسجيل الخروج
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
