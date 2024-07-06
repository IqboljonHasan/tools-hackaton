"use client"
import { useState } from "react";

const Home = () => {
  const [businessType, setBusinessType] = useState("");
  const [toolCategory, setToolCategory] = useState("");

  const tools = [
    // Dummy data, replace with real data
    { name: "Tool 1", businessType: "landscaping", category: "communication" },
    // Add more tools
  ];

  const filteredTools = tools.filter(
    (tool) =>
      (businessType ? tool.businessType === businessType : true) &&
      (toolCategory ? tool.category === toolCategory : true)
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Operations Tools</h1>
      <div className="mb-4">
        <label>
          Business Type:
          <select value={businessType} onChange={(e) => setBusinessType(e.target.value)}>
            <option value="">All</option>
            <option value="landscaping">Landscaping</option>
            {/* Add more options */}
          </select>
        </label>
      </div>
      <div className="mb-4">
        <label>
          Tool Category:
          <select value={toolCategory} onChange={(e) => setToolCategory(e.target.value)}>
            <option value="">All</option>
            <option value="communication">Communication</option>
            {/* Add more options */}
          </select>
        </label>
      </div>
      <div>
        {filteredTools.map((tool, index) => (
          <div key={index} className="mb-2">
            {tool.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
