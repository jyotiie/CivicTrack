const Filters = ({
  query,
  onQueryChange,
  onCategoryChange,
  onStatusChange,
  onDistanceChange,
  onClearFilters, // Add this prop to reset filters
}) => (
  <div className="flex flex-wrap gap-4 p-4 items-center">
    <div>
      <label className="block text-sm mb-1">Category</label>
      <select
        className="border px-4 py-2 rounded w-40"
        onChange={onCategoryChange}
      >
        <option value="">All Categories</option>
        <option value="Streetlight">Streetlight</option>
        <option value="Road">Road</option>
        <option value="Garbage Collection">Garbage Collection</option>
      </select>
    </div>

    <div>
      <label className="block text-sm mb-1">Status</label>
      <select
        className="border px-4 py-2 rounded w-40"
        onChange={onStatusChange}
      >
        <option value="">All Statuses</option>
        <option value="Reported">Reported</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
      </select>
    </div>

    <div>
      <label className="block text-sm mb-1">Distance</label>
      <select
        className="border px-4 py-2 rounded w-40"
        onChange={onDistanceChange}
      >
        <option value="">Any Distance</option>
        <option value="1">Within 1 km</option>
        <option value="2">Within 2 km</option>
        <option value="3">Within 3 km</option>
      </select>
    </div>

    <div className="flex flex-col flex-1 min-w-[200px]">
      <label className="text-sm mb-1">Search</label>
      <input
        type="text"
        placeholder="Search Issues"
        value={query}
        onChange={onQueryChange}
        className="border px-4 py-2 rounded"
      />
    </div>

    <button
      onClick={onClearFilters}
      className="mt-6 sm:mt-5 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
    >
      Clear Filters
    </button>
  </div>
);

export default Filters;
