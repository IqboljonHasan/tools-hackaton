import { useEffect, useState } from "react";

// Modal Component with Form Fields
const NewToolModal = ({ isOpen, onClose }) => {
  const [toolUrl, setToolUrl] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any necessary form validation
    // Submit logic can be added here
    console.log("Tool URL:", toolUrl);
    console.log("Email Address:", emailAddress);
    // Close the modal after submission
    onClose();
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Add New Tool</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="toolUrl" className="block text-sm font-medium text-gray-700">
              Tool URL:
            </label>
            <input
              type="text"
              id="toolUrl"
              value={toolUrl}
              onChange={(e) => setToolUrl(e.target.value)}
              placeholder="Enter tool URL"
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700">
              Email Address:
            </label>
            <input
              type="email"
              id="emailAddress"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              placeholder="Enter email address"
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Home = () => {
  const [businessType, setBusinessType] = useState("");
  const [tools, setTools] = useState([]);
  const [toolCategory, setToolCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal open/close

  const url = process.env.NEXT_API_URL || "http://localhost:3000/api";

  const fetchTools = async () => {
    try {
      const res = await fetch(url + "/tools");
      const data = await res.json();
      setTools(data);
    } catch (error) {
      console.error("Error fetching tools:", error);
    }
  };

  const filteredTools = tools.filter(
    (tool) =>
      (businessType ? tool.businessType === businessType : true) &&
      (toolCategory ? tool.category === toolCategory : true)
  );

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchTools();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Operations Tools</h1>
      {/* Button to open modal */}
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mb-4"
        onClick={openModal}
      >
        Add New Tool
      </button>

      {/* Modal Component */}
      <NewToolModal isOpen={isModalOpen} onClose={closeModal} />

      <div className="mb-4">
        <label className="block mb-2">
          Business Type:
          <select
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="px-3 py-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All</option>
            <option value="landscaping">Landscaping</option>
            {/* Add more options */}
          </select>
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2">
          Tool Category:
          <select
            value={toolCategory}
            onChange={(e) => setToolCategory(e.target.value)}
            className="px-3 py-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All</option>
            <option value="communication">Communication</option>
            <option value="email">Email</option>
            {/* Add more options */}
          </select>
        </label>
      </div>
      <div>
        <table className="min-w-full bg-white border rounded-lg shadow-md overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold">Name</th>
              <th className="px-6 py-3 text-left text-sm font-bold">Category</th>
              <th className="px-6 py-3 text-left text-sm font-bold">Business Type</th>
              <th className="px-6 py-3 text-left text-sm font-bold">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTools.map((tool, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{tool.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{tool.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{tool.businessType}</td>
                <td className="px-6 py-4 whitespace-nowrap">{tool.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
