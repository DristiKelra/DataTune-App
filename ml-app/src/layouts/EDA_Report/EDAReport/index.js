// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { Card} from '@mui/material';
// // import cheerio from 'cheerio';
// // import MDBox from 'components/MDBox';
// // import DashboardLayout from 'elements/LayoutContainers/DashboardLayout';
// // import DashboardNavbar from 'elements/Navbars/DashboardNavbar';
// // import Footer from 'elements/Footer';
// // import MDTypography from 'components/MDTypography';
// // import MDButton from 'components/MDButton';

// // const EDAreportpage = ({ edaReport }) => (
// //     <div dangerouslySetInnerHTML={{ __html: edaReport }} />
// //   );

// // export const EDAReport = () => {
// //     const [edaReport, setEdaReport] = useState('');
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);
// //     const [reportParts, setReportParts] = useState([]);


// //     // useEffect(() => {
// //     //     // Fetch HTML content from Django API endpoint
// //     //     axios.get('/api/get-eda-report/')
// //     //         .then(response => setEdaReport(response.data))
// //     //         .catch(error => console.error('Error fetching EDA report:', error));
// //     // }, []);

// //     // const exportToHTML = () => {
// //     //     // Create a Blob containing the HTML content
// //     //     const blob = new Blob([edaReport], { type: 'text/html' });

// //     //     // Create a download link and trigger a click event to download the file
// //     //     const link = document.createElement('a');
// //     //     link.href = URL.createObjectURL(blob);
// //     //     link.download = 'eda_report.html';
// //     //     link.click();
// //     // };

// //     useEffect(() => {
// //     // Fetch HTML content from Django API endpoint
// //     axios.get('/api/get-eda-report/')
// //       .then(response => {
// //         setEdaReport(response.data);
// //         setLoading(false);

// //         const $ = cheerio.load(response.data);
// //         const parts = [];
// //         $('div.content').find('div.container').children('div.row').each((index, element) => {
// //           const partTitle = $(element).find('h1.page-header').text();
// //           const partContent = $(element).find('.section-items').html();
// //           parts.push({ title: partTitle, content: partContent });
// //         // $('h1').each((index, element) => {
// //         //   const partTitle = $(element).text();
// //         //   const partContent = $(element).nextUntil('h1');
// //         //   parts.push({ title: partTitle, content: partContent.html() });
// //         });
// //         setReportParts(parts);
// //       })
// //       .catch(error => {
// //         setError('Error fetching EDA report. Please try again.');
// //         setLoading(false);
// //         console.error('Error fetching EDA report:', error);
// //       });
// //   }, []);

// //   const exportToHTML = () => {
// //     const blob = new Blob([edaReport], { type: 'text/html' });
// //     const link = document.createElement('a');
// //     link.href = URL.createObjectURL(blob);
// //     link.download = 'eda_report.html';
// //     link.click();
// //   };


// //   console.log(reportParts)

// // //   const EDAReport = ({ edaReport }) => {
    
// // //       <div dangerouslySetInnerHTML={{ __html: edaReport }} />

// // //   };


// // return (
// //     <DashboardLayout>
// //     <DashboardNavbar />
// //     {/* <MDBox  flexDirection="column" alignItems="center" justifyContent="center">
// //       <MDBox py={3}>
// //         <Card>
// //           <MDBox justifyContent="space-between" alignItems="center" p={3}>
// //             <MDBox>
// //               <MDTypography variant="h6" gutterBottom>
// //                 Exploratory Data Analysis Report
// //               </MDTypography>
// //             </MDBox>
          
            
// //           </MDBox>
// //         </Card>
// //       </MDBox> 
       
// //     </MDBox>*/}
    
    
// //     {loading && <p>Loading...</p>}
// //     {error && <p style={{ color: 'red' }}>{error}</p>}
// //     {!loading && !error && (
// //       <MDBox p={3} border="1px solid #ccc" borderRadius="5px" position="relative">
// //           <MDBox>
// //             <MDButton onClick={exportToHTML} style={{ cursor: 'pointer' }}>
// //               Export as HTML
// //             </MDButton>
// //          </MDBox>

// //             {console.log(reportParts)}
// //             {reportParts.map((part, index) => (
              
// //               <div key={index}>
// //               <h1>{part.title}</h1>
// //               <iframe title={`EDA Report - ${index}`} srcDoc={part.content} width="100%" height="500px" />
// //               </div>
// //             ))}
// //            </MDBox>
// //         )}
      
// //     <Footer />
// //   </DashboardLayout>
// // //         <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', position: 'relative' }}>
// // //             <button
// // //                 onClick={exportToHTML}
// // //                 style={{
// // //                     position: 'absolute',
// // //                     top: '10px',
// // //                     right: '10px',
// // //                     padding: '5px',
// // //                     cursor: 'pointer',
// // //                     background: '#007bff',
// // //                     color: '#fff',
// // //                     border: 'none',

// // //                     borderRadius: '3px',
// // //                 }}
// // //             >
// // //                 Export
// // //             </button>
// // //             <div dangerouslySetInnerHTML={{ __html: edaReport }} />
// // //         </div>
// //     );
// // };

// // export default EDAReport;
// // // {/* <div>
// // //             <iframe src="/api/get-eda-report" title="EDA Report" width="100%" height="500px"></iframe>
// // //         </div> */}


// //-----------------------------------------------------------------
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '@mui/material';
import cheerio from 'cheerio';
import MDBox from 'components/MDBox';
import DashboardLayout from 'elements/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'elements/Navbars/DashboardNavbar';
import Footer from 'elements/Footer';
import MDTypography from 'components/MDTypography';
import MDButton from 'components/MDButton';

const EDAReportPage = ({ edaReport }) => (
  <div dangerouslySetInnerHTML={{ __html: edaReport }} />
);

const ReportSection = ({ title, content }) => (
  <div>
    <h1>{title}</h1>
    {/* <div>{content}</div> */}
    <div dangerouslySetInnerHTML={{ __html: content }} />
    <iframe title={`EDA Report - ${title}`} srcDoc={content} width="100%" height="500px" />
  </div>
);

const EDAReport = () => {
  const [edaReport, setEdaReport] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportParts, setReportParts] = useState([]);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get('/api/get-eda-report/');
        setEdaReport(response.data);
        setLoading(false);

        // const $ = cheerio.load(response.data);
        // const parts = [];
        // $('div.content')
        //   .find('div.container')
        //   .children('div.row')
        //   .each((index, element) => {
        //     const partTitle = $(element).find('h1.page-header').text();
        //     const partContent = $(element).find('.section-items').html();
        //     parts.push({ title: partTitle, content: partContent });
        //   });
        // setReportParts(parts);
      } catch (error) {
        setError('Error fetching EDA report. Please try again.');
        setLoading(false);
        console.error('Error fetching EDA report:', error);
      }
    };

    fetchReport();
  }, []);

  const exportToHTML = () => {
    const blob = new Blob([edaReport], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'eda_report.html';
    link.click();
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox p={3} border="1px solid #ccc" borderRadius="5px" position="relative">
        <MDBox>
          <MDButton onClick={exportToHTML} style={{ cursor: 'pointer' }}>
            Export as HTML
          </MDButton>
        </MDBox>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && (
          <MDBox p={3} border="1px solid #ccc" borderRadius="5px" position="relative">
          <iframe title="EDA Report" srcDoc={edaReport} width="100%" height="500px" />
        </MDBox>
          // <>
          //   {reportParts.map((part, index) => (
          //     <ReportSection key={index} title={part.title} content={part.content} />
          //   ))}
          // </>
        )}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default EDAReport;

//------------------------------------------------------------------------------
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Card } from '@mui/material';
// import cheerio from 'cheerio';
// import MDBox from 'components/MDBox';
// import DashboardLayout from 'elements/LayoutContainers/DashboardLayout';
// import DashboardNavbar from 'elements/Navbars/DashboardNavbar';
// import Footer from 'elements/Footer';
// import MDTypography from 'components/MDTypography';
// import MDButton from 'components/MDButton';
// //import pandas as pd;
// import * as pandas from 'pandas-lib';

// const EDAReportPage = ({ edaReport }) => (
//   <div dangerouslySetInnerHTML={{ __html: edaReport }} />
// );

// const ReportSection = ({ title, content }) => (
//   <div>
//     <h1>{title}</h1>
//     <div dangerouslySetInnerHTML={{ __html: content }} />
//   </div>
// );

// const EDAReport = () => {
//   const [data, setData] = useState(null);
//   const [stats, setStats] = useState(null);

//   const fetchReport = async () => {
//     try {
//       const response = await axios.get('/api/get-eda-report/');
//       const data = response.data;
//       const parsedData = data.split('\n').map(row => row.split(','));
//       const df = pandas.DataFrame(parsedData);
//       const stats = getStats(df);
//       setData(df);
//       setStats(stats);
//     } catch (error) {
//       setError('Error fetching EDA report. Please try again.');
//       setLoading(false);
//       console.error('Error fetching EDA report:', error);
//     }
//   };

//   useEffect(() => {
//     fetchReport();
//   }, []);

//   const getStats = (df) => {
//     const missingCells = df.isnull().sum().sum();
//     const totalCells = df.shape[0] * df.shape[1];
//     const missingPercentage = (missingCells / totalCells) * 100;

//     const uniqueObservations = df.drop_duplicates().shape[0];
//     const duplicatePercentage = ((df.shape[0] - uniqueObservations) / df.shape[0]) * 100;

//     const variableTypes = df.dtypes;
//     const categoricalVariables = variableTypes[variableTypes.map(x => x === 'object')].index.tolist();
//     const textVariables = categoricalVariables;
//     const numericVariables = variableTypes[variableTypes.map(x => x in ['int16', 'int32', 'int64', 'float16', 'float32', 'float64'])].index.tolist();
//     //const unsupportedVariables = variableTypes[variableTypes.map(x => x not in ['object', 'int16', 'int32', 'int64', 'float16', 'float32', 'float64'])].index.tolist();

//     const memoryUsage = df.memory_usage(deep=true).sum() / (1024 * 1024);
//     const averageRecordSize = memoryUsage / df.shape[0];

//     return {
//       missingCells,
//       missingPercentage,
//       uniqueObservations,
//       duplicatePercentage,
//       categoricalVariables,
//       textVariables,
//       numericVariables,
//       unsupportedVariables,
//       memoryUsage,
//       averageRecordSize
//     };
//   };

//   if (!stats) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox p={3} border="1px solid #ccc" borderRadius="5px" position="relative">
//         <MDBox>
//           <MDButton onClick={exportToHTML} style={{ cursor: 'pointer' }}>
//             Export as HTML
//           </MDButton>
//         </MDBox>
//         {!stats ? (
//           <p>Loading...</p>
//         ) : (
//           <>
//             <h2>Dataset Statistics</h2>
//             <ReportSection title="Missing Cells" content={`There are ${stats.missingCells} missing cells, which is ${stats.missingPercentage}% of the total cells.`} /> 
//             <ReportSection title="Unique Observations" content={`There are ${stats.uniqueObservations} unique observations, which is ${100 - stats.duplicatePercentage}% of the total observations.`} />
//              <ReportSection title="Variable Types" content={renderVariableTypes(stats)} /> 
//              <ReportSection title="Memory Usage" content={`${stats.memoryUsage.toFixed(2)} MiB`} /> 
//              <ReportSection title="Average Record Size" content={`${stats.averageRecordSize.toFixed(2)} B`} /> 
//              </> 
//              )}
//              </MDBox> 
//              <Footer /> 
//              </DashboardLayout> 
//   )};
//         //      ); } 
//         //      const renderVariableTypes = (stats) => { 
//         //       const { categoricalVariables, textVariables, numericVariables, unsupportedVariables } = stats; 
//         //       return ( 
//         //       <div> 
//         //         <p> Categorical: {categoricalVariables.length} </p> 
//         //       <p> Text: {textVariables.length} </p> 
//         //       <p> Numeric: {numericVariables.length} </p> 
//         //       <p> Unsupported: {unsupportedVariables.length} </p> 
//         //       </div> 
//         //       ); } 
//         // <DashboardLayout/>  

// export default EDAReport;
