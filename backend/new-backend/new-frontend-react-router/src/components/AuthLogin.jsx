import { useState } from "react";
import auth from "../api/auth";
import localforage from "localforage";
import { useNavigate, Link } from "react-router-dom";

export default function AuthLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await auth.login({ email, password });
      localforage.setItem("user", JSON.stringify(user));
      setEmail("");
      setPassword("");
      console.log("user logged in", user);
      navigate("/dashboard");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="h-screen w-sceen bg-blue-950 bg-opacity-95">
      <h1 className="text-3xl"> Login </h1>
      <Link to="/register"><h1 className="text-1xl"> Register </h1></Link>
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
