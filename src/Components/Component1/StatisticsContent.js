import React, { useEffect, useState } from "react";
import "./Component1.css"; // Ensure this file contains your CSS

function StatisticsContent() {
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await fetch("/StatisticsContent.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTableData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTableData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!tableData) return null;

  const { columns, data } = tableData;

  return (
    <div className="StatisticsContent__container">
      <table className="StatisticsContent__table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  {col.type === "select" ? (
                    <select
                      defaultValue={row[col.key]}
                      className="StatisticsContent_select"
                    >
                      {col.options &&
                        col.options.map((option, optionIndex) => (
                          <option key={optionIndex} value={option.value}>
                            {option.text}
                          </option>
                        ))}
                    </select>
                  ) : col.type ? (
                    <input
                      type={col.type}
                      defaultValue={row[col.key]}
                      placeholder={col.placeholder || ""}
                      disabled={col.disabled || false}
                      className="StatisticsContent_input"
                    />
                  ) : (
                    row[col.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StatisticsContent;
