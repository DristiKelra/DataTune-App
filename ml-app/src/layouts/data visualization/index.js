import React, { useState } from 'react';
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import Papa from "papaparse";
import DashboardLayout from "elements/LayoutContainers/DashboardLayout";
import DashboardNavbar from "elements/Navbars/DashboardNavbar";
import Footer from "elements/Footer";
import ReportsBarChart from "elements/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "elements/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "elements/Cards/StatisticsCards/ComplexStatisticsCard";
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import DataViz from "./DataViz"; // Assuming this is the correct import for your DataViz component

export const Datavisualise = () => {
  const [uploadedData, setUploadedData] = useState(null);

  const handleFileUpload = (file) => {
   
    extractDataFromCSV(file, setUploadedData);
  };

  const extractDataFromCSV = (file, onDataExtracted) => {
    Papa.parse(file, {
      complete: (result) => {
        onDataExtracted(result.data);
      },
      header: true, // Assuming the first row is the header
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      

      {/* Add your DataViz component here */}
      <DataViz onDrop={handleFileUpload} />

      <MDBox mt={4.5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsBarChart
                color="info"
                title="Upload Dataset"
                description="Dataset prepared and updated for Model Development"
                date="Acceptable file types: excel and csv format"
                chart={reportsBarChartData}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox py={3}>
              <Grid container spacing={3}>
                {/* Add your statistics cards here */}
              </Grid>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="dark"
                title="completed tasks"
                description="Last Campaign Performance"
                date="just updated"
                chart={reportsLineChartData.tasks}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
};

export default Datavisualise;
