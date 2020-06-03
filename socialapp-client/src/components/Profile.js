import React, { Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import EditDetails from "../components/EditDetails";
import MyButton from "../util/MyButton";

// MUI
import { makeStyles } from "@material-ui/core/styles/";
import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { uploadImage, logoutUser } from "../redux/actions/userActions";

// Styles
const useStyles = makeStyles((customTheme) => ({
  profile: customTheme.profile,
  paper: customTheme.paper,
  buttons: customTheme.buttons,
  backButton: {
    paddingTop: "15px",
  },
}));

const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // Profile details
  const {
    user: {
      credentials: { handle, created, imageUrl, bio, website, location },
      loading,
      authenticated,
    },
  } = useSelector((state) => state);

  // Change Profile picture
  const handleImageChange = (event) => {
    // Send to server
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    dispatch(uploadImage(formData));
  };
  const imageInput = useRef(null);
  const handleEditPicture = () => {
    const fileInput = imageInput.current;
    fileInput.click();
  };

  // Logout
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  let profileMarkUp = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="imageWrapper">
            <img src={imageUrl} className="profileImage" alt="Profile" />
            <input
              type="file"
              id="imageInput"
              ref={imageInput}
              hidden="hidden"
              onChange={handleImageChange}
            />
            <MyButton
              tipTitle="Change Profile Picture"
              onClick={handleEditPicture}
              btnClassName="button"
            >
              <EditIcon color="primary" />
            </MyButton>
          </div>
          <hr />
          <div className="profileDetails">
            <MuiLink
              component={Link}
              to={`/users/${handle}`}
              color="primary"
              variant="h5"
            >
              @{handle}
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <Fragment>
                (<LocationOn color="primary" /> <span>{location}</span>)
              </Fragment>
            )}
            {website && (
              <Fragment>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {" "}
                  {website}
                </a>
                <hr />
              </Fragment>
            )}
            <CalendarToday color="primary" />{" "}
            <span>Joined {dayjs(created).format("MMM YYYY")}</span>
          </div>
          <MyButton
            tipTitle="Logout"
            onClick={handleLogout}
            btnClassName={classes.backButton}
          >
            <KeyboardReturn color="primary" />
          </MyButton>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found. Please login again.
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <p> Loading...</p>
  );
  return profileMarkUp;
};

export default Profile;
