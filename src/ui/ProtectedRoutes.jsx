import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth";
import CompleteProfileWizard from "../features/handyman/Profile/CompleteProfileWizard/CompleteProfileWizard";

export default function ProtectedRoutes({ allowedRole }) {
  const { isAuth, role, user } = useAuth();
  if (user?.role == "handyman")
    if (
      !user?.craft ||
      !user?.cities?.length > 0 ||
      !user?.phones?.length > 0 ||
      (!user?.description && !user?.address && !user?.image)
    )
      return (
        <CompleteProfileWizard
          craft={!user?.craft}
          cities={!user?.cities?.length > 0}
          phones={!user?.phones?.length > 0}
          information={!user?.description && !user?.address && !user?.image}
        />
      );
  return allowedRole?.includes(role) ? (
    <Outlet />
  ) : isAuth ? (
    //user authorized but not have access to the requested page
    <p>ليس لدك صلاحية الوصول الي هذه الصفحة.</p>
  ) : (
    //user not authorized
    <Navigate to={"/login"} replace={true} />
  );
}
