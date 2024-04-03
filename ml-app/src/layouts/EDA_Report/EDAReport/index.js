import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MDBox from 'components/MDBox';
import DashboardLayout from 'elements/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'elements/Navbars/DashboardNavbar';
import Footer from 'elements/Footer';
import MDButton from 'components/MDButton';
import Loader from 'components/Loader';

const EDAReportPage = ({ edaReport }) => (
  <div dangerouslySetInnerHTML={{ __html: edaReport }} />
);

const ReportSection = ({ title, content }) => (
  <div>
    <h1>{title}</h1>
    <div>{content}</div>
    <div dangerouslySetInnerHTML={{ __html: content }} />
    <iframe title={`EDA Report - ${title}`} content={`EDA Report - ${content}`}srcDoc={content} width="100%" height="500px" />
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
      <MDBox p={3} border="1px solid #ccc" borderRadius="5px" position="relative" >
        <MDBox display="flex" justifyContent="flex-end">
          <MDButton onClick={exportToHTML} style={{ cursor: 'pointer' }} variant= 'gradient' color= 'info'>
            Export as HTML
          </MDButton>
        </MDBox>
        {loading && <Loader/>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && (
          <iframe title="EDA Report" srcDoc={edaReport} width="100%" height="500px" />
          )}
       
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default EDAReport;