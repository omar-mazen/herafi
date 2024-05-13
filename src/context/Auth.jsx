import { createContext, useContext, useEffect, useState } from "react";
import { getCookie } from "../util/helper";
import useGetUserById from "../features/shared/Authentication/useGetUser";
import useGetUser from "../features/shared/Authentication/useGetUser";
import { getUserById } from "../services/shared/user";

const authContext = createContext();
export function AuthProvider({ children }) {
  const id = getCookie("token")
    ? JSON.parse(localStorage.getItem("user"))?.id
    : "";
  const role = getCookie("token")
    ? JSON.parse(localStorage.getItem("user"))?.role
    : "";
  const [auth, setAuth] = useState({
    isAuth: Boolean(getCookie("token")),
    role,
    id,
    user: null,
  });
  // const [auth, setAuth] = useState({
  //   isAuth: true,
  //   // role: "handyman",
  //   role: "client",
  // });
  useEffect(() => {
    async function getUser() {
      if (id) {
        let user = await getUserById({ id, role });
        setAuth((auth) => ({ ...auth, user }));
      }
    }
    getUser();
  }, []);

  console.log(auth);
  return (
    <authContext.Provider
      value={{
        isAuth: auth.isAuth,
        role: auth.role,
        user: auth.user,
        id: auth.id,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
export function useAuth() {
  const { isAuth, role, user, id } = useContext(authContext);
  return { isAuth, role, user, id };
}
