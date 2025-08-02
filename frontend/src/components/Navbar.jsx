import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <Link to="/" className="text-2xl font-bold text-black hover:text-blue-600">
        CivicTrack
      </Link>

      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="px-5 py-1.5 bg-red-100 text-black rounded-full hover:bg-red-200"
        >
          Logout
        </button>
      ) : (
        <Link to="/login">
          <button className="px-5 py-1.5 bg-pink-100 text-black rounded-full hover:bg-pink-200">
            Login
          </button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
