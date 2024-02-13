// import React, { useState, useEffect } from 'react';
// import Grid from "@mui/material/Grid";
// import Chart from 'chart.js/auto';
// import { useDropzone } from 'react-dropzone';
// import MDBox from "components/MDBox";
// import Papa from "papaparse";
// import DashboardLayout from "elements/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "elements/Navbars/DashboardNavbar";
// import Footer from "elements/Footer";
// import MDButton from 'components/MDButton';
// import * as XLSX from 'xlsx';
// import ReportsBarChart from "elements/Charts/BarCharts/ReportsBarChart";
// import ReportsLineChart from "elements/Charts/LineCharts/ReportsLineChart";
// import ComplexStatisticsCard from "elements/Cards/StatisticsCards/ComplexStatisticsCard";
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
// import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
// import { Line } from 'react-chartjs-2';
// import DataViz from "./DataViz"; // Assuming this is the correct import for your DataViz component

// export const Datavisualise = () => {
//   const [uploadedData, setUploadedData] = useState(null);
//   const { sales, tasks } = reportsLineChartData;
//   const [chart, setChart] = useState(null);
//   const [fileData, setFileData] = useState([]);
//   const [selectedColumns, setSelectedColumns] = useState([]);

//   const handleFileUpload = (file) => {
   
//     extractDataFromCSV(file, setUploadedData);
//   };

//   const extractDataFromCSV = (file, onDataExtracted) => {
//     Papa.parse(file, {
//       complete: (result) => {
//         const data =result.data;
//         const headers = data[0];
//         setFileData(data);
//         setSelectedColumns(headers);
//         onDataExtracted(result.data);
//       },
//       // header: true, // Assuming the first row is the header
//     });
//   };

 
  
  
  
//   const handleDrop = (acceptedFiles) => {
//     const fileReader = new FileReader();
//     fileReader.onload = (e) => {
//       const binaryString = e.target.result;
//       const workbook = XLSX.read(binaryString, { type: 'binary' });
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];
//       const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
//       setFileData(data);
//     };
//     fileReader.readAsBinaryString(acceptedFiles[0]);
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop: handleDrop,
//     accept: '.csv, .xls, .xlsx',
//   });
  
//     const renderChart = () => {
//       const ctx = document.getElementById('myChart').getContext('2d');
//       if (chart) {
//         chart.destroy();
//       }
//       const newChart = new Chart(ctx, {
//         type: 'bar',
//         data: {
//           labels: selectedColumns,
//           datasets: fileData.map((data, index) => ({
//             label: `Dataset ${index + 1}`,
//             data: selectedColumns.map((column) => data[column]),
//             backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`,
//             borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
//             borderWidth: 1,
//           })),
//         },
//       });
//       setChart(newChart);
//     };
  
//     const handleColumnSelection = (e) => {
//       const { value } = e.target;
//       if (selectedColumns.includes(value)) {
//         setSelectedColumns(selectedColumns.filter((column) => column !== value));
//       } else {
//         setSelectedColumns([...selectedColumns, value]);
//       }
//     };
    
//     const [data, setData] = useState(null);

//   // Function to handle file upload
//   // const handleFileUpload = (event) => {
//   //   const file = event.target.files[0];
//   //   const reader = new FileReader();

//   //   reader.onload = (e) => {
//   //     const fileData = e.target.result;
//   //     // Process the fileData as needed
//   //     // For example, parse CSV data using a library like Papa Parse

//   //     // Set the processed data to the state
//   //     setData(processedData);
//   //   };

//   //   reader.readAsText(file);
//   // };

//     useEffect(() => {
//       // Data for the chart
//       const data = {
//         labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//         datasets: [{
//           label: 'Weekly Sales',
//           data: [18, 12, 6, 9, 12, 3, 9],
//           backgroundColor: [
//             'rgba(255, 26, 104, 0.2)',
//             'rgba(54, 162, 235, 0.2)',
//             'rgba(255, 206, 86, 0.2)',
//             'rgba(75, 192, 192, 0.2)',
//             'rgba(153, 102, 255, 0.2)',
//             'rgba(255, 159, 64, 0.2)',
//             'rgba(0, 0, 0, 0.2)'
//           ],
//           borderColor: [
//             'rgba(255, 26, 104, 1)',
//             'rgba(54, 162, 235, 1)',
//             'rgba(255, 206, 86, 1)',
//             'rgba(75, 192, 192, 1)',
//             'rgba(153, 102, 255, 1)',
//             'rgba(255, 159, 64, 1)',
//             'rgba(0, 0, 0, 1)'
//           ],
//           borderWidth: 1
//         }]
//       };
  
//       // Configuration for the chart
//       const config = {
//         type: 'bar',
//         data,
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true
//             }
//           }
//         }
//       };
  
//       // Create the chart
//       const myChart = new Chart(
//         document.getElementById('myChart'),
//         config
//       );
  
//       // Update chart version
//       const chartVersion = document.getElementById('chartVersion');
//       chartVersion.innerText = Chart.version;
  
//       // Cleanup function
//       return () => {
//         myChart.destroy(); // Destroy the chart instance to prevent memory leaks
//       };
//     }, []); // Run only once when component mounts
  
  

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       {/* <div>
//       <input type="file" onChange={handleFileUpload} />
//       {data && <Line data={data} />}
//     </div> */}
//       <div>
//       <div className="chartMenu">
//         {/* <p>WWW.CHARTJS3.COM (Chart JS <span id="chartVersion"></span>)</p> */}
//       </div>
//       <div className="chartCard">
//         <div className="chartBox">
//           <canvas id="myChart"></canvas>
//         </div>
//       </div>
//     </div>
//       {/* ----------------------------------------------------------*/}
//     {/* <div> 
//       <div {...getRootProps()} style={{ border: '2px dashed #cccccc', borderRadius: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
//         <input {...getInputProps()} />
//         <p>Drag an drop a CSV or Excel file here, or click to select one</p>
//       </div>
//       {selectedColumns.length > 0 && (
//         <div>
//           <label>Select Columns:</label>
//           <select multiple value={selectedColumns} onChange={handleColumnSelection}>
//             {Object.keys(fileData[0]).map((column) => (
//               <option key={column} value={column}>{column}</option>
//             ))}
//           </select>
//         </div>
//       )}
//       <canvas id="myChart" />
//       <MDButton onClick={renderChart}>Render Chart</MDButton>
//     </div> */}



//       {/* Add your DataViz component here */}
//       {/* <DataViz onDrop={handleFileUpload} /> */}
//       {/* {uploadedData && (
//         <MDBox mt={4.5}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6} lg={4}>
//               <MDBox mb={3}>
//                 <ReportsBarChart
//                   color="info"
//                   title="Bar Chart"
//                   description="Bar chart"
//                   date="Acceptable file types: excel and csv format"
//                   chart={uploadedData} // Pass uploaded data as chart prop
//                 />
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={4}>
//               <MDBox mb={3}>
//                 <ReportsLineChart
//                   color="success"
//                   title="daily sales"
//                   description={
//                     <>
//                       (<strong>+15%</strong>) increase in today sales.
//                     </>
//                   }
//                   date="updated 4 min ago"
//                   chart={uploadedData} // Use sales data for now, you can replace it with uploaded data
//                 />
//               </MDBox>
//             </Grid> */}
//             {/* <Grid item xs={12} md={6} lg={4}>
//               <MDBox mb={3}>
//                 <ReportsLineChart
//                   color="dark"
//                   title="completed tasks"
//                   description="Last Campaign Performance"
//                   date="just updated"
//                   chart={tasks} // Use tasks data for now, you can replace it with uploaded data
//                 />
//               </MDBox>
//             </Grid> */}
//           {/* </Grid>
//         </MDBox>
//       )}
//        */}
//       {/* {uploadedData && ( */}
//       {/* <MDBox mt={4.5}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6} lg={4}>
//             <MDBox mb={3}>
//               <ReportsBarChart
//                 color="info"
//                 title="Upload Dataset"
//                 description="Dataset prepared and updated for Model Development"
//                 date="Acceptable file types: excel and csv format"
//                 chart={reportsBarChartData}
//               />
//             </MDBox>
//           </Grid>
//             <Grid item xs={12} md={6} lg={4}>
//               <MDBox mb={3}>
//                 <ReportsLineChart
//                   color="success"
//                   title="daily sales"
//                   description={
//                     <>
//                       (<strong>+15%</strong>) increase in today sales.
//                     </>
//                   }
//                   date="updated 4 min ago"
//                   chart={sales}
//                 />
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={4}>
//               <MDBox mb={3}>
//                 <ReportsLineChart
//                   color="dark"
//                   title="completed tasks"
//                   description="Last Campaign Performance"
//                   date="just updated"
//                   chart={tasks}
//                 />
//               </MDBox>
//             </Grid>
//           </Grid>
//         </MDBox> */}
//       {/* )} */}
//       <Footer />
//     </DashboardLayout>
//   );
// };

// export default Datavisualise;



//---------------------------------------------------
import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { useDropzone } from 'react-dropzone';
import DashboardLayout from 'elements/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'elements/Navbars/DashboardNavbar';
import Footer from 'elements/Footer';
import MDButton from 'components/MDButton';

export const Datavisualise = () => {
  const [uploadedData, setUploadedData] = useState(null);
  const [fileData, setFileData] = useState([]);
  const [selectedXAxis, setSelectedXAxis] = useState('');
  const [selectedYAxis, setSelectedYAxis] = useState('');
  const [chart, setChart] = useState(null);

  const handleFileUpload = (file) => {
    extractDataFromCSV(file, setUploadedData);
  };

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
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const binaryString = e.target.result;
      const workbook = XLSX.read(binaryString, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setFileData(data);
    };
    fileReader.readAsBinaryString(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: '.csv, .xls, .xlsx',
  });

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

