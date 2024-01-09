import React, { useState, useEffect } from 'react';

export const Services = () => {
  const initialData = [
    { 'First Score': 100, 'Second Score': 30, 'Third Score': null },
    { 'First Score': 90, 'Second Score': 45, 'Third Score': 40 },
    { 'First Score': null, 'Second Score': 56, 'Third Score': 80 },
    { 'First Score': 95, 'Second Score': null, 'Third Score': 98 },
  ];

  const [data, setData] = useState(initialData);

  // Function to identify and replace null values
  const replaceNullValues = () => {
    const newData = data.map((row) => {
      const newRow = {};
      for (const key in row) {
        newRow[key] = row[key] !== null ? row[key] : 0; // Replace null with 0 (modify as needed)
      }
      return newRow;
    });
    setData(newData); // Update the state with the modified data
  };

  useEffect(() => {
    replaceNullValues(); // Call the function when the component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <h1>Services</h1>
      

{/* const MyComponent = () => { Sample data similar to the dictionary of lists in Pandas*/}
 

  {/* // State to hold the data */}
  
    <div>
      <h2>Data with Replaced Null Values:</h2>
      <table>
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};
