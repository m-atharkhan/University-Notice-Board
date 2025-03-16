import { useState } from "react";
import { signup } from "../services/api";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    registrationId: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg space-y-4"
      >
        <div className="flex items-center justify-center mb-4">
          <FaUserPlus className="text-3xl text-blue-500" />
          <h2 className="text-2xl font-bold ml-2">Signup</h2>
        </div>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Registration ID"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.registrationId}
          onChange={(e) => setFormData({ ...formData, registrationId: e.target.value })}
          required
        />

        <select
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          required
        >
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="professor">Professor</option>
        </select>

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
          Signup
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
