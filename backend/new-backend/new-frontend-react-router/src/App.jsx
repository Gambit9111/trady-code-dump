import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import { getUser } from "./utils/auth";

import AuthLogin from "./components/AuthLogin";
import AuthRegister from "./components/AuthRegister";

import LayoutMain from "./components/LayoutMain";

import ContentTrades from "./components/ContentTrades";
import ContentTradeSingle from "./components/ContentTradeSingle";

import ContentTools from "./components/ContentTools";

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUser().then((user) => {
      if (user) {
        setUser(JSON.parse(user));
        console.log("user is logged in", user);
      } else {
        setUser(null);
        console.log("user is not logged in", user);
        navigate("/login");
      }
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LayoutMain user={user} />}>
        <Route path="*" element={<h1>404</h1>} />
        <Route index element={<h1>Welcome</h1>} />
        <Route path="dashboard" element={<h1>Dashboard</h1>} />

        <Route path="trades" element={<ContentTrades />}>
          <Route path="*" element={<h1>404</h1>} />

          <Route path=":tradeId" element={<ContentTradeSingle />} />
        </Route>

        <Route path="ideas" element={<h1>Ideas</h1>} />
        <Route path="tools" element={<ContentTools />} />
      </Route>

      <Route path="/login" element={<AuthLogin />} />

      <Route path="/register" element={<AuthRegister />} />
    </Routes>
  );
}
