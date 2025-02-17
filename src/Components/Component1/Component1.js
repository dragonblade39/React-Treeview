import React, { useEffect, useState } from "react";
import "./Component1.css";
import MainContent from "./MainContent";
import StatisticsContent from "./StatisticsContent";
import Navbar from "../Navbar/Navbar";

function Component1({tagName}) {
  const [options, setOptions] = useState([]);
  const [isOptionsVisible, setIsOptionsVisible] = useState(true);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(8);
  const [doubleClickedOption, setDoubleClickedOption] = useState(null);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch("/OptionsContent.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOptions(data.options || []);
      } catch (error) {
        console.error("Error fetching options:", error);
        setOptions([]);
      }
    };
    fetchOptions();
  }, []);

  const toggleOptions = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  const handleOptionClick = (option, index) => {
    setSelectedOptionIndex(index);
  };

  const handleOptionDoubleClick = (option, index) => {
    setDoubleClickedOption(doubleClickedOption === option ? null : option);
  };

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  const urlArgument = isCheckboxChecked ? "2" : "1";

  return (
    <div className="Component1__container">
      <div
        className={`Component1__options-container ${
          isOptionsVisible ? "Component1__show" : "Component1__hide"
        }`}
      >
        {Array.isArray(options) && options.length > 0 ? (
          options.map((option, index) => (
            <button
              key={index}
              className={`Component1__option-button 
                ${selectedOptionIndex === index ? "Component1__selected" : ""}
                ${hoveredOption === option ? "Component1__hovered" : ""}
                ${
                  doubleClickedOption === option
                    ? "Component1__double-clicked"
                    : ""
                }`}
              onMouseEnter={() => setHoveredOption(option)}
              onMouseLeave={() => setHoveredOption(null)}
              onClick={() => handleOptionClick(option, index)}
              onDoubleClick={() => handleOptionDoubleClick(option, index)}
            >
              {option}
            </button>
          ))
        ) : (
          <p className="Component1__error-message">No options available.</p>
        )}
      </div>

      <div className="content-container">
        {selectedOptionIndex === 8 && <MainContent tagName={tagName} url={urlArgument} />}
        {selectedOptionIndex === 9 && <StatisticsContent />}
      </div>

      <div className="Component1__sticky-buttons">
        <div>
          <label className="toggle-parameters">
            Show Parameters:
            <input
              type="checkbox"
              checked={isCheckboxChecked}
              onChange={handleCheckboxChange}
            />
          </label>
        </div>
        <div className="button-group">
          <button
            className="Component1__sticky-button"
          >
            Ok
          </button>
          <button className="Component1__sticky-button">Cancel</button>
          <button className="Component1__sticky-button">Help</button>
        </div>
      </div>
    </div>
  );
}

export default Component1;
