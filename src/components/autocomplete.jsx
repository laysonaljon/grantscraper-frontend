import React, { useState } from "react";

const Autocomplete = ({ label, placeholder, options, selectedValues, onChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  };

  const handleOptionSelect = (option) => {
    if (!selectedValues.includes(option)) {
      onChange([...selectedValues, option]);
    } else {
      onChange(selectedValues.filter((item) => item !== option)); // Toggle off
    }
  };

  const handleRemove = (option) => {
    onChange(selectedValues.filter((item) => item !== option));
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    setFilteredOptions(options);
  };

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsFocused(false);
    }
  };

  return (
    <div className="relative mb-4" onBlur={handleBlur} tabIndex={-1}>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</label>
      <div
        className="flex items-center mt-1 border border-gray-300 rounded-md shadow-sm overflow-x-auto bg-white dark:bg-gray-800"
        style={{ whiteSpace: "nowrap", height: "50px" }}
      >
        {selectedValues.map((value) => (
          <span
            key={value}
            className="flex items-center bg-blue-500 text-white rounded-md px-2 py-1 mr-2 mb-1 text-xs"
            style={{ margin: '0 4px' }}
          >
            {value}
            <button
              type="button"
              onClick={() => handleRemove(value)}
              className="ml-1 text-white"
            >
              &times;
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="flex-grow p-2 border-none focus:ring-0 focus:outline-none bg-transparent text-black dark:text-white h-full"
          placeholder={placeholder}
        />
      </div>
      {isFocused && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto custom-scrollbar dark:bg-gray-800">
          {filteredOptions.map((option) => (
            <li
              key={option}
              onMouseDown={() => handleOptionSelect(option)}
              className="cursor-pointer hover:bg-blue-100 p-2 flex items-center space-x-2 dark:hover:bg-blue-600"
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(option)}
                onChange={() => handleOptionSelect(option)}
                className="mr-2 text-blue-600 focus:ring-blue-500 accent-blue-600" // Added accent color for modern browsers
              />
              <span className="text-black dark:text-white">{option}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
