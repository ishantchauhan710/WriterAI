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
  {
    icon: <SmartToyOutlinedIcon />,
    name: "AiText",
    markdownContent: "AitextAction",
  },
  {
    icon: <AddPhotoAlternateOutlinedIcon />,
    name: "Image",
    markdownContent:
      "<img src='https://cdn.pixabay.com/photo/2017/06/26/12/39/husky-2443664__340.jpg'/>",
  },
  {
    icon: <TableViewOutlinedIcon />,
    name: "Table",
    markdownContent:
      "| Col1 | Col1 | Col1 |\n|------|------|------|\n| Col2 | Col2 | Col2 |\n| Col3 | Col3 | Col3 |",
  },
  {
    icon: <AddLinkOutlinedIcon />,
    name: "Hyperlink",
    markdownContent: "<a href='www.yoururl.com'>Link Text</a>",
  },
  {
    icon: <CodeOutlinedIcon />,
    name: "Code",
    markdownContent:
      "```document.getElementById('test').innerHTML='Hello World'```",
  },
];

export default function OptionsFab({ content, setContent }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addMarkdown = (markdownText) => {
    setContent(content + "\n" + markdownText + "\n<br/>\n");
    setOpen(false);
  };

  const handleFabItemClick = (markdown) => {
    if (markdown === "AiText") {
    } else {
      addMarkdown(markdown);
    }
    handleClose();
  };

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
            onClick={(e) => handleFabItemClick(action.markdownContent)}
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
