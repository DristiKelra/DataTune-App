// src/HomePage.js
import React, { useState } from "react";
import Papa from "papaparse";
//import "./home.css"
//import * as XLSX from "xlsx";
//import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';


export const Home = () => {


  // const [containers, setContainers] = useState([
  //   { id: 1, title: 'Container 1', content: 'This is container 1.' },
  //   { id: 2, title: 'Container 2', content: 'This is container 2.' },
  //   { id: 3, title: 'Container 3', content: 'This is container 3.' },
  // ]);

  // const handleContainerClick = (id) => {
  //   // Implement your click handler here
  //   // You can add logic to open, close, or interact with the containers
  //   console.log(`Container ${id} clicked`);
  // };

  // return (
  //   <div className="homepage">
  //     <h1>Welcome to Our Interactive Homepage</h1>
  //     <div className="container-list">
  //       {containers.map((container) => (
  //         <div
  //           key={container.id}
  //           className="container"
  //           onClick={() => handleContainerClick(container.id)}
  //         >
  //           <h2>{container.title}</h2>
  //           <p>{container.content}</p>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );

//import React, { useState } from 'react';

//function MissingValuesEvaluator() {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [missingValues, setMissingValues] = useState([]);
  
    const handleFileUpload = (event) => {
      const uploadedFile = event.target.files[0];
      if (uploadedFile) {
        setFile(uploadedFile);
        const reader = new FileReader();
        //reader.readAsBinaryString(event.target.files[0]);
        reader.onload = (e) => {
          //const data = e.target.result;
          const content = e.target.result;
          // const workbook = XLSX.read(data, { type: "binary" });
          // const sheetName =workbook.SheetNames[0];
          // const sheet =  workbook.Sheets[sheetName]
          //const parsedData =XLSX.utils.sheet_to_json(sheet);
          //setData(parsedData);
          //evaluateMissingValues(parsedData);
          parseCSV(content);
        };
  
        reader.readAsText(uploadedFile);
      }
    };
  
    const parseCSV = (content) => {
      try {
        // Assume CSV format with rows separated by newline and columns separated by commas
        const rows = content.split('\n');
        const parsedData = rows.map((row) => row.split(','));
  
        setData(parsedData);
        evaluateMissingValues(parsedData);
      } catch (error) {
        console.error('Error parsing CSV:', error);
        // Handle the error as needed (e.g., display an error message to the user).
      }
    };

  //   <input 
  //   type="file" 
  //   accept=".xlsx, .xls" 
  //   onChange={handleFileUpload} 
  // />

  // {data.length > 0 && (
  //   <table className="table">
  //     <thead>
  //       <tr>
  //         {Object.keys(data[0]).map((key) => (
  //           <th key={key}>{key}</th>
  //         ))}
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {data.map((row, index) => (
  //         <tr key={index}>
  //           {Object.values(row).map((value, index) => (
  //             <td key={index}>{value}</td>
  //           ))}
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // )};
  
    const evaluateMissingValues = (data) => {
      if (data.length > 0) {
        // Analyze the data to find missing values
        const missingData = [];
        for (let i = 0; i < data[0].length; i++) {
          const column = data.map((row) => row[i] ? row[i].trim() : '');
          const missingCount = column.filter((value) => value === '').length;
          missingData.push({ columnName: data[0][i], missingCount });
        }
  
        setMissingValues(missingData);
      }
    };
    
    const renderDataWithMissingValues = () => {
      return (
        <table>
          <thead>
            <tr>
              {data[0].map((columnName, index) => (
                <th key={index}>{columnName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(1,11).map((row, rowIndex) => (
              <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className={cell.trim() === '' ? 'missing-value' : ''}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };  
    return (
      <div>
        <h1>Missing Values Evaluator</h1>
        <input type="file" accept=".csv, .xlsx, .xls" onChange={handleFileUpload} />
        <div>
        
         {/* {data.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}  */}
        {missingValues.length > 0 && (
          <div>
            <h2>Data with Missing Values</h2>
            {renderDataWithMissingValues()}
          <table>
              <thead>
                <tr>
                  <th>Column Name</th>
                  <th>Missing Values</th>
                </tr>
              </thead>
              <tbody>
                {missingValues.map((item, index) => (
                  <tr key={index}>
                    <td>{item.columnName}</td>
                    <td>{item.missingCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          )}
        </div>
      </div>
    );
  //}
  
  //export default MissingValuesEvaluator;
  

  

// const [data1, setData1] = useState(null);
// const [missingData, setMissingData] = useState(null);
//   const [fillMethod, setFillMethod] = useState("Mean");
//   const [customValue, setCustomValue] = useState("");
  

//   // Function to handle file upload
//   const handleFileUpload1 = (event) => {
//     const file = event.target.files[0];

//     Papa.parse(file, {
//       header: true,
//       dynamicTyping: true,
//       skipEmptyLines: true,
//       complete: (result) => {
//         setData(result.data);
//         const missing = {};
//         Object.keys(result.data[0]).forEach((col) => {
//           missing[col] = result.data.filter((row) => !row[col]).length;
//         });
//         setMissingData(missing);
//       },
//     });
//   };

//   // Function to fill missing values
//   const handleFillMissing = () => {
//     const filledData = [...data];

//     for (let col in missingData) {
//       if (missingData.hasOwnProperty(col)) {
//         if (fillMethod === "Mean") {
//           const mean = data.reduce((acc, row) => acc + row[col], 0) / data.length;
//           filledData.forEach((row) => {
//             if (!row[col]) {
//               row[col] = mean;
//             }
//           });
//         } else if (fillMethod === "Median") {
//           const values = data.map((row) => row[col]).filter((value) => value !== null);
//           values.sort((a, b) => a - b);
//           const medianIndex = Math.floor(values.length / 2);
//           const median = values.length % 2 === 0 ? (values[medianIndex - 1] + values[medianIndex]) / 2 : values[medianIndex];
//           filledData.forEach((row) => {
//             if (!row[col]) {
//               row[col] = median;
//             }
//           });
//         } else if (fillMethod === "Custom Value") {
//           filledData.forEach((row) => {
//             if (!row[col]) {
//               row[col] = customValue;
//             }
//           });
//         }
//       }
//     }

//     // Do something with the filledData, e.g., send it to your ML process.
//     console.log("Filled Data:", filledData);
//   };

//   return (
//     <div>
//       <h1>Missing Data Handling</h1>
//       <input type="file" accept=".csv" onChange={handleFileUpload} />
//       {data && (
//         <div>
//           <h2>Original Data</h2>
//           <table>
//             <thead>
//               <tr>
//                 {Object.keys(data[0]).map((col) => (
//                   <th key={col}>{col}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((row, index) => (
//                 <tr key={index}>
//                   {Object.values(row).map((value, colIndex) => (
//                     <td key={colIndex}>{value}</td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//       {missingData && (
//         <div>
//           <h2>Missing Data</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>Column</th>
//                 <th>Missing Count</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.entries(missingData).map(([col, count]) => (
//                 <tr key={col}>
//                   <td>{col}</td>
//                   <td>{count}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//       {data &&(
//         <div>
//           <h2>Fill Missing Data</h2>
//           <select value={fillMethod} onChange={(e) => setFillMethod(e.target.value)}>
//             <option value="Mean">Fill with Mean</option>
//             <option value="Median">Fill with Median</option>
//             <option value="Custom Value">Fill with Custom Value</option>
//           </select>
//           {fillMethod === "Custom Value" && (
//             <input
//               type="number"
//               placeholder="Enter Custom Value"
//               value={customValue}
//               onChange={(e) => setCustomValue(e.target.value)}
//             />
//           )}
//           <button onClick={handleFillMissing}>Fill Missing Values</button>
//         </div>
//       )}
//     </div>
//    );
// // // }

// // // export default MissingDataHandler;

// //   );
    
}


export default Home;


    // <div className = "home">
      
    //   <div className = "loginContainer">
    //     <h1> Welcome Back!</h1>

    //     <div className = "input-container">
    //       <label>Username</label>
    //       <input type = "text" required />
    //     </div>

    //     <div className = "input-container">
    //       <label>Password</label>
    //       <input type = "password" required />
    //     </div>

    //       <a href ="#">Forgot Password</a>
    //       <a href ="#">Create a new account</a>

    //     <button className = "loginBut">
    //         <p>Login</p>
    //     </button>

    //     <button className ="SiG">   
    //         <img
    //         src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
    //         alt="Trees"
    //         height="30"
    //       />
    //       <p>Sign in with Google</p>
    //     </button>

    //   </div>
    //   </div>