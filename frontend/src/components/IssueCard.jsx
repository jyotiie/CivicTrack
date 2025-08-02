const IssueCard = ({ issue }) => (
  <div className="border rounded-xl p-4 w-full max-w-[300px] shadow-sm">
    <img src={issue.image} alt="" className="rounded-lg h-32 w-full object-cover" />
    <div className="mt-2">
      <div className="text-xs text-gray-500 flex items-center gap-2">
        <span className="bg-orange-100 px-2 py-0.5 rounded">{issue.category}</span>
        <span className="text-blue-600 font-medium">{issue.status}</span>
        <span>{issue.date}</span>
      </div>
      <h3 className="text-sm font-bold mt-1">{issue.title}</h3>
      <p className="text-sm text-gray-600">{issue.description}</p>
      <p className="text-xs text-gray-500 mt-1">{issue.location} • {issue.distance} km</p>
    </div>
  </div>
);

export default IssueCard;
