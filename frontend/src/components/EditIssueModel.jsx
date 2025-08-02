import { useState, useEffect } from "react";

const EditIssueModal = ({ issue, onClose, onSave }) => {
  const [formData, setFormData] = useState(issue);

  useEffect(() => {
    setFormData(issue);
  }, [issue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[90%] max-w-md shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-gray-500 text-xl">×</button>
        <h2 className="text-lg font-bold mb-4">Edit Issue</h2>

        <div className="space-y-3">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="distance"
            value={formData.distance}
            onChange={handleChange}
            type="number"
            placeholder="Distance (km)"
            className="w-full border px-3 py-2 rounded"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="Reported">Reported</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditIssueModal;
