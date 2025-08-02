import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const payload = {
        username: form.name,
        password: form.password,
        email: form.email,
      };
      const res = await fetch("https://civictrack-qc7g.onrender.com/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Registration successful! Please login.");
        setForm({ name: "", phone: "", email: "", password: "" });
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (err) {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white p-8 shadow-md rounded-xl">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Create an Account
          </h2>

          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <label className="block mb-1 text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-pink-200"
                placeholder="Your full name"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-pink-200"
                placeholder="10-digit mobile number"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-pink-200"
                placeholder="Your email"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-pink-200"
                placeholder="Choose a password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          {message && (
            <div className="mt-4 text-center text-sm text-red-500">
              {message}
            </div>
          )}

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
