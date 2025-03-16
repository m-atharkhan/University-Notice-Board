export default function NoticeCard({ notice }) {
  const formattedDate = new Date(notice.createdAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const creatorName = notice.createdBy?.fullName || "Unknown"; // Capital 'F'

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-semibold text-gray-800">{notice.title}</h2>
      <p className="text-gray-600 mt-2">{notice.content}</p>

      <div className="mt-4 flex justify-between items-center text-xs text-gray-400 italic">
        <p>📅 {formattedDate}</p>
        <p>👤 By {creatorName}</p>
      </div>
    </div>
  );
}
