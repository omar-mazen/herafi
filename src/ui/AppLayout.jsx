import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function AppLayout() {
  return (
    <div className=" grid h-dvh grid-rows-[auto,1fr] ">
      <NavBar />
      <main className="h-full w-full overflow-x-hidden overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  );
}
