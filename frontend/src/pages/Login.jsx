import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

export default function Login() {
  const [formData, setFormData] = useState({
    registrationId: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("user", res.data.user.fullname);
      localStorage.setItem("id", res.data.user._id);
      navigate("/");
    } catch (err) {
      alert("Login Failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg space-y-4"
      >
        <div className="flex items-center justify-center mb-4">
          <FaSignInAlt className="text-3xl text-blue-500" />
          <h2 className="text-2xl font-bold ml-2">Login</h2>
        </div>

        <input
          type="text"
          placeholder="Registration ID"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.registrationId}
          onChange={(e) => setFormData({ ...formData, registrationId: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-all duration-200"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}
