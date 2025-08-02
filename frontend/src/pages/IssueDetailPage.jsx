import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const sampleIssues = [
  {
    id: 1,
    image: "/pothole.jpg",
    category: "Road",
    status: "In Progress",
    date: "Aug 02, 2025",
    title: "Pothole on main road",
    description: "The road is damaged and difficult to travel on.",
    location: "Sector 12",
    distance: 2.5,
  },
  {
    id: 2,
    image: "/street-light.jpg",
    category: "Streetlight",
    status: "Resolved",
    date: "Jul 29, 2025",
    title: "Streetlight not working",
    description: "Dark at night due to streetlight outage.",
    location: "Sector 10",
    distance: 1.2,
  },
];

const IssueDetailPage = () => {
  const { id } = useParams(); // get id from URL
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);

  useEffect(() => {
    // simulate fetching issue from DB by ID
    const found = sampleIssues.find((i) => i.id === Number(id));
    setIssue(found);
  }, [id]);

  if (!issue) {
    return (
      <div>
        <Navbar />
        <div className="p-6 text-center text-gray-500">Loading issue...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-gray-200 rounded"
        >
          ← Back
        </button>

        <div className="bg-white rounded shadow p-6">
          <img
            src={issue.image}
            alt={issue.title}
            className="w-full h-64 object-cover rounded mb-4"
          />
          <div className="text-xs text-gray-500 flex items-center gap-4 mb-2">
            <span className="bg-orange-100 px-2 py-0.5 rounded">{issue.category}</span>
            <span className="text-blue-600 font-medium">{issue.status}</span>
            <span>{issue.date}</span>
          </div>
          <h1 className="text-xl font-bold mb-2">{issue.title}</h1>
          <p className="text-gray-700 mb-2">{issue.description}</p>
          <p className="text-sm text-gray-500">
            📍 {issue.location} • {issue.distance} km
          </p>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailPage;
