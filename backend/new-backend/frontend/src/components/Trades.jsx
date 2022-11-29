import trades from "../api/trades";
import auth from "../api/auth";
import { useState, useEffect } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";

export default function Trades({ user }) {
  const [myTrades, setMyTrades] = useState(null);

  const handleGetMyTrades = async () => {
    try {
      const myTrades = await trades.getTrades();
      setMyTrades(myTrades);
      console.log("myTrades", myTrades);
    } catch (exception) {
      console.log("exception", exception);
      auth.logout();
      // refresh
      window.location.reload();
    }
  };

  useEffect(() => {
    if (user) {
      handleGetMyTrades();
    }
  }, [user]);

  if (!myTrades) {
    return (
      <div className="flex flex-col w-full h-full bg-blue-400">
        <h1>Loading....</h1>
      </div>
    );
  } else {
    return (
      <>
        <TopBar />
        <div>
          <Outlet />
        </div>
        {myTrades.map((trade) => (
          <Link to={`/trades/${trade.id}`}>
          <div
            key={trade.id}
            className="flex flex-row justify-center items-center h-12 bg-blue-850 rounded-sm shadow-xl m-3 border-b-2 border-l-2 border-b-black border-l-yellow-950 hover:bg-blue-950 hover:border-0"
          >
            <div className="basis-1/4 text-center">
              <p className="text-md text-white font-semibold">{trade.status}</p>
            </div>
            <div className="basis-1/4 text-center">
              <p className="text-md text-white font-semibold">{trade.pnl}</p>
            </div>
            <div className="basis-1/4 text-center">
              <p className="text-md text-white font-semibold">{trade.symbol}</p>
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
              <p className="text-md text-white font-semibold">{trade.type}</p>
            </div>
          </div>
          </Link>
        ))}
      </>
    );
  }
}

{
  /* <div className="flex flex-row justify-center items-center h-12 bg-blue-850 rounded-sm shadow-xl m-3"></div> */
}

function TopBar() {
  return (
    <div className="flex flex-row justify-center items-center h-12 bg-blue-850 rounded-sm shadow-xl m-3 border-b-2 border-b-white">
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

export default function SingleTrade() {
  return (
    <h1> ZOPA </h1>
  );
}

