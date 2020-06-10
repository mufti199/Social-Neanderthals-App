import React, { Fragment } from "react";
import Link from "react-router-dom/Link";
import dayjs from "dayjs";

// MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Styles
const useStyles = makeStyles((customTheme) => ({
  ...customTheme.theme,
  commentImage: {
    width: 100,
    height: 100,
    objectFit: "cover",
    borderRadius: "50%",
  },
  commentData: {
    marginLeft: 20,
  },
}));

const Comments = ({ comments }) => {
  const classes = useStyles();
  if (!comments) {
    return null;
  }
  return (
    <Grid container>
      {comments.map((comment, index) => {
        const { body, created, userImage, userHandle } = comment;
        return (
          <Fragment key={created}>
            <Grid item sm={12}>
              <Grid container>
                <Grid item sm={2}>
                  <img
                    src={userImage}
                    alt="comment"
                    className={classes.commentImage}
                  />
                </Grid>
                <Grid item sm={9}>
                  <div className={classes.commentData}>
                    <Link to={`/user/${userHandle}`}>
                      <Typography variant="h5" color="primary">
                        {userHandle}
                      </Typography>
                    </Link>
                    <Typography variant="body2" color="textSecondary">
                      {dayjs(created).format("h:mm a, MMMM DD YYYY")}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variabnt="body1">{body}</Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {index !== comments.length - 1 && (
              <hr className={classes.visibleSeparator} />
            )}
          </Fragment>
        );
      })}
    </Grid>
  );
};

export default Comments;
