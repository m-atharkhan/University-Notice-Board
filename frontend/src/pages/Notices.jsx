import { useEffect, useState } from "react";
import { fetchNotices } from "../services/api";
import NoticeCard from "../components/NoticeCard";
import Navbar from "../components/Navbar";

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [sortedNotices, setSortedNotices] = useState([]);
  const [sortBy, setSortBy] = useState("date");

  const isAuthenticated = !!localStorage.getItem("token");

  // Fetch Notices
  const getNotices = async () => {
    try {
      const res = await fetchNotices();
      setNotices(res.data);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  // Fetch notices on initial load
  useEffect(() => {
    getNotices();
  }, []);

  // Handle Sorting whenever 'notices' or 'sortBy' changes
  useEffect(() => {
    const sorted = [...notices].sort((a, b) => {
      if (sortBy === "name") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "date") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0;
    });
    setSortedNotices(sorted);
  }, [notices, sortBy]);

  // Update sorting option
  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} />

      <div className="min-h-screen flex flex-col items-center justify-start p-4 bg-gray-100">
        <div className="w-full min-h-screen max-w-5xl bg-white p-6 rounded-lg shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-800">📢 Notices</h1>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 w-full">
            <div className="w-full sm:w-auto">
              <label className="block mb-2 font-semibold text-gray-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={handleSort}
                className="w-full sm:w-auto p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="date">Date (newest first)</option>
                <option value="name">Name (A - Z)</option>
              </select>
            </div>
          </div>

          {sortedNotices.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedNotices.map((notice) => (
                <NoticeCard key={notice._id} notice={notice} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-6">No notices available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
