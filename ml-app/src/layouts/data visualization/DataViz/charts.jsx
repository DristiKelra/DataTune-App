// import React, { useState } from 'react';
// import { Bar, Line, Doughnut } from 'react-chartjs-2';
// import { useDropzone } from 'react-dropzone';

// export const ChartVisualization = () => {
//   const [fileData, setFileData] = useState([]);
//   const [selectedColumns, setSelectedColumns] = useState([]);
//   const [chartType, setChartType] = useState('bar');

//   const onDrop = (acceptedFiles) => {
//     const file = acceptedFiles[0];
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       const result = e.target.result;
//       // You may need to parse the file content based on its format (e.g., CSV, JSON)
//       // For simplicity, let's assume it's a CSV file with the first row as headers
//       const rows = result.split('\n');
//       const headers = rows[0].split(',');

//       setFileData(
//         rows.slice(1).map((row) => {
//           const values = row.split(',');
//           return headers.reduce((obj, header, index) => {
//             obj[header.trim()] = values[index].trim();
//             return obj;
//           }, {});
//         })
//       );

//       setSelectedColumns(headers);
//     };

//     reader.readAsText(file);
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: '.csv',
//     onDrop,
//   });

//   const chartOptions = {
//     scales: {
//       x: {
//         beginAtZero: true,
//       },
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   const renderChart = () => {
//     const data = {
//       labels: fileData.map((data) => data[selectedColumns[0]]),
//       datasets: selectedColumns.slice(1).map((column, index) => ({
//         label: column,
//         data: fileData.map((data) => Number(data[column])),
//         backgroundColor: `rgba(${(index + 1) * 50}, 132, 190, 0.6)`,
//         borderColor: `rgba(${(index + 1) * 50}, 132, 190, 1)`,
//         borderWidth: 1,
//       })),
//     };

//     switch (chartType) {
//       case 'bar':
//         return <Bar data={data} options={chartOptions} />;
//       case 'line':
//         return <Line data={data} options={chartOptions} />;
//       case 'doughnut':
//         return <Doughnut data={data} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//       <div {...getRootProps()} style={dropzoneStyle}>
//         <input {...getInputProps()} />
//         <p>Drag 'n' drop a CSV file here, or click to select one</p>
//       </div>

//       {fileData.length > 0 && (
//         <div>
//           <div>
//             <label>Chart Type:</label>
//             {/* <select value={chartType} onChange={(e) => setChartType(e.target.value)}> */}
//               <option value="bar">Bar Chart</option>
//               <option value="line">Line Chart</option>
//               <option value="doughnut">Doughnut Chart</option>
//             </select>
//           </div>

//           <div>
//             <label>Columns:</label>
//             {selectedColumns.map((column) => (
//               <label key={column} style={{ marginRight: '10px' }}>
//                 <input
//                   type="checkbox"
//                   checked={selectedColumns.includes(column)}
//                   onChange={() =>
//                     setSelectedColumns((prevColumns) =>
//                       prevColumns.includes(column)
//                         ? prevColumns.filter((col) => col !== column)
//                         : [...prevColumns, column]
//                     )
//                   }
//                 />
//                 {column}
//               </label>
//             ))}
//           </div>

//           <div style={{ marginTop: '20px' }}>{renderChart()}</div>
//         </div>
//       )}
//     </div>
//   );
// };

// const dropzoneStyle = {
//   border: '2px dashed #cccccc',
//   borderRadius: '4px',
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   justifyContent: 'center',
//   padding: '20px',
//   textAlign: 'center',
//   cursor: 'pointer',
// };

// export default ChartVisualization;
