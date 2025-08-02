import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white p-8 shadow-md rounded-xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>

          <form className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-pink-200"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-pink-200"
                placeholder="10-digit mobile number"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-pink-200"
                placeholder="Your email"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-pink-200"
                placeholder="Choose a password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
            >
              Register
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-pink-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
