import React, { useState, useEffect } from 'react';
import DataTable , {Alignment, createTheme, defaultThemes}from 'react-data-table-component';
import MDButton from 'components/MDButton';
import {useFile} from "layouts/Filecontext";
import Projects from './Projects';
//import DataTable from 'elements/Tables/DataTable';
import data from './Projects/data';

//import CSVDataTable from "./CSVDataTable";

import axios from 'axios';

import * as XLSX from 'xlsx';
import MDBox from 'components/MDBox';
import { Card } from '@mui/material';
import MDTypography from 'components/MDTypography';

export const Datahandling = () => {
  //const { file } = useFile();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [data, setData] = useState([]);
  const [missingValues, setMissingValues] = useState([]);
  const [pending, setPending] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [csrfToken, setCsrfToken] = useState('');
  //const { columns1, rows } = data();

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const csrfResponse = await axios.get('http://127.0.0.1:8000/get-csrf-token/');
        setCsrfToken(csrfResponse.data.csrfToken);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setFileName(uploadedFile.name);
      console.log('File Name:', uploadedFile.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        parseData(content);
      };
      reader.readAsBinaryString(uploadedFile);
    }
  };
    
  // console.log('CSRF Token:', csrfToken);
  // console.log('File Name:', file.name);

  const handleUpload = async () => {
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
          headers: {
            // 'Content-Disposition': `attachment; filename="${file.name}"`,
            'Content-Disposition': `attachment; filename="${fileName}"`,
            //'Content-Disposition': 'attachment; filename="' + {handleFileUpload}+ '"',  // Use single or double quotes
            'X-CSRFToken': csrfToken,
            //'Content-Type': 'multipart/form-data',
          },
        });
        
        //setFile(handleFileUpload.uploadedFile)
          
          
          const result = response.data;
          console.log(result);

          // After uploading, fetch the content for visualization
          const contentResponse = await axios.get(`http://127.0.0.1:8000/visualize-file/${file.name}`);
          const contentResult = contentResponse.data;
          console.log(contentResult);

      } catch (error) {
          console.error('Error uploading file:', error);
      }
  };




  // const handleUpload = async () => {
  //     const formData = new FormData();
  //     formData.append('file', file);

  //     try {
  //         const response = await axios.post('http://127.0.0.1:8000/api/upload/') 
  //         //{
  //         //     headers: {
  //         //         'Content-Disposition': `attachment; filename=${file.name}`,
  //         //     },
  //         // });

  //         const result = response.data;
  //         console.log(result);

  //         // After uploading, fetch the content for visualization
  //         const contentResponse = await axios.get(`http://127.0.0.1:8000/visualize-file/${file.name}`);
  //         const contentResult = contentResponse.data;
  //         console.log(contentResult);

  //         // Now you can use the contentResult in your React component as needed
  //     } catch (error) {
  //         console.error('Error uploading file:', error);
  //     }
  // };



  const parseData = (content) => {
    try {
      setLoading(true);
      setError(null);
      const workbook = XLSX.read(content, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setData(parsedData);
      //replaceMissingValues(parsedData);
      evaluateMissingValues(parsedData);
    } catch (error) {
      setError('Error parsing the file. Please upload a valid file.');
      setData([]);
      setMissingValues([]);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const evaluateMissingValues = (data) => {
    if (data.length > 0) {
      const missingData = [];
      for (let i = 0; i < data[0].length; i++) {
        const column = data.map((row) => (row[i] ? row[i].toString().trim() : ''));
        const missingCount = column.filter((value) => value === '').length;
        missingData.push({ columnName: data[0][i], missingCount });
      }
      setMissingValues(missingData);
    }
  };

  const handleReplaceValues = () => {
    const userInput = prompt('Enter "mean" or "median" to replace missing values:');
    if (userInput) {
      if (userInput.toLowerCase() === 'mean') {
        replaceMissingValues('mean');
      } else if (userInput.toLowerCase() === 'median') {
        replaceMissingValues('median');
      } else {
        alert('Invalid input. Please enter "mean" or "median".');
      }
    }
  };
  
  const replaceMissingValues = () => {
    const newData = [...data];
    newData.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell === null || cell === undefined || cell === '') {
          const columnValues = newData.map((r) => r[cellIndex]).filter((val) => val !== null && val !== undefined && val !== '');
          const sum = columnValues.reduce((acc, val) => acc + parseFloat(val), 0);
          const mean = sum / columnValues.length;
          const median = calculateMedian(columnValues);
          newData[rowIndex][cellIndex] = median; // or you can use mean instead
        }
      });
    });
    setData(newData);
  };


  const calculateMedian = (values) => {
    const sortedValues = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sortedValues.length / 2);
    return sortedValues.length % 2 !== 0 ? sortedValues[mid] : (sortedValues[mid - 1] + sortedValues[mid]) / 2;
  };

  const customStyles = {
    header: {
      style: {
        minHeight: '56px',
      },
    },
    headRow: {
      style: {
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        fontWeight: 'bold',
        borderTopColor: '#ddd',
      },
    },
    headCells: {
      style: {
        '&:not(:last-of-type)': {
          borderRightStyle: 'solid',
          borderRightWidth: '1px',
          borderRightColor: '#ddd',
        },
      },
    },
    cells: {
      style: {
        '&:not(:last-of-type)': {
          borderRightStyle: 'solid',
          borderRightWidth: '1px',
          borderRightColor: '#ddd',
        },
      },
    },
  };
  
  // return (
  //   <div style={{ padding: '20px' }}>
  //     <h1 style={{ marginBottom: '20px' }}>Missing Values Evaluator</h1>
  //     {/* Rest of your component */}
  //   </div>
  // );
  

  // const customStyles = {
  // 	header: {
  // 		style: {
  // 			minHeight: '56px',
	// 	},
  // 	},
  // 	headRow: {
  // 		style: {
  // 			borderTopStyle: 'solid',
  // 			borderTopWidth: '1px',
  //       fontWeight: 'bold',
  // 			borderTopColor: defaultThemes.default.divider.default,
  // 		},
  // 	},
  // 	headCells: {
  // 		style: {
  // 			'&:not(:last-of-type)': {
  // 				borderRightStyle: 'solid',
  // 				borderRightWidth: '1px',
  // 				borderRightColor: defaultThemes.default.divider.default,
  // 			},
  // 		},
  // 	},
  // 	cells: {
  // 		style: {
  // 			'&:not(:last-of-type)': {
  // 				borderRightStyle: 'solid',
  // 				borderRightWidth: '1px',
  // 				borderRightColor: defaultThemes.default.divider.default,
  // 			},
  // 		},
  // 	},
  // };


  const columns = data.length > 0 && Object.keys(data[0]).map((key) => ({
    name: key,
    selector: key,
    sortable: true,
    
   
  }));

  // const handleReplaceValues = () => {
  //   replaceMissingValues();
  // };

  console.log(data && { data });


  return (
    <div>
      {file && <p>Uploaded file: {file.name}</p>}
      <h1>Missing Values Evaluator</h1>
      <input type="file" accept=".csv, .xlsx, .xls" onChange={handleFileUpload} />
      {/* <a href="{% url 'file-upload' %}">Upload a File</a> */}
      <MDButton  onClick={handleUpload} color ="info"> Upload File</MDButton>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data.length > 0 && (
        <>
      <Card> 
        
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
      <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Missing Values Information
          </MDTypography>
          </MDBox>
          <MDBox  display="flex" justifyContent="flex-end">
          <MDButton onClick={handleReplaceValues} color ="success">Replace Missing Values</MDButton>
          </MDBox>
          
          </MDBox>
          <DataTable
          columns={[
            {
              name: 'Column Name',
              selector: 'columnName',
              sortable: true,
            },
            {
              name: 'Missing Values',
              selector: 'missingCount',
              sortable: true,
            },
          ]}
          data={missingValues}
          highlightOnHover
          responsive={true}
          striped={false}
          subHeaderAlign="right"
          fixedHeader={true}
          noTableHead={false}
          fixedHeaderScrollHeight="1000px"
          pagination
        />
        </Card>
        <br></br>
      <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
      <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Uploaded Data Table
          </MDTypography>
          </MDBox>
         {/* <MDBox  display="flex" justifyContent="flex-end">
          <MDButton onClick={handleReplaceValues} color ="success">Replace Missing Values</MDButton>
          </MDBox> */}
          </MDBox>
        <DataTable
          columns={columns}
          data={data}
          progressPending={pending}
          highlightOnHover
          responsive={true}
          striped={true}
          subHeaderAlign="right"
          fixedHeader={true}
          noTableHead ={true}
          conditionalRowStyles={[
            {
              when: (row, index) => index === 0, // Check if it's the first row by index
              style: {
                fontWeight: 'bold', // Apply bold font weight for the first row
              },
            },
          ]}
          fixedHeaderScrollHeight="1000px"
          pagination
          onColumnOrderChange={cols => console.log(cols)}
          customStyles={customStyles}
          />
        </Card>
          </>
)}


      {/* {missingValues.length > 0 && (
        <div>
           <button onClick={handleReplaceValues}>Replace Missing Values</button>
          <h2>Data with Missing Values</h2>
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
      )}  */}
    </div> 
  );
};

export default Datahandling;



