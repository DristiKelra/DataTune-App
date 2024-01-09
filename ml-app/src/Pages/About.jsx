// src/AboutPage.js
// import React from "react";

// function Aboutpage() {
//   return (
//     <div>
      
//     </div>
//   );
// }

// export default Aboutpage;
import { useState } from "react";
import * as XLSX from "xlsx";
//import { GridComponent, ColumnsDirective, CoumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Pdfexport, Edit, Inject} from '@syncfusion/ej2-react-grids';

//import './App.css';

import React from 'react';

export const About = () => {
  
  const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
  }

  // const (parsedData) => {
  //   try {
  //     // Assume CSV format with rows separated by newline and columns separated by commas
  //     const rows = content.split('\n');
  //     const parsedData = rows.map((row) => row.split(','));

  //     setData(parsedData);
  //     evaluateMissingValues(parsedData);
  //   } catch (error) {
  //     console.error('Error parsing CSV:', error);
  //     // Handle the error as needed (e.g., display an error message to the user).
  //   }
  // };


//   const evaluateMissingValues = (data) => {
//     if (data.length > 0) {
//       // Analyze the data to find missing values
//       const missingData = [];
//       for (let i = 0; i < data[0].length; i++) {
//         const column = data.map((row) => row[i] ? row[i].trim() : '');
//         const missingCount = column.filter((value) => value === '').length;
//         missingData.push({ columnName: data[0][i], missingCount });
//       }

//       setMissingValues(missingData);
//     }
//   };
  
//   const renderDataWithMissingValues = () => {
//     return (
//       <table>
//         <thead>
//           <tr>
//             {data[0].map((columnName, index) => (
//               <th key={index}>{columnName}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.slice(1,11).map((row, rowIndex) => (
//             <tr key={rowIndex}>
//             {row.map((cell, cellIndex) => (
//               <td key={cellIndex} className={cell.trim() === '' ? 'missing-value' : ''}>
//                 {cell}
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };  

 
 

    
  };



//   return (
//     <div>
//       <h1>About Page</h1>
//       <p>This is the About Page.</p>
//     </div>
//   );
// }

export default About;


