import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

export default function AuthModal({ openAuthModal, setOpenAuthModal }) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => setOpenAuthModal(false);

  return (
    <div>
      <Modal
        open={openAuthModal}
        onClose={handleClose}
      >
        <Box sx={style}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                variant="fullWidth"
                textColor="secondary"
                indicatorColor="secondary"
              >
                <Tab style={{fontWeight: 600}} label="Login" value="1" />
                <Tab style={{fontWeight: 600}} label="Sign Up" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">Item One</TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
          </TabContext>
        </Box>
      </Modal>
    </div>
  );
}
