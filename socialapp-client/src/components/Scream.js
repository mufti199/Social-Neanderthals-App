import React from "react";
import Link from "react-router-dom/Link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import MyButton from "../util/MyButton";

//MUI
import { makeStyles } from "@material-ui/core/styles/";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
//Icons
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { likeScream, unlikeScream } from "../redux/actions/dataActions";

// Styles
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
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // Is scream liked?
  const likedScream = () => {
    if (user.likes && user.likes.find((like) => like.screamId === screamId)) {
      return true;
    } else {
      return false;
    }
  };

  // Handlers
  const handleLikeScream = () => {
    dispatch(likeScream(screamId));
  };
  const handleUnlikeScream = () => {
    dispatch(unlikeScream(screamId));
  };
  dayjs.extend(relativeTime);

  // Render Like Button
  const likeButton = !user.authenticated ? (
    <MyButton tipTitle="Like">
      <Link to="/login/">
        <FavoriteBorder color="primary" />
      </Link>
    </MyButton>
  ) : likedScream() ? (
    <MyButton tipTitle="Unlike" onClick={handleUnlikeScream}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tipTitle="Like" onClick={handleLikeScream}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );

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
          Screamed: {dayjs(created).fromNow()}
        </Typography>

        <Typography variant="body1">{body} </Typography>
        {likeButton}
        <span>{likeCount} Likes</span>
        <MyButton tipTitle="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} Comments</span>
      </CardContent>
    </Card>
  );
};

export default Scream;
