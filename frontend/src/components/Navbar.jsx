import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

export default function Navbar({ isAuthenticated }) {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");
  const isPrivilegedUser = userRole === "admin" || userRole === "professor";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="p-4 bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <h1 className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-200 transition duration-200">
            Notice Board
          </Link>
        </h1>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          {isAuthenticated && isPrivilegedUser && (
            <Link
              to="/dashboard"
              className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition duration-200"
            >
              Dashboard
            </Link>
          )}

          {isAuthenticated && (
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none px-3 py-2 rounded-lg shadow-md hover:shadow-lg transition duration-200"
            >
              <FiLogOut size={20} />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
