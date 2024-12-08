import React, { useState } from "react";

function DropdownExample() {
  // State to store the selected value
  const [selectedOption, setSelectedOption] = useState("");

  // Options for the dropdown
  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "grape", label: "Grape" },
  ];

  // Handler for dropdown value change
  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <h1>React Dropdown Example</h1>
      <label htmlFor="fruits">Choose a fruit:</label>
      <select
        id="fruits"
        value={selectedOption}
        onChange={handleChange}
        style={{ margin: "0 10px" }}
      >
        <option value="">-- Select an option --</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {selectedOption && (
        <p>
          You selected: <strong>{selectedOption}</strong>
        </p>
      )}
    </div>
  );
}

export default DropdownExample;
