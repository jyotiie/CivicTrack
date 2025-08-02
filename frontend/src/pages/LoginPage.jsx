import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white p-8 shadow-md rounded-xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Login to CivicTrack</h2>

          <form className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-pink-200"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-pink-200"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-pink-500 hover:underline">
              Register Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
