import { useState } from "react";
import auth from "../api/auth";

function LoginForm({ setIsLoggedIn, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await auth.login({
        email,
        password,
      });
      setUser(user);
      setIsLoggedIn(true);
      window.localStorage.setItem("user", JSON.stringify(user));
      setEmail("");
      setPassword("");
      console.log("user login form", user);
    } catch (exception) {
      console.log("exception", exception);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
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

export default LoginForm;
