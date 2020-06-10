import React from "react";
import Link from "react-router-dom/Link";

// Utility
import MyButton from "../../util/MyButton";

// MUI
//Icons
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";

const LikeButton = ({ screamId }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

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

  // Render Like Button
  const likeButton = !user.authenticated ? (
    <Link to="/login/">
      <MyButton tipTitle="Like">
        <FavoriteBorder color="primary" />
      </MyButton>
    </Link>
  ) : likedScream() ? (
    <MyButton tipTitle="Unlike" onClick={handleUnlikeScream}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tipTitle="Like" onClick={handleLikeScream}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );
  return likeButton;
};

export default LikeButton;
