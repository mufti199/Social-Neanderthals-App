import React from "react";
import Link from "react-router-dom/Link";
import dayjs from "dayjs";

//MUI
import { makeStyles } from "@material-ui/core/styles/";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    display: "felx",
    marginBottom: 20,
  },
  image: {
    height: 100,
    maxWidth: 100,
  },
  content: {
    padding: "auto",
  },
});

const Scream = ({ scream }) => {
  const classes = useStyles();
  const {
    body,
    created,
    userImage,
    userHandle,
    screamId,
    likeCount,
    commentCount,
  } = scream;

  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
          color="primary"
        >
          {userHandle}{" "}
        </Typography>

        <Typography variant="body2" color="textSecondary">
          {created}{" "}
        </Typography>

        <Typography variant="body1">{body} </Typography>
      </CardContent>
    </Card>
  );
};

export default Scream;
