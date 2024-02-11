/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "elements/LayoutContainers/DashboardLayout";
import DashboardNavbar from "elements/Navbars/DashboardNavbar";
import Footer from "elements/Footer";
import ReportsBarChart from "elements/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "elements/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "elements/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import DefaultProjectCard from "elements/Cards/ProjectCards/DefaultProjectCard";


import Dataanalysis from "assets/images/Dataanalysis.jpg";
import Datavisualization from "assets/images/datavisualization.jpg";
import dataupload from "assets/images/dataupload.jpg";
import datahandling from "assets/images/datahandling.jpg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Data Uploads"
                //count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Data Visualizations"
                //count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Data Handling"
                //count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Data Reports"
                //count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>

        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={12}>
              {/* <Projects /> */}
              <OrdersOverview />
            </Grid>
            {/* <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid> */}
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
