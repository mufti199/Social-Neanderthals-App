import React, { useState, useEffect, Fragment } from "react";

// Utility
import MyButton from "../../util/MyButton";

// MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
// Icons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { postAScream, clearUIErrors } from "../../redux/actions/dataActions";

// Styles
const useStyles = makeStyles((customTheme) => ({
  ...customTheme.theme,
  submitButton: {
    position: "relative",
    float: "right",
  },
  loadingSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    top: "10%",
  },
  dialog: {
    position: "absolute",
    top: "10%",
  },
}));

const PostScream = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, errors } = useSelector((state) => state.ui);
  const [body, setBody] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    if (errors.body) {
      setError(errors);
    }
    if (!errors.body && !loading) {
      setBody("");
      // Manually closing dialog
      setOpen(false);
      setError({});
    }
  }, [errors, loading]);

  // Handlers
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(clearUIErrors());
    setOpen(false);
    setError({});
  };

  const handleChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postAScream({ body }));
  };

  return (
    <Fragment>
      <MyButton onClick={handleOpen} tipTitle="Post a Scream!">
        <AddIcon />
      </MyButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        className={classes.dialog}
      >
        <MyButton
          onClick={handleClose}
          tipTitle="Close"
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="SCREAM!"
              multiline
              rows="3"
              placeholder="Scream at your fellow neanderthals"
              error={error.body ? true : false}
              helperText={error.body}
              className={classes.textField}
              onChange={handleChange}
              fullWidth
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.submitButton}
              disabled={loading}
            >
              Submit
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.loadingSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default PostScream;
