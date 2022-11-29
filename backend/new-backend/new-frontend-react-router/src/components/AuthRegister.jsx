import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

import auth from "../api/auth";

export default function AuthRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const register = await auth.register({ email, password });
      setEmail("");
      setPassword("");
      console.log("Register", register);
      navigate("/login");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="h-screen w-sceen bg-blue-950 bg-opacity-95">
      <h1 className="text-3xl"> Register </h1>
      <Link to="/login"><h1 className="text-1xl"> Login </h1></Link>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          name="Email"
          onChange={({ target }) => setEmail(target.value)}
        />
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type="submit">login</button>
      </form>
    </div>
  );
}
