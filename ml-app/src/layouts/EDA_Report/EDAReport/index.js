import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card} from '@mui/material';
import MDBox from 'components/MDBox';
import DashboardLayout from 'elements/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'elements/Navbars/DashboardNavbar';
import Footer from 'elements/Footer';
import MDTypography from 'components/MDTypography';

const EDAreportpage = ({ edaReport }) => (
    <div dangerouslySetInnerHTML={{ __html: edaReport }} />
  );

export const EDAReport = () => {
    const [edaReport, setEdaReport] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    // useEffect(() => {
    //     // Fetch HTML content from Django API endpoint
    //     axios.get('/api/get-eda-report/')
    //         .then(response => setEdaReport(response.data))
    //         .catch(error => console.error('Error fetching EDA report:', error));
    // }, []);

    // const exportToHTML = () => {
    //     // Create a Blob containing the HTML content
    //     const blob = new Blob([edaReport], { type: 'text/html' });

    //     // Create a download link and trigger a click event to download the file
    //     const link = document.createElement('a');
    //     link.href = URL.createObjectURL(blob);
    //     link.download = 'eda_report.html';
    //     link.click();
    // };

    useEffect(() => {
    // Fetch HTML content from Django API endpoint
    axios.get('/api/get-eda-report/')
      .then(response => {
        setEdaReport(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching EDA report. Please try again.');
        setLoading(false);
        console.error('Error fetching EDA report:', error);
      });
  }, []);

  const exportToHTML = () => {
    const blob = new Blob([edaReport], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'eda_report.html';
    link.click();
  };

//   const EDAReport = ({ edaReport }) => {
    
//       <div dangerouslySetInnerHTML={{ __html: edaReport }} />

//   };


return (
    <DashboardLayout>
    <DashboardNavbar />
    <MDBox  flexDirection="column" alignItems="center" justifyContent="center">
      <MDBox py={3}>
        <Card>
          <MDBox justifyContent="space-between" alignItems="center" p={3}>
            <MDBox>
              <MDTypography variant="h6" gutterBottom>
                Exploratory Data Analysis Report
              </MDTypography>
            </MDBox>
            <MDBox>
              <button onClick={exportToHTML} style={{ cursor: 'pointer' }}>
                Export as HTML
              </button>
            </MDBox>
            
          </MDBox>
        </Card>
      </MDBox>
       
    </MDBox>
    {loading && <p>Loading...</p>}
    {error && <p style={{ color: 'red' }}>{error}</p>}
    {!loading && !error && (
          <MDBox p={3} border="1px solid #ccc" borderRadius="5px" position="relative">
            <iframe title="EDA Report" srcDoc={edaReport} width="100%" height="500px" />
          </MDBox>
        )}
    <Footer />
  </DashboardLayout>
//         <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', position: 'relative' }}>
//             <button
//                 onClick={exportToHTML}
//                 style={{
//                     position: 'absolute',
//                     top: '10px',
//                     right: '10px',
//                     padding: '5px',
//                     cursor: 'pointer',
//                     background: '#007bff',
//                     color: '#fff',
//                     border: 'none',
//                     borderRadius: '3px',
//                 }}
//             >
//                 Export
//             </button>
//             <div dangerouslySetInnerHTML={{ __html: edaReport }} />
//         </div>
    );
};

export default EDAReport;
// {/* <div>
//             <iframe src="/api/get-eda-report" title="EDA Report" width="100%" height="500px"></iframe>
//         </div> */}