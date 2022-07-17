import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddMarkdownFab({ open, setOpen, content, setContent }) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const markdownObj = [
    {
      id: 0,
      title: "Heading",
      description: "Insert headings ranging from h1 to h6",
      markdownContent: "# Heading",
    },
    {
      id: 1,
      title: "Special Text",
      description: "Insert a bold and italic text",
      markdownContent: "** bold **",
    },
    {
      id: 2,
      title: "Block Quote",
      description: "Insert a blockquote",
      markdownContent: "> Lorem Ipsum",
    },
    {
      id: 3,
      title: " Orderd List",
      description: "Insert an ordered list",
      markdownContent: "** bold **",
    },
    {
      id: 4,
      title: "Unordered list",
      description: "Insert an unordered list",
      markdownContent: "> Lorem Ipsum",
    },
    {
      id: 5,
      title: "Code",
      description: "Insert a block of code",
      markdownContent: "# Heading",
    },
    {
      id: 6,
      title: "Hyperlink",
      description: "Insert a hyperlink",
      markdownContent: "> Lorem Ipsum",
    },
    {
      id: 7,
      title: "Image",
      description: "Insert an image",
      markdownContent: "# Heading",
    },
    {
      id: 8,
      title: "Line",
      description: "Insert a horizontal line",
      markdownContent: "> Lorem Ipsum",
    },
  ];

  const addMarkdown = (markdownText) => {
    setContent(content + "\n" + markdownText);
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add Markdown
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {markdownObj.map((item) => (
            <>
              <ListItem
                onClick={() => addMarkdown(item.markdownContent)}
                key={item.id}
                button
              >
                <ListItemText
                  primary={item.title}
                  secondary={item.description}
                />
              </ListItem>
              <Divider key={item.id} />
            </>
          ))}
        </List>
      </Dialog>
    </div>
  );
}
