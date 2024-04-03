// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "elements/LayoutContainers/DashboardLayout";
import DashboardNavbar from "elements/Navbars/DashboardNavbar";
import Footer from "elements/Footer";



// Dashboard components

import FileOverview from "layouts/dashboard/components/FileOverview";
import DefaultProjectCard from "elements/Cards/ProjectCards/DefaultProjectCard";


import Dataanalysis from "assets/images/Dataanalysis.jpg";
import Datavisualization from "assets/images/datavisualization.jpg";
import dataupload from "assets/images/dataupload.jpg";
import datahandling from "assets/images/datahandling.jpg";


function Dashboard() {
 

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>

        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={12}>
              <FileOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={dataupload}
                label="project #1"
                title="Data Uploads"
                description="Acceptable file types are .csv and .xlsx"
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "success",
                  label: "view page",
                }}
                
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={datahandling}
                label="project #2"
                title="Data Handling"
                description="Missing values from the data is identified"
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view page",
                }}
                
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={Dataanalysis}
                label="project #3"
                title="Data Reports"
                description="A overview of data with details about each and every column"
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "success",
                  label: "view page",
                }}
                
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={Datavisualization}
                label="project #4"
                title="Data Visualisation"
                description="Data Visualized in the form of charts"
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view page",
                }}
                
              />
            </Grid>
          </Grid>
        </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
export default Dashboard;