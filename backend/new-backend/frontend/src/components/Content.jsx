import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import Trades from "./Trades";
import Ideas from "./Ideas";
import Tools from "./Tools";

function Content({ dashboard, trades, ideas, tools, user }) {

  if (dashboard) {
    return (
      <div className="w-screen h-full bg-blue-950">
        <Dashboard />
      </div>);
  } else if (trades) {
    return (
      <div className="w-screen h-full bg-blue-950 overflow-auto">
        <Trades user={user}/>
      </div>);
  } else if (ideas) {
    return (
      <div className="w-screen h-full bg-red-500">
        <Ideas />
      </div>);
  } else if (tools) {
    return (
      <div className="w-screen h-full bg-red-500">
        <Tools />
      </div>);
  } else {
    return (
      <div className="w-10/12 h-full bg-red-500">
        <h1>Something is wrong</h1>
      </div>);
  }
}
export default Content;




// import trades from "../api/trades";
// import SingleTrade from "./SingleTrade";
// import { useState, useEffect } from "react";

// function Content({ user }) {
//   const [myTrades, setMyTrades] = useState(null);

//   const handleGetMyTrades = async () => {
//     try {
//       const myTrades = await trades.getTrades();
//       setMyTrades(myTrades);
//       console.log("myTrades", myTrades);
//     } catch (exception) {
//       console.log("exception", exception);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       handleGetMyTrades();
//     }
//   }, [user]);

//   if (!myTrades) {
//     return (
//       <div className="flex flex-col w-full h-full bg-blue-400">
//         <h1>Loading....</h1>
//       </div>
//     );
//   } else {
//     return (
//       <div className="flex flex-col w-full h-full items-center bg-blue-400">
//         {/* map trades */}

//         <div className="w-11/12 h-5/6 bg-blue-950">
//           {myTrades.map((trade) => (
//               <SingleTrade key={trade.id} trade={trade} />
//           ))}
//         </div>
//       </div>
//     );
//   }
// }

// export default Content;
