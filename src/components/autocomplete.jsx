import React, { useState } from 'react';

const Autocomplete = ({ label, placeholder, options, selectedValues, onChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const filtered = options.filter(
        (option) =>
          option.toLowerCase().includes(value.toLowerCase()) &&
          !selectedValues.includes(option)
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options.filter((option) => !selectedValues.includes(option)));
    }
  };

  // Handle option selection
  const handleOptionSelect = (option) => {
    onChange([...selectedValues, option]);
    setInputValue('');
    setFilteredOptions([]);
    setIsFocused(false); // Hide options after selection
  };

  // Handle removal of selected option
  const handleRemove = (option) => {
    onChange(selectedValues.filter((selected) => selected !== option));
  };

  // Show options when focused
  const handleInputFocus = () => {
    setIsFocused(true);
    setFilteredOptions(options.filter((option) => !selectedValues.includes(option)));
  };

  // Hide options when blurred
  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsFocused(false);
    }
  };

  return (
    <div className="relative mb-4" onBlur={handleBlur} tabIndex={-1}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex flex-wrap items-center mt-1 border border-gray-300 rounded-md shadow-sm">
        {selectedValues.map((value) => (
          <span
            key={value}
            className="flex items-center bg-blue-500 text-white rounded-full px-2 py-1 mr-2"
          >
            {value}
            <button
              type="button"
              onClick={() => handleRemove(value)}
              className="ml-2 text-white"
            >
              &times; {/* X icon for removal */}
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="flex-grow p-2 border-none focus:ring-0 focus:outline-none"
          placeholder={placeholder}
        />
      </div>
      {isFocused && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-auto">
          {filteredOptions.map((option) => (
            <li
              key={option}
              onMouseDown={() => handleOptionSelect(option)} // Use onMouseDown
              className="cursor-pointer hover:bg-blue-100 p-2 flex justify-between items-center"
            >
              <span>{option}</span>
              {selectedValues.includes(option) && <span>✔️</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
