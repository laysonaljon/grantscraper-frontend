import React from 'react';

const Dropdown = ({ label, options, selected, onChange }) => {
  
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <select
          value={selected}
          onChange={(e) => onChange(label.toLowerCase(), e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">{`Select ${label}`}</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  };
  

export default Dropdown;
