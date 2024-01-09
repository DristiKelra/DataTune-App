//import React from 'react';
import React, { useState } from "react";
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
//import * as XLSX from "xlsx";
//import Papa from "papaparse";
import "./home.css";
// import "./Header.jsx";
//import { Header } from "../component";
//import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
//import { Header } from '../components';


export const Data = () => {
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
        //   const workbook = XLSX.read(data, { type: "binary" });
        //   const sheetName =workbook.SheetNames[0];
        //   const sheet =  workbook.Sheets[sheetName]
        //   const parsedData =XLSX.utils.sheet_to_json(sheet);
        //   setData(parsedData);
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
  
    

const editing = { allowDeleting: true, allowEditing: true };
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
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <GridComponent
        id="gridcomp"
        dataSource={data}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        // contextMenuItems={contextMenuItems}
        editSettings={editing}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {data.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent>
      <div> 
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
    </div>
  );
};

export default Data;