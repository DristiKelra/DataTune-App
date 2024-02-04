import React, { useState, useEffect} from 'react';
import DataTable , {Alignment, createTheme, defaultThemes}from 'react-data-table-component';

import * as XLSX from 'xlsx';

export const DataUploader = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        parseData(content);
      };
      reader.readAsBinaryString(uploadedFile);
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
    } catch (error) {
      setError('Error parsing the file. Please upload a valid file.');
      setData([]);

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
    
    //cell: (row) => (row.style ? <span style={row.style}>{row[key]}</span> : row[key]),
  }));

  // const missing_data = missingValues.length > 0 && missingValues.map((item, index) => (
  //   key={index}
  // ))
  console.log(data &&{data});

<<<<<<< HEAD
  

=======
>>>>>>> origin/master

  return (
    <div>
      <h1>Data Visualization</h1>
      <input type="file" accept=".csv, .xlsx, .xls" onChange={handleFileUpload} />
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
      
    </div>
  )
};
export default DataUploader;