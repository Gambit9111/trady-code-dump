import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import trades from "../api/trades";


export default function ContentTradeSingle() {
  const [tradeSingle, setTradeSingle] = useState(null);
  const [exit_price, setExitPrice] = useState("");
  let { tradeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    trades.getTradeSingle(tradeId).then((tradeSingle) => {
      setTradeSingle(tradeSingle);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const trade = await trades.closeTrade(tradeId, exit_price);
      setExitPrice("");
      console.log("trade updated", trade);
      // reload the current window
      navigate("/trades");
      window.location.reload();

    } catch (error) {
      console.log("error", error);
    }
  };

  if (!tradeSingle) {
    return <div>Loading...</div>;

  } else {

    if (tradeSingle.status === "open") {
      return (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="float"
              value={exit_price}
              name="Exit Price"
              onChange={({ target }) => setExitPrice(target.value)}
            />
            <button type="submit">login</button>
          </form>
        </div>
      );
    } else {
      return (
        <div className="text-white">
          <h1>{tradeSingle.user}</h1>
          <h1>{tradeSingle.symbol}</h1>
          <h1>{tradeSingle.type}</h1>
          <h1>{tradeSingle.quantity}</h1>
          <h1>{tradeSingle.leverage}</h1>
          <h1>{tradeSingle.entry_date}</h1>
          <h1>{tradeSingle.entry_price}</h1>
          <h1>{tradeSingle.exit_date}</h1>
          <h1>{tradeSingle.exit_price}</h1>
          <h1>{tradeSingle.pnl}</h1>
          <h1>{tradeSingle.status}</h1>
        </div>
      );
    }
  }
}