// components/Filter.js
export default function Filter({ setFilters }) {
    const handleFilterChange = (e) => {
      setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    return (
      <div>
        <label>
          Business Type
          <input type="text" name="businessType" onChange={handleFilterChange} />
        </label>
        <label>
          Category
          <input type="text" name="category" onChange={handleFilterChange} />
        </label>
      </div>
    );
  }
  