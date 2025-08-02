import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import IssueCard from "../components/IssueCard";
import Pagination from "../components/Pagination";
import { useState } from "react";

const sampleIssues = [
  {
    image: "/street-light.jpg",
    category: "Streetlight",
    status: "In Progress",
    date: "Aug 14",
    title: "Streetlight not working",
    description: "Street light not working since last 2 days",
    location: "Gota bridge, Ahmedabad",
    distance: 2.8,
  },
  {
    image: "/pothole.jpg",
    category: "Road",
    status: "Reported",
    date: "Jun 02",
    title: "Pothole on main road",
    description: "The main road is riddled with potholes.",
    location: "C.G road, Ahmedabad",
    distance: 1.1,
  },
  {
    image: "/Garbage.jpg",
    category: "Garbage Collection",
    status: "",
    date: "Jun 25",
    title: "Garbage not collected",
    description: "Garbage is not collected since week.",
    location: "IT society, Ahmedabad",
    distance: 1.1,
  },
  // Add more sample issues if needed
];

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [distance, setDistance] = useState("");

  const filteredIssues = sampleIssues.filter((issue) => {
    const matchesQuery = issue.title.toLowerCase().includes(query.toLowerCase());
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
        {filteredIssues.length > 0 ? (
          filteredIssues.map((issue, idx) => (
<IssueCard key={idx} issue={issue} onClick={() => {}} />
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
