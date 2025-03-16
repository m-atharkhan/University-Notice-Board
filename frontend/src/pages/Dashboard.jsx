import { useEffect, useState } from "react";
import { createNotice, fetchNotices, deleteNotice } from "../services/api";

const Dashboard = () => {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState({});

 
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");
    if (storedUser) setUser({fullname: storedUser, id:id, role:role});
  }, []);


  const getNotices = async () => {
    try {
      const res = await fetchNotices();
      setNotices(res.data);
    } catch (error) {
      console.error("Error fetching notices:", error);
      alert("Failed to fetch notices.");
    }
  };

  useEffect(() => {
    getNotices();
  }, []);

  
  const handleAddNotice = async () => {
    if (!title.trim() || !content.trim()) {
      return alert("Both title and content are required!");
    }

    try {
      await createNotice({ title, content });
      setTitle("");
      setContent("");
      await getNotices();
    } catch (error) {
      console.error("Error adding notice:", error);
      alert("Failed to add notice.");
    }
  };

 
  const handleDeleteNotice = async (id) => {
    try {
      await deleteNotice(id);
      await getNotices();
    } catch (error) {
      console.error("Error deleting notice:", error);
      alert("Failed to delete notice.");
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* User Name Heading */}
      <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6 shadow-md p-2 rounded">
        Welcome
        {/* , <span className="text-green-600">{user.fullName || "User"}</span>! */}
      </h1>

      {/* Add Notice Section */}
      <div className="flex flex-col md:flex-row gap-2 mb-6">
        <input
          type="text"
          placeholder="Notice Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full md:w-1/3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <input
          type="text"
          placeholder="Notice Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 w-full md:w-1/2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <button
          onClick={handleAddNotice}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 shadow-md"
        >
          Add Notice
        </button>
      </div>

      {/* Notice List */}
      <ul className="space-y-4">
        {notices.map((notice) => (
          <li
            key={notice._id}
            className="border rounded-lg p-4 shadow-md bg-white flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{notice.title}</h2>
              <p className="text-gray-700">{notice.content}</p>
              <p className="text-sm text-gray-500 mt-1">
                Posted by:{" "}
                <span className="font-medium">
                  {notice.createdBy?.fullName || "Unknown"}
                </span>
              </p>
            </div>

            {/* Delete Button */}
            {(notice.createdBy?._id === user.id || user.role === "admin") && (
              <button
                onClick={() => handleDeleteNotice(notice._id)}
                className="mt-2 md:mt-0 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 shadow-md"
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
