import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AppState } from "../../../../AppContext";
import { Checkbox } from "@mui/material";

export default function RevokeShareProjectDialog({
  open,
  setOpen,
  title,
  message,
  yesText,
  noText,
  notify,
  project,
}) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const yesAction = () => {
    handleClose();
    console.log("Share Project: ", project);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>

          <div className="home-page__revoke-share-email-list-container">
            {project.sharedTo.map((item) => (
              <div className="home-page__revoke-share-email-list">
                <Checkbox defaultChecked />
                <span>{item.email}</span>
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{noText}</Button>
          <Button onClick={() => yesAction()}>{yesText}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
