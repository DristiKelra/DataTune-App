// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "elements/LayoutContainers/DashboardLayout";
import DashboardNavbar from "elements/Navbars/DashboardNavbar";
import Footer from "elements/Footer";


import Datahandling from "layouts/datahandler/Datahandling";
import DefaultProjectCard from "elements/Cards/ProjectCards/DefaultProjectCard";


function datahandler() {

  

  return (

    <DashboardLayout>
      <DashboardNavbar />
  
        <Datahandling />
      <MDBox mt={4.5}>

            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>

              </MDBox>
            </Grid>
            </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default datahandler;
