import React, { useEffect } from "react";
import { Alert, Snackbar } from "@mui/material";
import { AppState } from "../AppContext";

export const Notification = () => {
  const {
    setShowNotification,
    notificationMessage,
    notificationType,
  } = AppState();

  const positionState = {
    vertical: "bottom",
    horizontal: "center",
  };

  const { vertical, horizontal } = positionState;

  const handleClose = () => {
    setShowNotification(false);
  };

  return (
    <Snackbar
      open={true}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert
        variant="filled"
        onClose={handleClose}
        severity={notificationType}
        sx={{ width: "100%" }}
      >
        {notificationMessage}
      </Alert>
    </Snackbar>
  );
};
