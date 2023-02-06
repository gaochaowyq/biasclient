

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";

function Error() {
  return (
    <DashboardLayout>
        Coming Soon
      <Footer />
    </DashboardLayout>
  );
}
function ErrorMessage(props) {
  return (
    <DashboardLayout>
        props.message
      <Footer />
    </DashboardLayout>
  );
}

export  {Error,ErrorMessage};