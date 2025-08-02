import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import IssueCard from "../components/IssueCard";
import Pagination from "../components/Pagination";

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
  // repeat if needed
];

const HomePage = () => (
  <div>
    <Navbar />
    <Filters />
    <div className="flex flex-wrap gap-6 justify-center px-4">
      {sampleIssues.map((issue, idx) => (
        <IssueCard key={idx} issue={issue} />
      ))}
    </div>
    <Pagination />
  </div>
);

export default HomePage;
