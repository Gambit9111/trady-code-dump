import { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar({ openDashboard, openTrades, openIdeas, openTools }) {
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  function SidebarTop() {
    return (
      <div className="text-yellow-950 flex flex-row justify-center sm:flex-col gap-2 flex-wrap">
        <button
          onClick={openDashboard}
          className="w-24 sm:w-full h-8 border-solid border border-yellow-950 rounded-sm text-center text-sm font-bold"
        >
          Dashboard
        </button>
        <Link to="/trades">
        <button
          onClick={openTrades}
          className="w-24 sm:w-full h-8 border-solid border border-yellow-950 rounded-sm text-center text-sm font-bold"
        >
          Trades
        </button>
        </Link>
        <button
          onClick={openIdeas}
          className="w-24 sm:w-full h-8 border-solid border border-yellow-950 rounded-sm text-center text-sm font-bold"
        >
          Ideas
        </button>
        <button
          onClick={openTools}
          className="w-24 sm:w-full h-8 border-solid border border-yellow-950 rounded-sm text-center text-sm font-bold"
        >
          Tools
        </button>
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
        <button onClick={handleLogout} className="w-24 sm:w-full h-8 border-solid border border-yellow-950 rounded-sm text-center text-sm font-bold">
          Logout
        </button>
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
