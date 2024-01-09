import React, { useState } from "react";
import Papa from "papaparse"; // For CSV parsing

function MissingDataHandler() {
  const [data, setData] = useState(null);
  const [missingData, setMissingData] = useState(null);
  const [fillMethod, setFillMethod] = useState("Mean");
  const [customValue, setCustomValue] = useState("");

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (result) => {
        setData(result.data);
        const missing = {};
        Object.keys(result.data[0]).forEach((col) => {
          missing[col] = result.data.filter((row) => !row[col]).length;
        });
        setMissingData(missing);
      },
    });
  };

  // Function to fill missing values
  const handleFillMissing = () => {
    const filledData = [...data];

    for (let col in missingData) {
      if (missingData.hasOwnProperty(col)) {
        if (fillMethod === "Mean") {
          const mean = data.reduce((acc, row) => acc + row[col], 0) / data.length;
          filledData.forEach((row) => {
            if (!row[col]) {
              row[col] = mean;
            }
          });
        } else if (fillMethod === "Median") {
          const values = data.map((row) => row[col]).filter((value) => value !== null);
          values.sort((a, b) => a - b);
          const medianIndex = Math.floor(values.length / 2);
          const median = values.length % 2 === 0 ? (values[medianIndex - 1] + values[medianIndex]) / 2 : values[medianIndex];
          filledData.forEach((row) => {
            if (!row[col]) {
              row[col] = median;
            }
          });
        } else if (fillMethod === "Custom Value") {
          filledData.forEach((row) => {
            if (!row[col]) {
              row[col] = customValue;
            }
          });
        }
      }
    }

    // Do something with the filledData, e.g., send it to your ML process.
    console.log("Filled Data:", filledData);
  };

  return (
    <div>
      <h1>Missing Data Handling</h1>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {data && (
        <div>
          <h2>Original Data</h2>
          <table>
            <thead>
              <tr>
                {Object.keys(data[0]).map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, colIndex) => (
                    <td key={colIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {missingData && (
        <div>
          <h2>Missing Data</h2>
          <table>
            <thead>
              <tr>
                <th>Column</th>
                <th>Missing Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(missingData).map(([col, count]) => (
                <tr key={col}>
                  <td>{col}</td>
                  <td>{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {data &&(
        <div>
          <h2>Fill Missing Data</h2>
          <select value={fillMethod} onChange={(e) => setFillMethod(e.target.value)}>
            <option value="Mean">Fill with Mean</option>
            <option value="Median">Fill with Median</option>
            <option value="Custom Value">Fill with Custom Value</option>
          </select>
          {fillMethod === "Custom Value" && (
            <input
              type="number"
              placeholder="Enter Custom Value"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
            />
          )}
          <button onClick={handleFillMissing}>Fill Missing Values</button>
        </div>
      )}
    </div>
  );
}

export default MissingDataHandler;
