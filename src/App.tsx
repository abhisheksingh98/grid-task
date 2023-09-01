import React from "react";
import "./App.css";
import ReactGridLayout from "./components/ReactGridLayout/ReactGridLayout";
import Dropdown from "./components/Dropdown/Dropdown";

function App() {
  const dropdownOptions = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
  ];

  return (
    <div className="App">
      <h2>Customizable Dropdown</h2>
      <div className="dropdown-container">
        <div>
          <h3>Single Selection</h3>
          <Dropdown options={dropdownOptions} multiple={false} />
        </div>
        <div>
          <h3>Multiple Selection</h3>
          <Dropdown options={dropdownOptions} multiple={true} />
        </div>
      </div>

      <h2>React Grid Layout</h2>
      <ReactGridLayout columns={3} numBoxes={20} />
    </div>
  );
}

export default App;
