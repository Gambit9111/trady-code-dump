import auth from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function AuthLogout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate("/login");
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className="w-24 sm:w-full h-8 border-solid border border-yellow-950 rounded-sm text-center text-sm font-bold"
      >
        Logout
      </button>
    </>
  );
}
