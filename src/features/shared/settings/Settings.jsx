import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/Auth";
import UserIcon from "../../../icons/UserIcon";
import KeyIcon from "../../../icons/KeyIcon";
import ChatIcon from "../../../icons/ChatIcon";
import MapPinIcon from "../../../icons/MapPinIcon";

export default function Settings() {
  const { role } = useAuth();
  const { pathname } = useLocation();
  console.log("settings");
  return (
    <div className=" grid h-full grid-cols-[auto,1fr] gap-x-5 overflow-hidden">
      <ul className=" h-full w-full divide-y divide-text-color/20 overflow-y-auto border-l border-text-color/20">
        <li
          className={`cursor-pointer px-6 py-6 transition-all duration-200 ease-in-out hover:backdrop-brightness-90 ${pathname.split("/").at(-1) == "update-account" ? "font-semibold text-primary-color" : ""}`}
        >
          <Link to={"update-account"} className="flex items-center gap-2">
            <UserIcon />
            <span className="hidden sm:block">الحساب</span>
          </Link>
        </li>
        <li
          className={`cursor-pointer px-6 py-6 transition-all duration-200 ease-in-out hover:backdrop-brightness-90 ${pathname.split("/").at(-1) == "update-password" ? "font-semibold text-primary-color" : ""}`}
        >
          <Link to={"update-password"} className="flex items-center gap-2">
            <KeyIcon />
            <span className="hidden sm:block">كلمة المرور</span>
          </Link>
        </li>
        {role == "handyman" && (
          <>
            <li
              className={`cursor-pointer px-6 py-6 transition-all duration-200 ease-in-out hover:backdrop-brightness-90 ${pathname.split("/").at(-1) == "update-work-locations" ? "font-semibold text-primary-color" : ""}`}
            >
              <Link
                to={"update-work-locations"}
                className="flex items-center gap-2"
              >
                <MapPinIcon />
                <span className="hidden sm:block">المدن المتاح للعمل بها</span>
              </Link>
            </li>
            <li
              className={`cursor-pointer px-6 py-6 transition-all duration-200 ease-in-out hover:backdrop-brightness-90 ${pathname.split("/").at(-1) == "update-contacts" ? "font-semibold text-primary-color" : ""}`}
            >
              <Link to={"update-contacts"} className="flex items-center gap-2">
                <ChatIcon />
                <span className="hidden sm:block">وسائل التواصل</span>
              </Link>
            </li>
          </>
        )}
      </ul>
      <div className="mr-2 overflow-auto py-5 sm:py-10">
        <Outlet />
      </div>
    </div>
  );
}
