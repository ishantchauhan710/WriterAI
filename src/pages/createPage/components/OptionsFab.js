import * as React from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import CollectionsIcon from "@mui/icons-material/Collections";

import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import TableViewOutlinedIcon from "@mui/icons-material/TableViewOutlined";
import AddLinkOutlinedIcon from "@mui/icons-material/AddLinkOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import AddCoverImageDialog from "./dialogs/AddCoverImageDialog";

// An array of FAB Options
// Since all options are used to add markdown values in editor other than 2, we use those 2 using if-else cases to perform special tasks
const actions = [
  {
    icon: <SmartToyOutlinedIcon />,
    name: "AiText",
    markdownContent: "AitextAction",
  },
  {
    icon: <CollectionsIcon />,
    name: "Cover",
    markdownContent: "CoverPicAction",
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

export default function OptionsFab({
  content,
  setContent,
  handleSplitScreen,
  coverPicUrl,
  setCoverPicUrl,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showCoverPicDialog, setShowCoverPicDialog] = React.useState(false);

  const addMarkdown = (markdownText) => {
    setContent(content + "\n" + markdownText + "\n<br/>\n");
    setOpen(false);
  };

  const handleFabItemClick = (markdown) => {
    if (markdown === "AitextAction") {
      handleSplitScreen(2);
      handleClose();
    } else if (markdown === "CoverPicAction") {
      setShowCoverPicDialog(true);
      handleClose();
    } else {
      addMarkdown(markdown);
    }
    handleClose();
  };

  const setCoverPic = (url) => {
    setCoverPic(url);
  };

  return (
    <>
      <AddCoverImageDialog
        open={showCoverPicDialog}
        setOpen={setShowCoverPicDialog}
        title="Add Cover Image"
        message="Paste the Image URL. It should have png or jpg file path otherwise you may get an error"
        yesText="Ok"
        noText="Cancel"
        input={coverPicUrl}
        setInput={setCoverPicUrl}
        fieldPlaceholder="Eg. https://www.example.com/image.jpg"
      />
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
