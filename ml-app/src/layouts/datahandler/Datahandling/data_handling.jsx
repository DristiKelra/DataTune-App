

// import React, { useState, useEffect } from "react";
// import DataTable from 'react-data-table-component';
// import * as XLSX from 'xlsx'; // Import XLSX for Excel file handling

// export const Datahandling = () => {
//   const [file, setFile] = useState(null);
//   const [data, setData] = useState([]);
//   const [missingValues, setMissingValues] = useState([]);

//   const handleFileUpload = (event) => {
//     const uploadedFile = event.target.files[0];
//     if (uploadedFile) {
//       setFile(uploadedFile);
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const content = e.target.result;
//         getdata(content);
//       };
//       reader.readAsBinaryString(uploadedFile);
//     }
//   };

//   const getdata = (content) => {
//     try {
//       const workbook = XLSX.read(content, { type: "binary" });
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];
//       const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
//       setData(parsedData);
//       evaluateMissingValues(parsedData);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const evaluateMissingValues = (data) => {
//     if (data.length > 0) {
//       const missingData = [];
//       for (let i = 0; i < data[0].length; i++) {
//         const column = data.map((row) => row[i] ? row[i].toString().trim() : '');
//         const missingCount = column.filter((value) => value === '').length;
//         missingData.push({ columnName: data[0][i], missingCount });
//       }
//       setMissingValues(missingData);
//     }
//   };

//   const columns = data.length > 0 && Object.keys(data[0]).map((key) => ({ name: key, selector: key, sortable: true })) || []

//   const CustomHeader = ({ columns }) => {
//       <thead>
//         <tr>
//           {columns.map((column, index) => (
//             <th key={index}>{column.name}</th>
//           ))}
//         </tr>
//       </thead>
//   }

//   useEffect(() => {
//     getdata();
//   }, []);

//   return (
//     <div>
//       <h1>Missing Values Evaluator</h1>
//       <input type="file" accept=".csv, .xlsx, .xls" onChange={handleFileUpload} />
//       <DataTable
//         columns={columns}
//         data={data}
//         noHeader={true}
//         //fixedHeader
//         highlightOnHover
//         responsive
//         selectableRows
//         persistTableHead = {true}
//         pagination
//         header={<CustomHeader />}
//         // conditionalRowStyles={[
//         // {
//         //   when: (row) => row.id === '1',
//         //      style: {
//         //          backgroundColor: 'yellow',
//         //          color: 'black',
//         //     },
//         // },
//         // ]}
        
//       />
//       <div>
//         {missingValues.length > 0 && (
//           <div>
//             <h2>Data with Missing Values</h2>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Column Name</th>
//                   <th>Missing Values</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {missingValues.map((item, index) => (
//                   <tr key={index}>
//                     <td>{item.columnName}</td>
//                     <td>{item.missingCount}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };


// export default Datahandling;

import React, { useState, useEffect} from 'react';
import DataTable , {Alignment, createTheme, defaultThemes}from 'react-data-table-component';

import * as XLSX from 'xlsx';

export const Datahandling = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [missingValues, setMissingValues] = useState([]);
  const [pending, setPending] = React.useState(true);
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
      evaluateMissingValues(parsedData);
    } catch (error) {
      setError('Error parsing the file. Please upload a valid file.');
      setData([]);
      setMissingValues([]);
    } finally {
      setLoading(false);
    }
  };

  if (data.length > 0) {
    data = data.map((item, index) => {
      if (index === 0) {
        // Apply style to the first row
        return { ...item, style: { fontWeight: 'bold', color: 'blue' } };
      }
      return item;
    });
  }
  

  const evaluateMissingValues = (data) => {
    if (data.length > 0) {
      const missingData = [];
      for (let i = 0; i < data[0].length; i++) {
        const column = data.map((row) => row[i] ? row[i].toString().trim() : '');
        const missingCount = column.filter((value) => value === '').length;
        missingData.push({ columnName: data[0][i], missingCount });
      }
      setMissingValues(missingData);
    }
  };


  //const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

//   const customStyles = {
//     rows: {
//         style: {
//             minHeight: '72px', // override the row height
//         },
//     },
//     headCells: {
//         style: {
//             paddingLeft: '8px', // override the cell padding for head cells
//             paddingRight: '8px',
//         },
//     },
//     cells: {
//         style: {
//             paddingLeft: '8px', // override the cell padding for data cells
//             paddingRight: '8px',
//         },
//     },
// };


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

createTheme('solarized', {
  text: {
    primary: '#268bd2',
    secondary: '#2aa198',
    
  },
  // background: {
  //   default: '#002b36',
    
  // },
  context: {
    //background: '#cb4b16',
    background:'rgba(0,0,0,.08)',
    //backgroundColor: 'rgba(187, 204, 221, 1)',
    text: '#FFFFFF',
  },
  divider: {
    default: '#073642',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    //hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
}, 'light');

// createTheme('dark', {
//   background: {
//     default: 'transparent',
//   },
// });  

//const columns = generateColumnsFromData(data);

const columns = data.length > 0 && Object.keys(data[0]).map((key) => ({
  name: key,
  selector: key,
  sortable: true,
  cell: (row) => (row.style ? <span style={row.style}>{row[key]}</span> : row[key]),
}));

// let columns = [];

//   if (data.length > 0) {
//     columns = Object.keys(data[0]).map((key) => ({
//       name: key,
//       selector: key,
//       sortable: true,
//       cell: (row) => (row.style ? <span style={row.style}>{row[key]}</span> : row[key]),
//     }));
//   }
// const columns = (data.length > 0 && Object.keys(data[0]).map((key) =>
//   ({
//     name: key,
//     selector:key,
//     cell: (row) => (row.style ? <span style={row.style}>{row[key]}</span> : row[key]),
//     //style: file ? { fontWeight: 'bold', color: 'black' } : {}, // Apply styles conditionally
//   })))



//const columns = (data.length > 0 && Object.keys(data[0]).map((key) => ({ name: key, selector: key, sortable: true, reorder: true,}))) || []

//const columns_1 = (data.length > 0 && Object.keys(data[0]).map((key) => ({ name: key, selector: key, sortable: true, reorder: true,}))) || []

// const columns = (data.length > 0 && data[0].map((header) => ({
//   name: header,
//   selector: header,
//   sortable: true,
//   reorder: true,
// }))) || [];

//const header_er = (data.length > 0 && data[0].map((key) => ({ name: key, selector: key, sortable: true, reorder: true }))) || [];



const Template = args => <FixedHeaderStory {...args} />;
 const FixedHeader = Template.bind({});

  FixedHeader.args = {
	fixedHeader: true,
	fixedHeaderScrollHeight: '300px',
};

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPending(false);
    // Optionally, load initial data or perform any setup here
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  
  const FixedHeaderStory = ({ fixedHeader, fixedHeaderScrollHeight }) => (
    <DataTable
      columns={columns}
      data={data}
      fixedHeader={fixedHeader}
      fixedHeaderScrollHeight={fixedHeaderScrollHeight}
      pagination
    />
  );

  // const subHeaderComponent = (
  //   	<div style={{ display: 'flex', alignItems: 'center' }}>
  //   		<TextField id="outlined-basic" label="Search" variant="outlined" size="small" style={{ margin: '5px' }} />
  //   		<Icon1 style={{ margin: '5px' }} color="action" />
  //   		<Icon2 style={{ margin: '5px' }} color="action" />
  //   		<Icon3 style={{ margin: '5px' }} color="action" />
  //   	</div>
  //   );

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div>
      <h1>Missing Values Evaluator</h1>
      <input type="file" accept=".csv, .xlsx, .xls" onChange={handleFileUpload} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data.length > 0 && (
        <CSVDataTable data={csvData} /> 
        <DataTable
          columns={columns}
          data={data}
          //header ={data.at(0)}
          progressPending={pending}
          highlightOnHover
          responsive = {true}
          //theme="solarized"
          striped = {true}
          //subHeader = {subHeaderComponent}
          subHeaderAlign= {Alignment.RIGHT}
          // conditionalRowStyles={[
          //   {
          //     when: (row) => row.id === '1',
          //     style: {
          //       backgroundColor: 'yellow',
          //       color: 'black',
          //     },
          //   },
          // ]}
          //persistTableHead={columns_s}
          fixedHeader={true}
      	  fixedHeaderScrollHeight={"1000px"}
          pagination
          noTableHead ={true}
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
  )
};
export default Datahandling;