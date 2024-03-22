import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import Papa from 'papaparse';
import {useFile} from "layouts/Filecontext";
import * as XLSX from 'xlsx';
import { useDropzone } from 'react-dropzone';
import DashboardLayout from 'elements/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'elements/Navbars/DashboardNavbar';
import Footer from 'elements/Footer';
import MDButton from 'components/MDButton';

export const Datavisualise = () => {
  const [fileData, setFileData] = useState([]);
  const [selectedXAxis, setSelectedXAxis] = useState('');
  const [selectedYAxis, setSelectedYAxis] = useState('');
  const [chart, setChart] = useState(null);
  const {file, setFile} = useFile();


  const extractDataFromCSV = (file, onDataExtracted) => {
    Papa.parse(file, {
      complete: (result) => {
        const data = result.data;
        setFileData(data);
        onDataExtracted(result.data);
      },
    });
  };
  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file); // Update file in global context; remove this if you want to keep it local
    if (file.type.includes("csv")) {
      // Assuming CSV parsing logic is similar and should set data for charting
      Papa.parse(file, {
        complete: (result) => {
          setFileData(result.data);
        },
        header: true
      });
    } else {
      // For Excel files
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryString = e.target.result;
        const workbook = XLSX.read(binaryString, {type: 'binary'});
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet, {header: 1});
        setFileData(data);
      };
      reader.readAsBinaryString(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: '.csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });

  useEffect(() => {
    // If there's a file from the context, use it directly
    if (file && !fileData.length) {
      handleDrop([file]);
    }
  }, [file]);

  const renderChart = () => {
    const ctx = document.getElementById('myChart').getContext('2d');
    if (chart) {
      chart.destroy();
    }
    const newChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: fileData.map((data) => data[selectedXAxis]),
        datasets: [
          {
            label: 'Dataset',
            data: fileData.map((data) => data[selectedYAxis]),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      },
    });
    setChart(newChart);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div {...getRootProps()} style={{ border: '2px dashed #cccccc', borderRadius: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
        <input {...getInputProps()} />
        <p>Drag an drop a CSV or Excel file here, or click to select one</p>
      </div>
      {fileData.length > 0 && (
        <div>
          <label htmlFor="xAxis">Select X Axis:</label>
          <select id="xAxis" value={selectedXAxis} onChange={(e) => setSelectedXAxis(e.target.value)}>
            {Object.keys(fileData[0]).map((column) => (
              <option key={column} value={column}>{column}</option>
            ))}
          </select>
          <label htmlFor="yAxis">Select Y Axis:</label>
          <select id="yAxis" value={selectedYAxis} onChange={(e) => setSelectedYAxis(e.target.value)}>
            {Object.keys(fileData[0]).map((column) => (
              <option key={column} value={column}>{column}</option>
            ))}
          </select>
          <MDButton onClick={renderChart} color ='success'>Render Chart</MDButton>
        </div>
      )}
      <canvas id="myChart"></canvas>
      <Footer />
    </DashboardLayout>
  );
};

export default Datavisualise;

