import React from "react";
import NoImg from "../images/no-img.png";

// MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

// Styles
const useStyles = makeStyles((customTheme) => ({
  profile: customTheme.profile,
  paper: customTheme.paper,
  buttons: customTheme.buttons,
  handle: {
    width: 60,
    height: 18,
    backgroundColor: customTheme.palette.primary.main,
    marginBottom: 7,
  },
  fullLine: {
    height: 15,
    width: "90%",
    backgroundColor: "rgba(0,0,0, 0.6)",
    marginBottom: 10,
  },
}));

const ProfileSkeleton = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="imageWrapper">
          <img src={NoImg} alt="profile" className="profileImage" />
        </div>
        <hr />
        <div className="profileDetails">
          <div className={classes.handle} />
          <hr />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <hr />
          <LocationOn color="primary" /> <span>Location</span>
          <hr />
          <LinkIcon color="primary" /> https://website.com
          <hr />
          <CalendarToday color="primary" /> Joined Date
        </div>
      </div>
    </Paper>
  );
};

export default ProfileSkeleton;
