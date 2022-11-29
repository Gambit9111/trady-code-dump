import trades from "../api/trades";
import auth from "../api/auth";

import { useState, useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";

export default function ContentTrades() {
  const [allTrades, setAllTrades] = useState(null);
  const [showSingleTrade, setShowSingleTrade] = useState(false);
  const navigate = useNavigate();

  const handleGetTrades = async () => {
    try {
      const allTrades = await trades.getTrades();
      setAllTrades(allTrades);
      console.log("allTrades", allTrades);
    } catch (error) {
      console.error("error", error);
      auth.logout();
      navigate("/login");
    }
  };

  useEffect(() => {
    handleGetTrades();
  }, []);

  if (!allTrades) {
    return <div>Loading...</div>;
  } else {
    if (showSingleTrade) {
      return (
        <div>
          <Outlet/>
          <Link to="/trades"><button onClick={() => setShowSingleTrade(false)}>close</button></Link>
        </div>
      );
    } else {
      return (
        // all trades
        <>
          <TopBar />
          {allTrades.map((trade) => (
            <Link to={`/trades/${trade.id}`} key={trade.id}>
              <button onClick={() => setShowSingleTrade(true)} className="flex flex-row justify-center items-center sm:w-full w-[70vh] h-12 bg-blue-850 rounded-sm shadow-xl m-3 border-b-2 border-l-2 border-b-black border-l-yellow-950 hover:bg-blue-950 hover:border-0">
                <div className="basis-1/4 text-center">
                  <p className="text-md text-white font-semibold">
                    {trade.status}
                  </p>
                </div>
                <div className="basis-1/4 text-center">
                  <p className="text-md text-white font-semibold">
                    {trade.pnl}
                  </p>
                </div>
                <div className="basis-1/4 text-center">
                  <p className="text-md text-white font-semibold">
                    {trade.symbol}
                  </p>
                </div>
                <div className="basis-1/4 text-center">
                  <p className="text-md text-white font-semibold">
                    {trade.entry_price}
                  </p>
                </div>
                <div className="basis-1/4 text-center">
                  <p className="text-md text-white font-semibold">
                    {trade.entry_date}
                  </p>
                </div>
                <div className="basis-1/4 text-center">
                  <p className="text-md text-white font-semibold">
                    {trade.type}
                  </p>
                </div>
              </button>
            </Link>
          ))}
        </>
      );
    }
  }
}

function TopBar() {
  return (
    <div className="flex flex-row justify-center items-center sm:w-full w-[70vh] h-12 bg-blue-850 rounded-sm shadow-xl m-3 border-b-2 border-b-white">
      <div className="basis-1/4 text-center">
        <p className="text-md text-white font-semibold">STATUS</p>
      </div>
      <div className="basis-1/4 text-center">
        <p className="text-md text-white font-semibold">PNL</p>
      </div>
      <div className="basis-1/4 text-center">
        <p className="text-md text-white font-semibold">SYMBOL</p>
      </div>
      <div className="basis-1/4 text-center">
        <p className="text-md text-white font-semibold">PRICE</p>
      </div>
      <div className="basis-1/4 text-center">
        <p className="text-md text-white font-semibold">DATE</p>
      </div>
      <div className="basis-1/4 text-center">
        <p className="text-md text-white font-semibold">TYPE</p>
      </div>
    </div>
  );
}
