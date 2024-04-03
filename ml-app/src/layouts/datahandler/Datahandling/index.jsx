import React, { useState, useEffect } from 'react';
import DataTable , {Alignment, createTheme, defaultThemes}from 'react-data-table-component';
import MDButton from 'components/MDButton';
import {useFile} from "layouts/Filecontext";
import axios from 'axios';

import * as XLSX from 'xlsx';
import MDBox from 'components/MDBox';
import { Card } from '@mui/material';
import MDTypography from 'components/MDTypography';
import Loader from 'components/Loader';

export const Datahandling = () => {
  //const { file } = useFile();
  const {file} = useFile();
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
      //setFile(uploadedFile);
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


  const handleUpload = async () => {
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
          headers: {
            'Content-Disposition': `attachment; filename="${fileName}"`,
            'X-CSRFToken': csrfToken,
          },
        });
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



  const parseData = (content) => {
    try {
      setLoading(true);
      setError(null);
      const workbook = XLSX.read(content, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setData(parsedData);
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
    // Automatically parse and set data when file changes
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        parseData(content);
      };
      reader.readAsBinaryString(file);
    }
  }, [file]);

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
  
  const replaceMissingValues = (method) => {
    const newData = [...data];
    newData.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell === null || cell === undefined || cell === '') {
          const columnValues = newData.map((r) => r[cellIndex]).filter((val) => val !== null && val !== undefined && val !== '');
          let newValue;
          if (method === 'mean') {
            const sum = columnValues.reduce((acc, val) => acc + parseFloat(val), 0);
            newValue = sum / columnValues.length;
          } else if (method === 'median') {
            newValue = calculateMedian(columnValues);
          }
          newData[rowIndex][cellIndex] = newValue;
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


  const columns = data.length > 0 && Object.keys(data[0]).map((key) => ({
    name: key,
    selector: key,
    sortable: true,
    
   
  }));

  
  console.log(data && { data });


  return (
    <div>
      {file && <p>Uploaded file: {file.name}</p>}
      <h1>Missing Values Evaluator</h1>
      <input type="file" accept=".csv, .xlsx, .xls" onChange={handleFileUpload} />
      {/* <a href="{% url 'file-upload' %}">Upload a File</a> */}
      <MDButton  onClick={handleUpload} color ="info"> Upload File</MDButton>
      {loading && <Loader/>}
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

