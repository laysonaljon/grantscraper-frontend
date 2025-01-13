import React, { useState, useEffect } from 'react';
import Autocomplete from './autocomplete'; // Ensure this path is correct

const Filters = ({ onFilter, onClear, filters, selectedFilters }) => {
  const [localSelectedFilters, setLocalSelectedFilters] = useState({});

  useEffect(() => {
    setLocalSelectedFilters(selectedFilters); // Set local state based on props
  }, [selectedFilters]);

  const handleFilterChange = (filterId, values) => {
    const updatedFilters = { ...localSelectedFilters, [filterId]: values };
    setLocalSelectedFilters(updatedFilters);
  };

  const applyFilters = () => {
    onFilter(localSelectedFilters); // Call the onFilter function with updated filters when button is clicked
  };

  return (
    <div className="flex flex-col space-y-4">
      {filters.map((filter) => (
        filter.type === 'dropdown' && (
          <Autocomplete
            key={filter.id}
            label={filter.label}
            options={filter.options}
            placeholder={filter.placeholder}
            selectedValues={localSelectedFilters[filter.id] || []} // Use local selections for display
            onChange={(values) => handleFilterChange(filter.id, values)} // Update selections without applying yet
          />
        )
      ))}
      <div className="flex space-x-2">
        <button 
          onClick={applyFilters} // Attach the click handler to apply filters
          className="p-2 bg-blue-500 text-white rounded"
        >
          Apply Filters
        </button>
        <button 
          onClick={() => { 
            onClear(); 
            setLocalSelectedFilters({}); // Clear local filter selections as well 
          }} 
          className="p-2 bg-gray-500 text-white rounded"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
