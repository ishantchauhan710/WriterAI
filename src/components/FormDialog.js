import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog({
  open,
  setOpen,
  title,
  message,
  fieldPlaceholder,
  yesText,
  noText,
  yesActionFunction,
  notify,
}) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const yesAction = () => {
    if (!input) {
      notify("Please type something","error")
    } else {
      yesActionFunction();
      handleClose();
    }
  };

  const [input, setInput] = React.useState("");

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={fieldPlaceholder}
            fullWidth
            variant="standard"
            style={{ marginTop: 10 }}
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{noText}</Button>
          <Button onClick={() => yesAction()}>{yesText}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
