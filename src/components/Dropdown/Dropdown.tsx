import React, { useEffect, useState, useRef } from "react";
import "./Dropdown.css";

interface DropdownProps {
  options: string[];
  multiple: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ options, multiple }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedOptions, setSortedOptions] = useState(options);

  const dropdownRef = useRef(null);
  console.log(isOpen, "isOpen");
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    if (multiple) {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter((item) => item !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    } else {
      setSelectedOptions([option]);
      setIsOpen(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(searchTerm)
    );

    setSortedOptions(filteredOptions);
  };

  const handleSort = () => {
    const sorted = sortedOptions.slice();
    sorted.reverse();
    setSortedOptions(sorted);
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedOptions.length > 0
          ? selectedOptions.join(", ")
          : "Select an option"}
      </div>
      {isOpen && (
        <div className="dropdown-content">
          {multiple && (
            <div className="search-sort">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <button onClick={handleSort}>Sort</button>
            </div>
          )}
          {sortedOptions.map((option) => (
            <div
              key={option}
              className={`dropdown-option ${
                selectedOptions.includes(option) ? "selected" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
