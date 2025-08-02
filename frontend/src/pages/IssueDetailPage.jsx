import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const IssueDetailPage = () => {
  const { id } = useParams(); // get id from URL
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIssue = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`https://civictrack-qc7g.onrender.com/v1/civic-reports/${id}`);
        if (!res.ok) throw new Error("Failed to fetch issue");
        const data = await res.json();
        setIssue(data);
      } catch (err) {
        setError(err.message || "Error loading issue");
      } finally {
        setLoading(false);
      }
    };
    fetchIssue();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="p-6 text-center text-gray-500">Loading issue...</div>
      </div>
    );
  }
  if (error || !issue) {
    return (
      <div>
        <Navbar />
        <div className="p-6 text-center text-red-500">{error || "Issue not found."}</div>
      </div>
    );
  }

  // Pick an image based on category or fallback
  const images = {
    Road: "/pothole.jpg",
    Streetlight: "/street-light.jpg",
    "Garbage Collection": "/Garbage.jpg"
  };
  const imageUrl = images[issue.category] || "/Garbage.jpg";

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
            src={imageUrl}
            alt={issue.subject}
            className="w-full h-64 object-cover rounded mb-4"
          />
          <div className="text-xs text-gray-500 flex items-center gap-4 mb-2">
            <span className="bg-orange-100 px-2 py-0.5 rounded">{issue.category}</span>
            <span className="text-blue-600 font-medium">{issue.status}</span>
            <span>{issue.createdAt ? new Date(issue.createdAt).toLocaleDateString() : ""}</span>
          </div>
          <h1 className="text-xl font-bold mb-2">{issue.subject}</h1>
          <p className="text-gray-700 mb-2">{issue.description}</p>
          <p className="text-sm text-gray-500">
            📍 {issue.location && issue.location.address ? issue.location.address : "Unknown location"}
          </p>

          {/* History Section */}
          {Array.isArray(issue.history) && issue.history.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Status History</h2>
              <ul className="space-y-2">
                {issue.history.map((h, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-sm">
                    <span className="font-medium">{h.status}</span>
                    <span className="text-gray-400">
                      {h.date ? new Date(h.date).toLocaleString() : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueDetailPage;