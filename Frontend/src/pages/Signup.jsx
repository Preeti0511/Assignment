import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
const [error, setError] = useState("");
const [fieldError, setFieldError] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");
  setFieldError({});

  let errors = {};

  if (!form.name) errors.name = "Name is required";
  if (!form.email) errors.email = "Email is required";
  if (!form.password) errors.password = "Password is required";

  if (Object.keys(errors).length > 0) {
    setFieldError(errors);
    return;
  }

  try {
    await dispatch(signup(form)).unwrap();
    navigate("/login");
  } catch (err) {
    setError(err);
  }
};

  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <form
    onSubmit={handleSubmit}
    className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
  >
    <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

    {/* Name */}
    <input
      type="text"
      placeholder="Name"
      onChange={(e) =>
        setForm({ ...form, name: e.target.value })
      }
      className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
{fieldError.name && (
  <p className="text-red-500 text-xs mt-1">
    {fieldError.name}
  </p>
)}
    {/* Email */}
    <input
      type="email"
      placeholder="Email"
      onChange={(e) =>
        setForm({ ...form, email: e.target.value })
      }
      className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
 {fieldError.email && (
  <p className="text-red-500 text-xs mt-1">
    {fieldError.email}
  </p>
)}
    {/* Password */}
    <input
      type="password"
      placeholder="Password"
      onChange={(e) =>
        setForm({ ...form, password: e.target.value })
      }
      className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
      {fieldError.password && (
  <p className="text-red-500 text-xs mt-1">
    {fieldError.password}
  </p>
)}
{error && (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
    {error}
  </div>
)}

    {/* Signup Button */}
    <button
      type="submit"
      className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
    >
      Signup
    </button>

    {/* Login Redirect */}
    <p className="text-center text-sm text-gray-600 mt-4">
      Already have an account?{" "}
      <Link
        to="/login"
        className="text-blue-500 font-semibold hover:underline"
      >
        Login
      </Link>
    </p>
  </form>
</div>
  );
}