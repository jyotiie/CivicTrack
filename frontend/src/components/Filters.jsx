const Filters = () => (
  <div className="flex flex-wrap gap-4 p-4">
    <select className="border px-4 py-2 rounded w-40">
      <option>Category</option>
    </select>
    <select className="border px-4 py-2 rounded w-40">
      <option>Status</option>
    </select>
    <select className="border px-4 py-2 rounded w-40">
      <option>Distance</option>
    </select>
    <input
      type="text"
      placeholder="Search Issues"
      className="border px-4 py-2 rounded flex-1 min-w-[200px]"
    />
  </div>
);

export default Filters;
