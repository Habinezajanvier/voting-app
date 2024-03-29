import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ResponseSnack = ({ open, handleClose, message, color }) => (
  <Snackbar
    anchorOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    open={open}
    autoHideDuration={6000}
    onClose={handleClose}
  >
    <Alert onClose={handleClose} severity={color}>
      {message}
    </Alert>
  </Snackbar>
);

export default ResponseSnack;
