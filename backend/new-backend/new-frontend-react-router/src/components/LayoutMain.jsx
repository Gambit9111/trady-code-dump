import AuthLogout from "./AuthLogout";

import { Outlet } from "react-router-dom";

import LayoutNavbar from "./LayoutNavbar";
import LayoutSidebar from "./LayoutSidebar";

export default function LayoutMain({ user }) {
  return (
    <div className="h-screen w-sceen bg-blue-950 bg-opacity-95">
      <LayoutNavbar />
      <div className="flex flex-col gap-2 sm:flex-row w-full h-[90vh]  bg-blue-950 px-1">
        <LayoutSidebar />
        <div className="w-full h-full bg-blue-950 overflow-y-auto sm:overflow-x-hidden sm:pr-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}