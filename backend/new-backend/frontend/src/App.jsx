import { useState, useEffect } from "react";
import MainLayout from "./components/MainLayout";
import LoginForm from "./components/LoginForm";
import { Trades, SingleTrade } from "./components/Trades";
import { Routes, Route, Link } from "react-router-dom";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // switch page after
  useEffect(() => {
    const user = window.localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }

    setIsLoggedIn(!!user);
    console.log("user after login", user);
  }, [isLoggedIn]);

  return (
    <Routes>
      <Route path="/" element={<Root user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}>
        <Route path="trades" element={<Trades user={user} />}>
          <Route path=":id" element={<SingleTrade/>} />
        </Route>
      </Route>
    </Routes>
  );

}

function Root ({ user, setUser, isLoggedIn, setIsLoggedIn }) {
  return (
    // main layout
    <div className="h-screen w-sceen bg-blue-950 bg-opacity-95">
      {isLoggedIn ? (<MainLayout user={user}/>) : (<LoginForm setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>)}
    </div>
  );
}



  // const [message, setMessage] = useState(null);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [user, setUser] = useState(null);
  // const [data, setData] = useState(null);
  // const [trades, setTrades] = useState(null);



  // const handleLogout = (event) => {
  //   event.preventDefault();
  //   try {
  //     auth.logout();
  //     setUser(null);
  //     setData(null);
  //     setMessage("Logged out");
  //     setTimeout(() => {
  //       setMessage(null);
  //     }, 5000);
  //   } catch (exception) {
  //     setMessage("Error logging out");
  //     setTimeout(() => {
  //       setMessage(null);
  //     }, 5000);
  //   }
  // };

  // const handleGetTrades = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const trades = await tradeapi.getTrades();
  //     setTrades(trades);
  //     setMessage("Trades fetched");
  //     setTimeout(() => {
  //       setMessage(null);
  //     }, 5000);
  //   } catch (exception) {
  //     setMessage("Error fetching trades");
  //     setTimeout(() => {
  //       setMessage(null);
  //     }, 5000);
  //   }
  
  // console.log("trades", trades);
  // };

  // useEffect(() => {
  //   if (user) {
  //     const fetchData = async (token) => {
  //       console.log("fetching data", token);
  //       const data = await auth.getProtected(token);
  //       setData(data);
  //     };
  //     fetchData(user.access);
  //   }
  // }, [user]);

  // useEffect(() => {
  //   const loggedUser = window.localStorage.getItem("user");
  //   if (loggedUser) {
  //     const user = JSON.parse(loggedUser);
  //     setUser(user);

  //     const fetchData = async (token) => {
  //       console.log("fetching data", token);
  //       const data = await auth.getProtected(token);
  //       setData(data);
  //     };
  //     fetchData(user.access);
  //   }
  // }, []);


  // return (
  //   <div>
  //     <h1>My App</h1>
  //     <h1>{message}</h1>
  //     {user === null && (
  //       <form onSubmit={handleLogin}>
  //         <input
  //           type="email"
  //           value={email}
  //           name="Email"
  //           onChange={({ target }) => setEmail(target.value)}
  //         />
  //         <input
  //           type="password"
  //           value={password}
  //           name="Password"
  //           onChange={({ target }) => setPassword(target.value)}
  //         />
  //         <button type="submit">login</button>
  //       </form>
  //     )}
  //     {user !== null && <div> {user.access} logged in</div>}
  //     {user !== null && <div> {user.email} email</div>}
  //     {data !== null && <div>{data.email}</div>}
  //     {user !== null && <button onClick={handleLogout}>logout</button>}
  //     {user !== null && <button onClick={handleGetTrades}>get trades</button>}
  //   </div>
  // );