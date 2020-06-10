import React, { Fragment } from "react";
import dayjs from "dayjs";
import Link from "react-router-dom/Link";

// MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

// Styles
const useStyles = makeStyles((customTheme) => ({
  ...customTheme.theme,
  profile: customTheme.profile,
  paper: customTheme.paper,
}));

const StaticProfile = ({ profile }) => {
  const classes = useStyles();
  const { handle, created, imageUrl, bio, website, location } = profile;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="imageWrapper">
          <img src={imageUrl} className="profileImage" alt="Profile" />
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
  );
};

export default StaticProfile;
