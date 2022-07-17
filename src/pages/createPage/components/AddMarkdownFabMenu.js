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

export default function AddMarkdownFabMenu({
  open,
  setOpen,
  content,
  setContent,
}) {
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
      markdownContent:
        "# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4",
    },
    {
      id: 1,
      title: "Special Text",
      description: "Insert a bold text",
      markdownContent: "**bold** *italic*",
    },
    {
      id: 2,
      title: "Block Quote",
      description: "Insert a blockquote",
      markdownContent: "> Lorem Ipsum\n",
    },
    {
      id: 3,
      title: "Hyperlink",
      description: "Insert a hyperlink",
      markdownContent: "<a href='www.yoururl.com'>Link Text</a>",
    },
    {
      id: 4,
      title: "Image",
      description: "Insert an image",
      markdownContent:
        "<img src='https://cdn.pixabay.com/photo/2017/06/26/12/39/husky-2443664__340.jpg'/>",
    },
    {
      id: 5,
      title: "Table",
      description: "Insert a table template",
      markdownContent:
        "| Col1 | Col1 | Col1 |\n|------|------|------|\n| Col2 | Col2 | Col2 |\n| Col3 | Col3 | Col3 |",
    },
    {
      id: 6,
      title: " Orderd List",
      description: "Insert an ordered list",
      markdownContent: "1. Item 1\n2. Item 2\n3. Item 3",
    },
    {
      id: 7,
      title: "Unordered list",
      description: "Insert an unordered list",
      markdownContent: "* Item 1\n* Item 2\n* Item 3",
    },
    {
      id: 8,
      title: "Code",
      description: "Insert a block of code",
      markdownContent:
        "```document.getElementById('test').innerHTML='Hello World'```",
    },
    {
      id: 9,
      title: "Line",
      description: "Insert a horizontal line",
      markdownContent: "***",
    },
  ];

  const addMarkdown = (markdownText) => {
    setContent(content + "\n" + markdownText + "\n<br/>\n");
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
