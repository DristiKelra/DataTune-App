// /**
// =========================================================
// * Material Dashboard 2 React - v2.2.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/material-dashboard-react
// * Copyright 2023 Creative Tim (https://www.creative-tim.com)

// Coded by www.creative-tim.com

//  =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */

// // @mui material components
// import Grid from "@mui/material/Grid";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";

// // Material Dashboard 2 React example components
// import DashboardLayout from "elements/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "elements/Navbars/DashboardNavbar";
// import EDAReport from "./EDAReport";
// import Footer from "elements/Footer";
// import ReportsBarChart from "elements/Charts/BarCharts/ReportsBarChart";
// import ReportsLineChart from "elements/Charts/LineCharts/ReportsLineChart";
// import ComplexStatisticsCard from "elements/Cards/StatisticsCards/ComplexStatisticsCard";

// // Data
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
// import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// // Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
// import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

// function EDA_Report() {
//   const { sales, tasks } = reportsLineChartData;
//   const [edaReport, setEdaReport] = useState('');

//     useEffect(() => {
//         // Fetch HTML content from Django API endpoint
//         axios.get('/api/get-eda-report/')
//             .then(response => setEdaReport(response.data))
//             .catch(error => console.error('Error fetching EDA report:', error));
//     }, []);

//     const exportToHTML = () => {
//         // Create a Blob containing the HTML content
//         const blob = new Blob([edaReport], { type: 'text/html' });

//         // Create a download link and trigger a click event to download the file
//         const link = document.createElement('a');
//         link.href = URL.createObjectURL(blob);
//         link.download = 'eda_report.html';
//         link.click();
//     };


//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox py={3}>
//           <Card>
//             <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
//             <MDBox>
//               <MDTypography variant="h6" gutterBottom>
//                 Exploratory Data Analysis Report
//               </MDTypography>
             
//             </MDBox>
              
//             </MDBox>
//           </Card>
//       </MDBox>
      
//         {/* <MDBox color="text" px={2}>
//           <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
//             more_vert
//           </Icon>
//         </MDBox> */}
//         {/* {renderMenu} */}
//         <EDAReport/>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default EDA_Report;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Typography } from '@mui/material';
import MDBox from 'components/MDBox';
import DashboardLayout from 'elements/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'elements/Navbars/DashboardNavbar';
import EDAReport from './EDAReport';
import Footer from 'elements/Footer';



function EDA_Report() {


  return (
    <EDAReport/>
    // <DashboardLayout>
    //   <DashboardNavbar />
    //   <MDBox py={3}>
    //     <Card>
    //       <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
    //         <MDBox>
    //           <Typography variant="h6" gutterBottom>
    //             Exploratory Data Analysis Report
    //           </Typography>
    //         </MDBox>
    //         <MDBox>
    //           <button onClick={exportToHTML} style={{ cursor: 'pointer' }}>
    //             Export as HTML
    //           </button>
    //         </MDBox>
    //       </MDBox>
    //     </Card>
    //   </MDBox>
    //   {loading && <p>Loading...</p>}
    //   {error && <p style={{ color: 'red' }}>{error}</p>}
    //   {!loading && !error && <EDAReport edaReport={edaReport} />}
    //   <Footer />
    // </DashboardLayout>
  );
}

export default EDA_Report;

