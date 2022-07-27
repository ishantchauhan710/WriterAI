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
  revokeFunction,
}) {
  let usersToRevokeAccess = [];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    usersToRevokeAccess = [];
    setOpen(false);
  };

  const yesAction = () => {
    revokeFunction(usersToRevokeAccess);
    setOpen(false);
  };

  const addToRevokeUserList = (id) => {
    //console.log(email);
    let idExists = false;
    usersToRevokeAccess.map((item) => {
      if (item === id) {
        idExists = true;
      }
    });
    if (idExists === false) {
      const newArray = [...usersToRevokeAccess, id];
      usersToRevokeAccess = newArray;
      //console.log("Shared Id Added");
    } else {
      const newArray = usersToRevokeAccess.filter((item) => {
        return id != item;
      });
      usersToRevokeAccess = newArray;
      //console.log("Shared Id Removed");
    }
    console.log("Users: ", usersToRevokeAccess);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>

          <div className="home-page__revoke-share-email-list-container">
            {project.sharedTo &&
              project.sharedTo.map((item, index) => (
                <div key={index} className="home-page__revoke-share-email-list">
                  <Checkbox
                    onClick={() => {
                      addToRevokeUserList(item.sharedId);
                      //console.log(item);
                    }}
                  />
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
