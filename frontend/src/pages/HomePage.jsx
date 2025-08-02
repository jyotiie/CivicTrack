import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import IssueCard from "../components/IssueCard";
import Pagination from "../components/Pagination";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [distance, setDistance] = useState("");

  useEffect(() => {
    const images = [
      "/street-light.jpg",
      "/pothole.jpg",
      "/Garbage.jpg"
    ];
    const fetchIssues = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("https://civictrack-qc7g.onrender.com/v1/civic-reports");
        if (!res.ok) throw new Error("Failed to fetch issues");
        const data = await res.json();
        const mapped = data.map((r, idx) => ({
          image: images[idx % images.length],
          category: r.category,
          status: r.status,
          date: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "",
          title: r.subject,
          description: r.description,
          location: r.location && r.location.address ? r.location.address : "",
          distance: r.location && r.location.distance ? r.location.distance : 0,
          _id: r._id,
        }));
        setIssues(mapped);
      } catch (err) {
        setError(err.message || "Error loading issues");
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, []);

  const filteredIssues = issues.filter((issue) => {
    const matchesQuery = issue.title && issue.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category ? issue.category === category : true;
    const matchesStatus = status ? issue.status === status : true;
    const matchesDistance = distance ? issue.distance <= parseFloat(distance) : true;
    return matchesQuery && matchesCategory && matchesStatus && matchesDistance;
  });

  return (
    <div>
      <Navbar />
      {/* Filters section */}
      <div className="flex flex-wrap gap-4 p-4">
        <select
          className="border px-4 py-2 rounded w-40"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Category</option>
          <option value="Streetlight">Streetlight</option>
          <option value="Road">Road</option>
          <option value="Garbage Collection">Garbage Collection</option>
        </select>

        <select
          className="border px-4 py-2 rounded w-40"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Status</option>
          <option value="Reported">Reported</option>
          <option value="In Progress">In Progress</option>
        </select>

        <select
          className="border px-4 py-2 rounded w-40"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        >
          <option value="">Distance</option>
          <option value="1">Within 1 km</option>
          <option value="2">Within 2 km</option>
          <option value="3">Within 3 km</option>
        </select>

        <input
          type="text"
          placeholder="Search Issues"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border px-4 py-2 rounded flex-1 min-w-[200px]"
        />
      </div>

      {/* Issue cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {loading ? (
          <div className="text-center col-span-full text-gray-500">Loading issues...</div>
        ) : error ? (
          <div className="text-center col-span-full text-red-500">{error}</div>
        ) : filteredIssues.length > 0 ? (
          filteredIssues.map((issue, idx) => (
            <IssueCard key={issue._id || idx} issue={issue} onClick={() => {}} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No issues found.</p>
        )}
      </div>

      <Pagination currentPage={1} />
    </div>
  );
};

export default HomePage;