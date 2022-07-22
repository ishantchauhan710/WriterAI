import * as React from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";

import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import TableViewOutlinedIcon from "@mui/icons-material/TableViewOutlined";
import AddLinkOutlinedIcon from "@mui/icons-material/AddLinkOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";

const actions = [
  { icon: <SmartToyOutlinedIcon />, name: "AiText" },
  { icon: <AddPhotoAlternateOutlinedIcon />, name: "Image" },
  { icon: <TableViewOutlinedIcon />, name: "Table" },
  { icon: <AddLinkOutlinedIcon />, name: "Hyperlink" },
  { icon: <CodeOutlinedIcon />, name: "Code" },
];

export default function OptionsFab() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Backdrop
        sx={{ position: "absolute", width: "100%", height: "100%" }}
        style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
        open={open}
      />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: "absolute", bottom: 50, right: 30 }}
        FabProps={{
          sx: {
            bgcolor: "secondary.main",
            "&:hover": {
              bgcolor: "secondary.main",
            },
          },
        }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={handleClose}
            FabProps={{
              sx: {
                color: "primaryVariant.contrastText",
                bgcolor: "primaryVariant.main",
                "&:hover": {
                  bgcolor: "primaryVariant.darker",
                },
              },
            }}
          />
        ))}
      </SpeedDial>
    </>
  );
}
