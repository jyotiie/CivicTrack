const Pagination = ({ currentPage }) => (
  <div className="flex justify-center items-center gap-2 mt-6 mb-10">
    {[1, 2, 3, 4].map(n => (
      <button
        key={n}
        className={`w-8 h-8 rounded-full text-sm ${
          n === currentPage ? 'bg-black text-white' : 'border text-black'
        }`}
      >
        {n}
      </button>
    ))}
    <span className="text-gray-500">...</span>
    <button className="border w-8 h-8 rounded-full text-sm">11</button>
  </div>
);

export default Pagination;
