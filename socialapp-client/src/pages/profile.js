import React, { Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// Utility
import MyButton from "../util/MyButton";
import ProfileSkeleton from "../util/ProfileSkeleton";

// Components
import EditDetails from "../components/profile/EditDetails";

// MUI
import { makeStyles } from "@material-ui/core/styles/";
import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { uploadImage } from "../redux/actions/userActions";

// Styles
const useStyles = makeStyles((customTheme) => ({
  profile: customTheme.profile,
  paper: customTheme.paper,
  buttons: customTheme.buttons,
  pictureButton: {
    position: "absolute",
    left: "70%",
    [customTheme.breakpoints.down("sm")]: {
      left: "90%",
    },
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

  let profileMarkUp = !loading ? (
    authenticated ? (
      <Grid
        container
        direction="column"
        justify="space-around"
        alignItems="center"
      >
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
                btnClassName={classes.pictureButton}
              >
                <EditIcon color="primary" />
              </MyButton>
            </div>
            <hr />
            <div className="profileDetails">
              <MuiLink
                component={Link}
                to={`/user/${handle}`}
                color="primary"
                variant="h5"
              >
                @{handle}
              </MuiLink>
              <EditDetails className={classes.detailsButton} />
              <hr />
              {bio && <Typography variant="body2">{bio}</Typography>}
              <hr />
              {location && (
                <Fragment>
                  <LocationOn color="primary" /> <span>{location}</span>
                </Fragment>
              )}
              <hr />
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
          </div>
        </Paper>
      </Grid>
    ) : (
      <Grid
        container
        direction="column"
        justify="space-around"
        alignItems="center"
      >
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
      </Grid>
    )
  ) : (
    <Grid container justify="center" alignItems="center">
      <ProfileSkeleton />
    </Grid>
  );
  return profileMarkUp;
};

export default Profile;
