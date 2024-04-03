
// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import DropFileInput from "../DataUpload/DropFileInput";
// ./components/drop-file-input/DropFileInput';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useFile} from "layouts/Filecontext"



function FileOverview() {
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

export default FileOverview;
