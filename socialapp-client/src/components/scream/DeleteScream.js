import React, { Fragment, useState } from "react";

// Utility
import MyButton from "../../util/MyButton";

// MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
// Icons
import DeleteOutline from "@material-ui/icons/DeleteOutline";

// Redux
import { useDispatch } from "react-redux";
import { deleteScream } from "../../redux/actions/dataActions";

// Styles
const useStyles = makeStyles((customTheme) => ({
  deleteButton: {
    position: "absolute",
    top: "1%",
    left: "90%",
  },
}));

const DeleteScream = ({ screamId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  // Handlers
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteScream = () => {
    dispatch(deleteScream(screamId));
    setOpen(false);
  };

  // FIX API CREDENTIALS FROM GITHUB - FUNCTION/ADMIN.JSON

  return (
    <Fragment>
      <MyButton
        tipTitle="Delete Scream"
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color="secondary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete this scream ?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteScream} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default DeleteScream;
