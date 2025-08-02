import { useNavigate } from "react-router-dom"; // navigation
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import IssueCard from "../components/IssueCard";
import { useState } from "react";
import EditIssueModal from "../components/EditIssueModel";

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

const UserHomePage = () => {
  const [issues, setIssues] = useState(sampleIssues);
  const [tab, setTab] = useState("myIssues");

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [distance, setDistance] = useState("");

  const [editingIssue, setEditingIssue] = useState(null);

  const handleQueryChange = (e) => setQuery(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);
  const handleDistanceChange = (e) => setDistance(e.target.value);

  const handleClearFilters = () => {
    setQuery("");
    setCategory("");
    setStatus("");
    setDistance("");
  };

  const filteredIssues = issues.filter((issue) => {
    const matchesQuery =
      query === "" ||
      issue.title.toLowerCase().includes(query.toLowerCase()) ||
      issue.description.toLowerCase().includes(query.toLowerCase());

    const matchesCategory = category === "" || issue.category === category;
    const matchesStatus = status === "" || issue.status === status;
    const matchesDistance =
      distance === "" || issue.distance <= parseFloat(distance);

    return matchesQuery && matchesCategory && matchesStatus && matchesDistance;
  });

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this issue?");
    if (confirm) {
      setIssues((prevIssues) => prevIssues.filter((issue) => issue.id !== id));
    }
  };

  const handleEdit = (issue) => {
    setEditingIssue(issue);
  };

  const handleSave = (updatedIssue) => {
    setIssues((prevIssues) =>
      prevIssues.map((issue) =>
        issue.id === updatedIssue.id ? updatedIssue : issue
      )
    );
    setEditingIssue(null);
  };

  const handleCloseModal = () => {
    setEditingIssue(null);
  };

  const navigate = useNavigate(); // 👈 for navigating to detail page

  return (
    <div>
      <Navbar />
      <div className="w-full flex flex-col items-center p-4">
        <div className="flex justify-between w-full max-w-6xl mb-4 flex-wrap gap-4">
          <div className="flex gap-4">
            <button
              onClick={() => setTab("myIssues")}
              className={`px-4 py-2 rounded ${
                tab === "myIssues" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              My Issues
            </button>
            <button
              onClick={() => setTab("report")}
              className={`px-4 py-2 rounded ${
                tab === "report" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              Report New Issue
            </button>
          </div>

          <Filters
            query={query}
            onQueryChange={handleQueryChange}
            onCategoryChange={handleCategoryChange}
            onStatusChange={handleStatusChange}
            onDistanceChange={handleDistanceChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        {tab === "myIssues" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl w-full">
            {filteredIssues.length > 0 ? (
              filteredIssues.map((issue) => (
                <IssueCard
                  key={issue.id}
                  issue={issue}
                  showActions
                  onEdit={() => handleEdit(issue)}
                  onDelete={() => handleDelete(issue.id)}
                  onClick={() => navigate(`/issue/${issue.id}`)} // 👈 navigate on card click
                />
              ))
            ) : (
              <p className="text-gray-500 text-center w-full">No matching issues found.</p>
            )}
          </div>
        ) : (
          <div className="max-w-2xl w-full bg-gray-100 p-6 rounded">
            <p className="text-center">Form to report new issue goes here (Screen 5)</p>
          </div>
        )}
      </div>

      {editingIssue && (
        <EditIssueModal
          issue={editingIssue}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default UserHomePage;
