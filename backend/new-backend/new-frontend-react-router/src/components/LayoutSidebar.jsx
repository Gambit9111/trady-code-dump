import { useState } from "react";
import AuthLogout from "./AuthLogout";
import { Link } from "react-router-dom";

function Sidebar() {
  const [open, setOpen] = useState(true);
  
  const handleOpen = () => {
    setOpen(!open);
  };

  function SidebarTop() {
    return (
      <div className="text-yellow-950 flex flex-row justify-center sm:flex-col gap-2 flex-wrap">
        <Link to="/dashboard">
        <button className="w-24 sm:w-full h-8 border-solid border border-yellow-950 rounded-sm text-center text-sm font-bold">
          Dashboard
        </button>
        </Link>
        <Link to="/trades">
        <button className="w-24 sm:w-full h-8 border-solid border border-yellow-950 rounded-sm text-center text-sm font-bold">
          Trades
        </button>
        </Link>
        <Link to="/ideas">
        <button className="w-24 sm:w-full h-8 border-solid border border-yellow-950 rounded-sm text-center text-sm font-bold">
          Ideas
        </button>
        </Link>
        <Link to="/tools">
        <button className="w-24 sm:w-full h-8 border-solid border border-yellow-950 rounded-sm text-center text-sm font-bold">
          Tools
        </button>
        </Link>
        <button className="w-24 sm:w-full h-8 border-solid border border-yellow-950 bg-red-800 rounded-sm text-center text-sm font-bold">
          Transactions
        </button>
        <button className="w-24 sm:w-full h-8 border-solid border border-yellow-950 rounded-sm text-center text-sm font-bold bg-red-800">
          Portfolios
        </button>
      </div>
    );
  }

  function SidebarBottom() {
    return (
      <div className="text-yellow-950 flex flex-row justify-center sm:flex-col gap-1 flex-wrap">
        <AuthLogout />
      </div>
    );
  }

  return (
    <>
      <button onClick={handleOpen} className="sm:hidden">
        OPEN
      </button>
      {open ? (
        <div className="w-full sm:w-2/12 bg-blue-850 flex flex-col justify-between py-1 gap-1">
          {/* top controls */}
          <SidebarTop />
          {/* bottom */}
          <SidebarBottom />
        </div>
      ) : null}
    </>
  );
}

export default Sidebar;
