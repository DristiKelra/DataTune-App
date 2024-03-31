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
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import DropFileInput from "../DataUpload/DropFileInput";
// ./components/drop-file-input/DropFileInput';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useFile} from "layouts/Filecontext"

// Material Dashboard 2 React example components
import TimelineItem from "elements/Timeline/TimelineItem";

function OrdersOverview() {
  const { setFile } = useFile();
  //const [fileName, setFileName] = useState('');
  const onFileChange = (files) => {
    console.log(files);
}

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
      <MDTypography variant="h5" fontWeight="medium">
          Drop files input
        </MDTypography>
        <DropFileInput
          onFileChange={(files) => onFileChange(files)}
        />
      </MDBox>
    </Card>
  );
}

export default OrdersOverview;
