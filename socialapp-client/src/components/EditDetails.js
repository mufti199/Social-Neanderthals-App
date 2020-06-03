import React, { Fragment, useState, useEffect } from "react";
import MyButton from "../util/MyButton";

// MUI
import { makeStyles } from "@material-ui/core/styles/";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// Icons
import EditIcon from "@material-ui/icons/Edit";

// Redux
import { editUserDetails } from "../redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";

// Styles
const useStyles = makeStyles((customTheme) => ({
  ...customTheme.theme,
  button: {
    float: "right",
  },
}));

const EditDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const credentials = useSelector((state) => state.user.credentials);

  // States
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);

  const mapDetailsToState = (credentials) => {
    setBio(credentials.bio ? credentials.bio : "");
    setWebsite(credentials.website ? credentials.website : "");
    setLocation(credentials.location ? credentials.location : "");
  };

  useEffect(() => {
    mapDetailsToState(credentials);
  }, [credentials]);

  // Opened edit details form
  const handleOpen = () => {
    setOpen(true);
    mapDetailsToState(credentials);
  };

  // Closed edit details form
  const handleClose = () => {
    setOpen(false);
  };

  // Editing details
  const handleChange = (event) => {
    if (event.target.name === "bio") {
      setBio(event.target.value);
    }
    if (event.target.name === "website") {
      setWebsite(event.target.value);
    }
    if (event.target.name === "location") {
      setLocation(event.target.value);
    }
  };

  const handleSubmit = () => {
    const userDetails = {
      bio,
      website,
      location,
    };
    dispatch(editUserDetails(userDetails));
    handleClose();
  };

  return (
    <Fragment>
      <MyButton
        tipTitle="Edit Details"
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="bio"
              multiline
              rows="3"
              placeholder="A short bio about your inner neanderthall"
              className={classes.TextField}
              value={bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="website"
              placeholder="Your personal/professional/neanderthall website"
              className={classes.TextField}
              value={website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="location"
              placeholder="Where you live"
              className={classes.TextField}
              value={location}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default EditDetails;
