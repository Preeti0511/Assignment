import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(login(form));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    } else {
     setError(res.payload);
    }
  };

  return (
  
<div className="min-h-screen flex items-center justify-center bg-gray-100">
  <form
    onSubmit={handleSubmit}
    className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
  >
    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

    {/* Email */}
    <input
      type="email"
      placeholder="Email"
      onChange={(e) =>
        setForm({ ...form, email: e.target.value })
      }
      className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    {/* Password */}
    <input
      type="password"
      placeholder="Password"
      onChange={(e) =>
        setForm({ ...form, password: e.target.value })
      }
      className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
{error && (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
    {error}
  </div>
)}
    {/* Login Button */}
    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
    >
      Login
    </button>

    {/* Signup Redirect */}
    <p className="text-center text-sm text-gray-600 mt-4">
      Don’t have an account?{" "}
      <Link
        to="/"
        className="text-blue-500 font-semibold hover:underline"
      >
        Signup
      </Link>
    </p>
  </form>
</div>
  );
}