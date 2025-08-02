import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="flex justify-between items-center p-4 border-b">
    <Link to="/" className="text-2xl font-bold text-black hover:text-blue-600">
      CivicTrack
    </Link>
    
    <Link to="/login">
      <button className="px-5 py-1.5 bg-pink-100 text-black rounded-full hover:bg-pink-200">
        Login
      </button>
    </Link>
  </nav>
);

export default Navbar;
