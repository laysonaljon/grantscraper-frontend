import React, { useState, useEffect } from 'react';
import Autocomplete from './autocomplete'; // Ensure this path is correct

const Filters = ({ onFilter, onClear, filters, selectedFilters }) => {
  const [localSelectedFilters, setLocalSelectedFilters] = useState({});

  useEffect(() => {
    setLocalSelectedFilters(selectedFilters); // Sync local state with props
  }, [selectedFilters]);

  const handleFilterChange = (filterId, values) => {
    const updatedFilters = { ...localSelectedFilters, [filterId]: values };
    setLocalSelectedFilters(updatedFilters);
  };

  const applyFilters = () => {
    onFilter(localSelectedFilters); // Call onFilter with updated filters
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full items-center"> {/* Responsive layout */}
      {filters.map((filter, index) =>
        filter.type === 'dropdown' && index < 2 && (
          <div key={filter.id} className="col-span-1">
            <Autocomplete
              label={filter.label}
              options={filter.options}
              placeholder={filter.placeholder || 'Select suburb...'}
              selectedValues={localSelectedFilters[filter.id] || []}
              onChange={(values) => handleFilterChange(filter.id, values)}
              className="w-full"
            />
          </div>
        )
      )}
      <div className="col-span-1 flex space-x-2">
        <button
          onClick={applyFilters}
          className="flex-1 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
          style={{ height: "50px", marginTop: "5px" }} // Adjust marginTop for vertical alignment
        >
          Apply Filters
        </button>
        <button
          onClick={() => {
            onClear();
            setLocalSelectedFilters({});
          }}
          className="flex-1 p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-500"
          style={{ height: "50px", marginTop: "5px" }} // Adjust marginTop for vertical alignment
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
