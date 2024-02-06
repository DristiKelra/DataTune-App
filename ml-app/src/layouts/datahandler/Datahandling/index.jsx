import React, { useState, useEffect } from 'react';
import DataTable , {Alignment, createTheme, defaultThemes}from 'react-data-table-component';

//import CSVDataTable from "./CSVDataTable";

import axios from 'axios';

import * as XLSX from 'xlsx';

export const Datahandling = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [data, setData] = useState([]);
  const [missingValues, setMissingValues] = useState([]);
  const [pending, setPending] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [csrfToken, setCsrfToken] = useState('');

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
  			borderTopColor: defaultThemes.default.divider.default,
  		},
  	},
  	headCells: {
  		style: {
  			'&:not(:last-of-type)': {
  				borderRightStyle: 'solid',
  				borderRightWidth: '1px',
  				borderRightColor: defaultThemes.default.divider.default,
  			},
  		},
  	},
  	cells: {
  		style: {
  			'&:not(:last-of-type)': {
  				borderRightStyle: 'solid',
  				borderRightWidth: '1px',
  				borderRightColor: defaultThemes.default.divider.default,
  			},
  		},
  	},
  };


  const columns = data.length > 0 && Object.keys(data[0]).map((key) => ({
    name: key,
    selector: key,
    sortable: true,
    
   
  }));

  
  console.log(data &&{data});

  return (
    <div>
      <h1>Missing Values Evaluator</h1>
      <input type="file" accept=".csv, .xlsx, .xls" onChange={handleFileUpload} />
      {/* <a href="{% url 'file-upload' %}">Upload a File</a> */}
      <button  onClick={handleUpload}> Upload File</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data.length > 0 && (
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
      )}
      {missingValues.length > 0 && (
        <div>
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
      )}
    </div>
  );
};

export default Datahandling;

