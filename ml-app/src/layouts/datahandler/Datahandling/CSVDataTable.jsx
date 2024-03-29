// import React, { useState, useEffect } from 'react';
// import DataTable from 'react-data-table-component';
// import * as XLSX from 'xlsx';

// export const DataHandling = () => {
//   const [file, setFile] = useState(null);
//   const [data, setData] = useState([]);
//   const [missingValues, setMissingValues] = useState([]);
//   const [pending, setPending] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleFileUpload = (event) => {
//     const uploadedFile = event.target.files[0];
//     if (uploadedFile) {
//       setFile(uploadedFile);
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const content = e.target.result;
//         parseData(content);
//       };
//       reader.readAsBinaryString(uploadedFile);
//     }
//   };

//   const handleUpload = async () => {
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await fetch('http://127.0.0.1:8000/api/upload/', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         const result = await response.json();
//         console.log(result);
//         // Optionally, you can perform additional actions after successful upload
//       } else {
//         console.error('Error uploading file:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//   };

//   const parseData = (content) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const workbook = XLSX.read(content, { type: 'binary' });
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];
//       const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
//       setData(parsedData);

//       evaluateMissingValues(parsedData);
//     } catch (error) {
//       setError('Error parsing the file. Please upload a valid file.');
//       setData([]);
//       setMissingValues([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setPending(false);
//     }, 2000);
//     return () => clearTimeout(timeout);
//   }, []);

//   const evaluateMissingValues = (data) => {
//     if (data.length > 0) {
//       const missingData = [];
//       for (let i = 0; i < data[0].length; i++) {
//         const column = data.map((row) => (row[i] ? row[i].toString().trim() : ''));
//         const missingCount = column.filter((value) => value === '').length;
//         missingData.push({ columnName: data[0][i], missingCount });
//       }
//       setMissingValues(missingData);
//     }
//   };

//   const customStyles = {
//     header: {
//   		style: {
//   			minHeight: '56px',
// 		},
//   	},
//   	headRow: {
//   		style: {
//   			borderTopStyle: 'solid',
//   			borderTopWidth: '1px',
//         fontWeight: 'bold',
//   			borderTopColor: defaultThemes.default.divider.default,
//   		},
//   	},
//   	headCells: {
//   		style: {
//   			'&:not(:last-of-type)': {
//   				borderRightStyle: 'solid',
//   				borderRightWidth: '1px',
//   				borderRightColor: defaultThemes.default.divider.default,
//   			},
//   		},
//   	},
//   	cells: {
//   		style: {
//   			'&:not(:last-of-type)': {
//   				borderRightStyle: 'solid',
//   				borderRightWidth: '1px',
//   				borderRightColor: defaultThemes.default.divider.default,
//   			},
//   		},
//   	},
//   };

//   const columns = data.length > 0 && Object.keys(data[0]).map((key) => ({
//     name: key,
//     selector: key,
//     sortable: true,
//   }));

//   return (
//     <div>
//       <h1>Missing Values Evaluator</h1>
//       <input type="file" accept=".csv, .xlsx, .xls" onChange={handleFileUpload} />
//       <button onClick={handleUpload}>Upload File</button>

//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}

//       {data.length > 0 && (
//         <DataTable
//           columns={columns}
//           data={data}
//           progressPending={pending}
//           highlightOnHover
//           responsive={true}
//           striped={true}
//           subHeaderAlign="right"
//           fixedHeader={true}
//           noTableHead={true}
//           conditionalRowStyles={[
//             {
//               when: (row, index) => index === 0,
//               style: {
//                 fontWeight: 'bold',
//               },
//             },
//           ]}
//           fixedHeaderScrollHeight="1000px"
//           pagination
//           onColumnOrderChange={cols => console.log(cols)}
//           customStyles={customStyles}
//         />
//       )}

//       {missingValues.length > 0 && (
//         <div>
//           <h2>Data with Missing Values</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>Column Name</th>
//                 <th>Missing Values</th>
//               </tr>
//             </thead>
//             <tbody>
//               {missingValues.map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.columnName}</td>
//                   <td>{item.missingCount}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DataHandling;
