import React from "react";
import Link from "react-router-dom/Link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Utility
import MyButton from "../../util/MyButton";

// Components
import LikeButton from "./LikeButton";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";

// MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
// Icons
import ChatIcon from "@material-ui/icons/Chat";

// Redux
import { useSelector } from "react-redux";

// Styles
const useStyles = makeStyles({
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    minWidth: "80%",
  },
  image: {
    height: 150,
    maxWidth: 150,
    minWidth: 150,
  },
  content: {
    padding: "auto",
    objectFit: "cover",
  },
});

const Scream = ({ scream, openDialog }) => {
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
  const user = useSelector((state) => state.user);
  dayjs.extend(relativeTime);

  // Render Delete Button
  const deleteButton =
    user.authenticated && userHandle === user.credentials.handle ? (
      <DeleteScream screamId={screamId} />
    ) : null;

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
          to={`/user/${userHandle}`}
          color="primary"
        >
          {userHandle}{" "}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          Screamed: {dayjs(created).fromNow()}
        </Typography>

        <Typography variant="body1">{body} </Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} Likes</span>
        <MyButton tipTitle="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} Comments</span>
        <ScreamDialog
          screamId={screamId}
          userHandle={userHandle}
          openDialog={openDialog}
        />
      </CardContent>
    </Card>
  );
};

export default Scream;
